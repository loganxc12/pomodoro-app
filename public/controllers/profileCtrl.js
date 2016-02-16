app.controller('profileCtrl', function($scope, $state, pomodoroService, ModalService, userService, profile) {

    angular.ModalService = ModalService;
    console.log('MODAL: ', ModalService);

    //JQUERY SIDEBAR NAV
    $scope.numDays = 10;
    $scope.toggle30 = function(){
        $scope.numDays = 30;
    }
    $scope.toggle10 = function(){
        $scope.numDays = 10;
    }


    $scope.graphData = [];

        $('.nav-sidebar').scotchPanel({
            containerSelector: 'body', // Make this appear on the entire screen
            direction: 'left', // Make it toggle in from the left
            duration: 300, // Speed in ms how fast you want it to be
            transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
            clickSelector: '.hamburger', // Enables toggling when clicking elements of this class
            distanceX: '200px', // Size fo the toggle
            enableEscapeKey: true // Clicking Esc will close the panel
        });


    //Get Pom Data (FOR TOP NUMBER SECTION)
    $scope.getPoms = function() {
        pomodoroService.getPoms()
            .then(function(result) {
                console.log('RESULT -->' + result);
                $scope.bannerToday = result.today;
                $scope.bannerWeek = result.week;
                $scope.bannerMonth = result.month;
        })
    }

    //Get Pom Data (FOR BAR GRAPH)


    $scope.getBarPoms = function() {
        pomodoroService.getBarPoms()
            .then(function(result) {
                console.log('BAR RESULT -->' + result);
            $scope.graphData = result;
//                $scope.today = result.today;
//                $scope.yesterday = result.yesterday;
//                $scope.twoDaysAgo = result.twoDaysAgo;
//                $scope.threeDaysAgo = result.threeDaysAgo;
//                $scope.fourDaysAgo = result.fourDaysAgo;
//                $scope.fiveDaysAgo = result.fiveDaysAgo;
//                $scope.sixDaysAgo = result.sixDaysAgo;
//                $scope.sevenDaysAgo = result.sevenDaysAgo;
//                $scope.eightDaysAgo = result.eightDaysAgo;
//                $scope.nineDaysAgo = result.nineDaysAgo;
//            initGraph();
        })
    }

    $scope.getBarPoms();

    function initGraph(){

        var tdy = moment().format("MMM D").toUpperCase();
        var ysterdy = moment().subtract(1, 'days').format("MMM D").toUpperCase();
        var ago2 = moment().subtract(2, 'days').format("MMM D").toUpperCase();
        var ago3 = moment().subtract(3, 'days').format("MMM D").toUpperCase();
        var ago4 = moment().subtract(4, 'days').format("MMM D").toUpperCase();
        var ago5 = moment().subtract(5, 'days').format("MMM D").toUpperCase();
        var ago6 = moment().subtract(6, 'days').format("MMM D").toUpperCase();
        var ago7 = moment().subtract(7, 'days').format("MMM D").toUpperCase();
        var ago8 = moment().subtract(8, 'days').format("MMM D").toUpperCase();
        var ago9 = moment().subtract(9, 'days').format("MMM D").toUpperCase();
        var data = {
    labels: [ago9, ago8, ago7, ago6, ago5, ago4, ago3, ago2, "YESTERDAY", "TODAY"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(55, 182, 80, 0.4)",
            strokeColor: "rgba(55, 182, 80, 1)",
            highlightFill: "rgba(55, 182, 80, 0.8)",
            highlightStroke: "rgba(55, 182, 80, 1)",
            data: [$scope.nineDaysAgo.length, $scope.eightDaysAgo.length, $scope.sevenDaysAgo.length, $scope.sixDaysAgo.length, $scope.fiveDaysAgo.length, $scope.fourDaysAgo.length, $scope.threeDaysAgo.length, $scope.twoDaysAgo.length, $scope.yesterday.length, $scope.today.length]
        }
    ]
};

    var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,0.0)",

    scaleLineColor: 'transparent',

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    scaleShowLabels: false,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: false,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 1,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 7,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}

