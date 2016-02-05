app.service('pomodoroService', function($http) {
    
    this.addPom = function() {
        return $http.post('/poms', {completed: true, timeCompleted: new Date(), user: "56b114d2120bdacb03e9b9fe"})
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })  
    }
    
    //RETRIEVE POM DATA + SORT BY DAY, WEEK, MONTH
    this.getPoms = function() {
        return $http.get('/poms')
            .then(function(result) {
                console.log(result.data);
                var milInDay = 1000 * 60 * 60 * 24;
                var currentDate = new Date().getTime();
                var midnight = new Date().setHours(0, 0, 0, 0);
                var weekAgo = midnight - milInDay * 7;
                var monthAgo = midnight - milInDay * 30;
                var dataObj = {};
                dataObj.today = [];
                dataObj.week = [];
                dataObj.month = [];
            for (var i = 0; i < result.data.length; i++) {
                if (Date.parse(result.data[i].timeCompleted) > midnight) {
                    dataObj.today.push(result.data[i]);
                } 
                if (Date.parse(result.data[i].timeCompleted) > weekAgo) {
                    dataObj.week.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > monthAgo) {
                    dataObj.month.push(result.data[i]);
                }
                
            }
                return dataObj;
            }, function(err) {
                console.log(err);
        })
    }
    
    //RETRIEVE POM DATA + SORT LAST 10 DAYS
    
    this.getBarPoms = function() {
        return $http.get('/poms')
            .then(function(result) {
                console.log(result.data);
                //Basic time setup
                var milInDay = 1000 * 60 * 60 * 24;
                var currentDate = new Date().getTime();
                var midnight = new Date().setHours(0, 0, 0, 0);
                //Define millisecond ranges
                var yesterday = midnight - milInDay;
                var twoDaysAgo = midnight - milInDay * 2;
                var threeDaysAgo = midnight - milInDay * 3;
                var fourDaysAgo = midnight - milInDay * 4;
                var fiveDaysAgo = midnight - milInDay * 5;
                var sixDaysAgo = midnight - milInDay * 6;
                var sevenDaysAgo = midnight - milInDay * 7;
                var eightDaysAgo = midnight - milInDay * 8;
                var nineDaysAgo = midnight - milInDay * 9;
                //Create object to be returned + properties (empty arrays)
                var dataObj = {};
                dataObj.today = [];
                dataObj.yesterday = [];
                dataObj.twoDaysAgo = [];
                dataObj.threeDaysAgo = [];
                dataObj.fourDaysAgo = [];
                dataObj.fiveDaysAgo = [];
                dataObj.sixDaysAgo = [];
                dataObj.sevenDaysAgo = [];
                dataObj.eightDaysAgo = [];
                dataObj.nineDaysAgo = [];
                //Conditional sorting
             for (var i = 0; i < result.data.length; i++) {
                if (Date.parse(result.data[i].timeCompleted) > midnight) {
                    dataObj.today.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > yesterday && Date.parse(result.data[i].timeCompleted) < midnight) {
                    dataObj.yesterday.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > twoDaysAgo && Date.parse(result.data[i].timeCompleted) < yesterday) {
                    dataObj.twoDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > threeDaysAgo && Date.parse(result.data[i].timeCompleted) < twoDaysAgo) {
                    dataObj.threeDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > fourDaysAgo && Date.parse(result.data[i].timeCompleted) < threeDaysAgo) {
                    dataObj.fourDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > fiveDaysAgo && Date.parse(result.data[i].timeCompleted) < fourDaysAgo) {
                    dataObj.fiveDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > sixDaysAgo && Date.parse(result.data[i].timeCompleted) < fiveDaysAgo) {
                    dataObj.sixDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > sevenDaysAgo && Date.parse(result.data[i].timeCompleted) < sixDaysAgo) {
                    dataObj.sevenDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > eightDaysAgo && Date.parse(result.data[i].timeCompleted) < sevenDaysAgo) {
                    dataObj.eightDaysAgo.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > nineDaysAgo && Date.parse(result.data[i].timeCompleted) < eightDaysAgo) {
                    dataObj.nineDaysAgo.push(result.data[i]);
                }     
        }
        //RETURN DATA OBJECT
            console.log(dataObj);
          return dataObj;
        //HANDLE ERROR SCENARIO
    }, function(err) {
          console.log(err);
    })
}

//END SERVICE
});
    
    
    /* var ranges = [
        {startTime: 1, endTime: 2, prop: 'yesterday'},
        {time: 2, prop: 'twoDaysAgo'},
    ]
    
    var (var i=0; i<ranges.length; i++) {
        var endCompareDate = midnight - milInDay * ranges[i].time;
        var startCompareDate = midnight -milInDay * range[i-1].time;
        
        if (Date.parse()) {
            dataObj[ranges[i][prop]] 
        
        }
        
    
    }
    
    */
    
    