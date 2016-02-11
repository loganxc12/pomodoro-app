app.directive('myBackgroundImage', function () {
    return function (scope, element, attrs) {
        console.log('adding backgrond: ', attrs.myBackgroundImage);
        element.css({
            'background-image': 'linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(' + attrs.myBackgroundImage + ')'
        });
//        window.setTimeout(function() {
//            element.css({
//            'background-image': 'linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(' + attrs.myBackgroundImage + ')'});
//        }, 500);
    };
});

app.directive('myProfileImage', function () {
    return function (scope, element, attrs) {
        console.log('Adding Image: ', attrs.myProfileImage);
        element.css({
            'background-image': 'url(' + attrs.myProfileImage + ')'
        });
        window.setTimeout(function() {
            element.css({
            'background-image': 'url(' + attrs.myProfileImage + ')'});
        }, 500);
    };
})

app.directive('myModalCover', function () {
    return function (scope, element, attrs) {
        console.log('Adding Image: ', attrs.myModalCover);
        element.css({
            'background-image': 'url(' + attrs.myModalCover + ')'
        });
        window.setTimeout(function() {
            element.css({
            'background-image': 'url(' + attrs.myModalCover + ')'});
        }, 500);
    };
})