//    var ctx = document.getElementById("myChart").getContext("2d");
//        var myNewChart = new Chart(ctx).Line(data, options, {
//            showScale: false,
//        });

    }

    //TOGGLE DAY VIEW BUTTONS
    $scope.thirtyView = true;
    $scope.tenView = false;
    $scope.toggleViewBtns = function() {
        $scope.thirtyView = !$scope.thirtyView;
        $scope.tenView = !$scope.tenView;
    }

    //TOGGLE VIEW LABELS
    $scope.tenHeader = true;
    $scope.thirtyHeader = false;
    $scope.toggleViewLabels = function() {
        $scope.tenHeader = !$scope.tenHeader;
        $scope.thirtyHeader = !$scope.thirtyHeader;
    }

    //LAUNCH PROFILE MODAL

    $scope.openModal = function(profileInfo) {
        ModalService.showModal({
          templateUrl: '../features/modal/modalView.html',
          controller: 'modalCtrl',
          inputs: {
            profile: profileInfo
          }
        }).then(function(modal) {
          // Function that runs when modal closes
          modal.close.then(function(then) {
            $scope.refresh();
          });
        });

        window.setTimeout(setupUploadEvent, 1000);

    }

    //REFRESH USER INFO

    $scope.refresh = function() {
        userService.refreshUser()
            .then(function(result) {
                console.log('CURRENT USER', result);
                //CHECK FOR NAME DATA OR SET DEFAULT
                if (result.data.name) {
                    $scope.profileName = result.data.name;
                } else {
                    $scope.profileName = "Welcome To Pomify";
                }
                //CHECK FOR WEBSITE DATA OR SET DEFAULT
                if (result.data.website) {
                    $scope.profileSite = result.data.website;
                } else {
                    $scope.profileSite = "pomify.com";
                }
                //CHECK FOR BIO DATA OR SET DEFAULT
                if (result.data.bio) {
                    $scope.profileBio = result.data.bio;
                } else {
                    $scope.profileBio = "Click the button in the top right corner to upload pictures and edit this description!";
                }
                //CHECK FOR COVER PIC OR SET DEFAULT
                if (result.data.coverPic) {
                    $scope.coverPic = result.data.coverPic;
                } else {
                    $scope.coverPic = "../Images/default-cover.jpg";
                }
                //CHECK FOR PROFILE PIC OR SET DEFAULT
                if (result.data.profilePic) {
                    $scope.profilePic = result.data.profilePic;
                } else {
                    $scope.profilePic = "../Images/profy.jpg";
                }
                //ADD FOLLOWING ARRAY TO scope
                  $scope.following = result.data.following;
//                $scope.profileName = result.data.name;
//                $scope.profileBio = result.data.bio;
//                $scope.profileSite = result.data.website;
//                $scope.coverPic = result.data.coverPic;
//                $scope.profilePic = result.data.profilePic;
        })
    }

    function setupUploadEvent() {
        console.log('Setting up listeners');
        $('.file-upload-button').change(function(event) {
            console.log(event);
            console.log('File: ', event.target.files[0]);
            //Make a file reader
            var fileReader = new FileReader();
            //Tell what to do when it has loaded
            fileReader.onload = function(loaded) {
                //Once loaded, run this code
                console.log(loaded);

                var newFile = {
                    fileName: event.target.files[0].name,
                    fileBody: loaded.target.result
                };
                userService.uploadImage(newFile).then(function(data) {
//                    $scope.refresh();
                    if (event.currentTarget.id == 'cover-upload') {

                        $("#modalCoverPhoto").css("background-image","url('"+ data.data.Location + "')");
                        userService.updateCover(data.data.Location)
                            .then(function(result) {
                                console.log('END RESULT', result);
                        })

                    } else if (event.currentTarget.id == 'profile-upload') {
                        $("#modalProfilePhoto").css("background-image","url('"+ data.data.Location + "')");
                        userService.updateProfile(data.data.Location)
                            .then(function(result) {
                                console.log('END RESULT', result);
                        })
                    }
                    console.log(event.currentTarget.id);
                }).catch(function(err) {
                    console.error('upload err: ',err);
                });

            };

            fileReader.readAsDataURL(event.target.files[0]);
        });
    }


    //UPDATE PROFILE INFO

//    $scope.coverPic = { 'url(http://tophdimgs.com/data_images/wallpapers/28/420966-natur.jpg)'
//    }
//
    if (profile.status == 200) {
        console.log('PROFILE IS RUNNING');
        $scope.coverPic = profile.data.coverPic;
        $scope.profilePic = profile.data.profilePic;
        $scope.profileName = profile.data.name;
        $scope.profileBio = profile.data.bio;
        $scope.profileSite = profile.data.website;
    } else {
        $scope.profileName = "Welcome to Pomify";
        $scope.profileBio = "This is your profile page, click the button in the top right to upload pictures and change this description.";
        $scope.profileSite = "pomify.com";
    }

    $scope.getAll = function() {
        userService.getAll()
            .then(function(result) {
                console.log(result);
                for(var i = 0; i < result.data.length; i++) {
                    if (result.data[i].profilePic == undefined){
                        result.data[i].profilePic = 'Images/profy.jpg';
                    }
                }
                $scope.allUsers = result.data;
        })
    }

    $scope.getSelectedUser = function() {

        if ($scope.selectedUser == undefined) {
            console.log('no selected user');
        } else {
            console.log('got to else');
            $scope.selectedId = $scope.selectedUser.originalObject._id;
            $state.go('view', {user: $scope.selectedId});
        }
    }


//     $scope.refresh();
     $scope.getAll();

})
