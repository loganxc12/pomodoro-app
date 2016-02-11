app.directive('pomGraph', function() {
    return {
        templateUrl: 'features/graph/graph.html',
        scope: {
            data: '=',
            numDays: "="
        },
        link: function(scope, element, attrs) {
            scope.$watch('data', makeGraph);
            
            scope.$watch('numDays', makeGraph);
            
            function makeGraph(){
                
                if(curChart){
                    curChart.destroy();
                }
                var graphData = [];
                var labels = [];
                for (var i=0;i<scope.numDays;i++){
                    graphData.unshift( scope.data[i]?scope.data[i].length : 0 );
                    
                    labels.unshift( (i==0?"TODAY":moment().subtract(i,'days').format("MMM D").toUpperCase()))
                    
                }
                var data = {
                labels:labels, 
                datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(55, 135, 191, 0.4)",
                    strokeColor: "rgba(55, 135, 191, 1)",
                    highlightFill: "rgba(55, 182, 80, 0.8)",
                    highlightStroke: "rgba(55, 182, 80, 1)",
                    data: graphData
                }]
                }
                curChart = new Chart(ctx).Bar(data, options, {
                    showScale: false,
            });
            }
            var ctx = element.find("#myChart")[0].getContext("2d");
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
                barStrokeWidth : 2,

                //Number - Spacing between each of the X value sets
                barValueSpacing : 7,

                //Number - Spacing between data sets within X values
                barDatasetSpacing : 1,

                //String - A legend template
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

            }
            
            var curChart = null;
        }

        
    }
})