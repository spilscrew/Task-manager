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
            toDoList.taskDisplaying(true);
            toDoList.writeRecord.title = "";
            toDoList.writeRecord.category = "";
            toDoList.writeRecord.date = "";
            toDoList.writeRecord.favourite = "unactive";
        }
    },
    addTaskRecord: {
        selectTitle: function () {
            var newTaskTitle = document.querySelector(".new-task-name");
            toDoList.writeRecord.title = "";
            toDoList.writeRecord.title = newTaskTitle.value;
        },
        selectCategory: function () {
            var catArray = document.getElementsByClassName("newTaskCat");
            var colorMarker = document.querySelector(".new-task-category-marker i");
            for (var i = 0; i < catArray.length; i++) {
                catArray[i].onclick = function () {
                    document.querySelector(".select-category h4").classList.remove("error");
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
                toDoList.writeRecord.favourite = "unactive";
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    toDoList.writeRecord.favourite = "active";
                } else {
                    toDoList.writeRecord.favourite = "unactive";
                }
            }
        }
    },
    checkFields: function () {
        var record = toDoList.writeRecord;
        var checkStatus1 = false;
        var checkStatus2 = false;
        var checkStatus3 = false;
        if (!/\S/.test(record.title)/*!record.title&&/\S/.test(record.title)||/^\s/.test(record.title)*/) {
            document.querySelector(".new-task-name").value = "";
            var newTaskTitleError = document.querySelector(".new-task-name");
            newTaskTitleError.classList.add("error");
            newTaskTitleError.setAttribute("placeholder", "Data error");
            checkStatus1 = false;
        } else {
            checkStatus1 = true;
        }

        console.log();
        if (!record.category) {
            checkStatus2 = false;
            document.querySelector(".select-category h4").classList.add("error");
        } else {
            checkStatus2 = true;
        }
        if (!record.date) {
            checkStatus3 = false;
            document.querySelector("#newDate i").classList.add("error");
        } else {
            document.querySelector("#newDate i").classList.remove("error");
            checkStatus3 = true;
        }
        if (checkStatus1 && checkStatus2 && checkStatus3) {
            document.querySelector(".new-task-name").value = "";
            document.querySelector("."+record.category+".newTaskCat").classList.remove("active");
            document.querySelector(".new-task-category-marker i").classList.remove(record.category);

            newTaskTitleError = document.querySelector(".new-task-name");
            newTaskTitleError.classList.remove("error");
            newTaskTitleError.setAttribute("placeholder", "Add new task");

            document.querySelector(".set-date-input").value = "";
            $('.jq-calendar').datepicker('setDate', null);

            document.querySelector("#newDate").classList.remove("active");
            document.querySelector("#addTaskFavourite").classList.remove("active");

            toDoList.writeRecord.addToStorage();
        }
    },
    addTaskButtonClick: document.getElementById("addTaskButton").onclick = function () {
        toDoList.addTaskRecord.selectTitle();
        toDoList.addTaskRecord.selectCategory();
        toDoList.addTaskRecord.selectDate();
        toDoList.addTaskRecord.selectFavourite();
        toDoList.checkFields();
        //var localStorageObj = localStorage.getItem("task12");
        //localStorageObj = JSON.parse(localStorageObj);
        //console.log(localStorageObj);
    },
    taskDisplaying: function (clear) {
        var tasksTable = document.getElementById("tasksTable");
        if (clear == true) {
            tasksTable.innerHTML = "";
        }
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
