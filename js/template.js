/* Activate sections */

var acttivateSections = {
    buttonClick: window.onclick = function(element) {
        var getClass = element.srcElement.className;
        if (getClass == "fa") {
            console.log(getClass);
        }

    },
    init: function () {}
}
acttivateSections.init();
