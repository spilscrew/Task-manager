$(".jq-calendar").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function(date){
            $(".set-date-input").val(date);
            $("#newDate").addClass("active");
        }
    }
);

var toDoList = {
    writeRecord: {
        title: "",
        category: "",
        date: "",
        favourite: "unactive",
        addToStorage: function () {
            localStorage.setItem("task"+localStorage.length, JSON.stringify(toDoList.writeRecord));
        }
    },
    addTaskRecord: {
        selectTitle: function () {
            var newTaskTitle = document.querySelector(".new-task-name").innerText;
            toDoList.writeRecord.title = "";
            toDoList.writeRecord.title = newTaskTitle;
        },
        selectCategory: function () {
            var catArray = document.getElementsByClassName("newTaskCat");
            var colorMarker = document.querySelector(".new-task-category-marker i");
            for (var i = 0; i < catArray.length; i++) {
                catArray[i].onclick = function () {
                    colorMarker.className = "fa fa-circle";
                    var getCatColor = this.classList[0];
                    colorMarker.classList.add(getCatColor);
                    for (var r = 0; r < catArray.length; r++){
                        catArray[r].classList.remove("active");
                    }
                    this.classList.toggle('active');
                    toDoList.writeRecord.category = "";
                    toDoList.writeRecord.category = getCatColor;
                }
            }
        },
        selectDate: function () {
            var newTaskDate = document.querySelector(".set-date-input").value;
            toDoList.writeRecord.date = "";
            toDoList.writeRecord.date = newTaskDate;
        },
        selectFavourite: function () {
            var newTaskFavourite = document.getElementById("addTaskFavourite");
            newTaskFavourite.onclick = function () {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    toDoList.writeRecord.favourite = "active";
                } else {
                    toDoList.writeRecord.favourite = "unactive";
                }
            }
        }
    },
    addTaskButtonClick: document.getElementById("addTaskButton").onclick = function () {
        toDoList.addTaskRecord.selectTitle();
        toDoList.addTaskRecord.selectCategory();
        toDoList.addTaskRecord.selectDate();
        toDoList.addTaskRecord.selectFavourite()
        toDoList.writeRecord.addToStorage();
        //var localStorageObj = localStorage.getItem("task12");
        //localStorageObj = JSON.parse(localStorageObj);
        //console.log(localStorageObj);
    },
    taskDisplaying: function () {
        var tasksTable = document.getElementById("tasksTable");
        for (var q = 0; q < localStorage.length; q++) {
            var localStorageObj = localStorage.getItem(localStorage.key(q));
            localStorageObj = JSON.parse(localStorageObj);
            console.log(localStorageObj);
            console.log(localStorageObj.title);
            tasksTable.insertAdjacentHTML('afterbegin', '' +
                '<div class="task full-width '+ localStorageObj.category +'">' +
                '<div class="marker-block">' +
                '<input id="check0" type="checkbox"> ' +
                '<label for="check0"> ' +
                '<i class="fa fa-check-circle"></i> ' +
                '</label> ' +
                '</div> ' +
                '<div class="task-block"> ' +
                '<div class="row"> ' +
                '<span><i class="fa fa-map-marker"></i></span> ' +
                //'<span>At Tesco</span> ' +
                // '<span class="separator">|</span> ' +
                '<span>'+ localStorageObj.date +'</span> ' +
                '<button class="favourite"><i class="fa fa-star ' + localStorageObj.favourite + '"></i></button> ' +
                '</div> ' +
                '<button class="task-text-button">' +
                localStorageObj.title +
                '</button> ' +
                '</div> ' +
                '</div>'
            );
        }
    },
    init: function () {
        this.addTaskRecord.selectCategory();
        this.addTaskRecord.selectFavourite();
        this.taskDisplaying();
    }
}
toDoList.init();

document.getElementById("clearStorage").onclick = function () {
    localStorage.clear();
    console.log(localStorage);
}
