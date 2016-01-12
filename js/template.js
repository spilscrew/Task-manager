/* Activate sections */

var activateSections = {
    currentActive: "",
    stateWrite: "",
    stateCheck: function (checkingClasses,curAct) {
        this.currentActive = curAct;
        for (var e = 0; e < checkingClasses.length; e++) {
            var checkingFlag = false;
            var classes = checkingClasses[e].classList;
            for (var y = 0; y < classes.length; y++) {
                if (classes[y] == "active") {
                    console.log("has active");
                    checkingFlag = true;
                    break;
                }
            }
            if (checkingFlag == false) {
                this.stateWrite = "active";
            }
        }
    },
    buttonClick: function (that) {
        var getId = that.getAttribute("id");
        that.classList.toggle('active');
        activateSections.blocksAnimations(getId);
    },
    blocksAnimations: function (setId) {
        if (setId == "search") {
            document.querySelector('.search').classList.toggle('active');
        }
        if (setId == "addTask") {
            var addTaskButton = document.querySelector('.add-task');
            addTaskButton.classList.toggle('active');
            var currentCat = document.getElementsByClassName("cat-button");
            for (var f = 0; f < currentCat.length; f++) {
                var currentCatClasses = currentCat[f].classList
                for (var t = 0; t < currentCatClasses.length; t++) {
                    if (currentCatClasses[t] == "active") {
                        document.getElementById(currentCat[f].id).classList.add("active");
                    }
                }
            }
            //if (addTaskButton.classList.contains("active")) {
            //    setTimeout (function () {
            //        document.querySelector('.add-task').style.overflow = "visible";
            //    }, 300);
            //} else {
            //    document.querySelector('.add-task').style.overflow = "hidden";
            //}
        }
    },
    init: function () {
        var buttonsArray = document.getElementsByClassName("actSec");
        for (var i = 0; i < buttonsArray.length; i++) {
            buttonsArray[i].onclick = function () {
                var that = this;
                if (activateSections.stateWrite != "active") {
                    activateSections.stateCheck(buttonsArray,this);
                    activateSections.buttonClick(this);
                } else {
                    if (this == activateSections.currentActive) {
                        activateSections.buttonClick(this);
                        activateSections.stateWrite = "";
                        activateSections.currentActive = "";
                    } else {
                        activateSections.buttonClick(activateSections.currentActive);
                        setTimeout (function () {
                            activateSections.buttonClick(that);
                            activateSections.stateWrite = "active";
                            activateSections.currentActive = that;
                        }, 100);

                    }
                }
            }
        }
    }
}
activateSections.init();
