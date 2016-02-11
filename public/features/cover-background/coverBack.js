app.directive('myBackgroundImage', function () {
    return function (scope, element, attrs) {
        console.log('adding backgrond: ', attrs.myBackgroundImage);
        element.css({
            'background-image': 'linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(' + attrs.myBackgroundImage + ')'
        });
        window.setTimeout(function() {
            element.css({
            'background-image': 'linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(' + attrs.myBackgroundImage + ')'});
        }, 500);
    };
});

app.directive('myProfileImage', function () {
    return function (scope, element, attrs) {
        if (attrs.myProfileImage) {
                element.css({'background-image': 'url(' + attrs.myProfileImage + ')'});
            } else {
                element.css({'background-image': 'url(' + "../Images/profy.jpg" + ')'});
            }
//        window.setTimeout(function() {
//            element.css({
//            'background-image': 'url(' + attrs.myProfileImage + ')'});
//        }, 500);
    };
})

app.directive("backgroundDiv", function(){
    return {
        scope:{
            backgroundUrl:"="
        },
        transclude:true,                    templateUrl:'features/cover-background/background-divTmpl.html',
        link:function(){}
    }
})

app.directive('myModalCover', function () {
    return function (scope, element, attrs) {
        console.log('Adding Image: ', attrs.myModalCover);
        element.css({
            'background-image': 'url(' + attrs.myModalCover + ')'
        });
        window.setTimeout(function() {
            if (attrs.myModalCover) {
                element.css({'background-image': 'url(' + attrs.myModalCover + ')'});
            } else {
                element.css({'background-image': 'url(' + "../Images/default-cover.jpg" + ')'});
            }
            
        }, 500);
    };
})

app.directive('myModalProfile', function () {
    return function (scope, element, attrs) {
        console.log('Adding Image: ', attrs.myModalProfile);
        element.css({
            'background-image': 'url(' + attrs.myModalProfile + ')'
        });
        window.setTimeout(function() {
            if (attrs.myModalProfile) {
                element.css({'background-image': 'url(' + attrs.myModalProfile + ')'});
            } else {
                element.css({'background-image': 'url(' + "../Images/profy.jpg" + ')'});
            }
            
        }, 500);
    };
})