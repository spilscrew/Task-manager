$(".jq-calendar").datepicker({
        dateFormat: "dd.mm.yy",
        currentDate: $(".set-date-input").val($.datepicker.formatDate('dd.mm.yy', new Date())),
        onSelect: function(date){
            $(".set-date-input").val(date);
            $("#newDate").addClass("active");
        }
    }
);

var toDoList = {
    writeRecord: {
        id: "",
        title: "",
        category: "",
        date: "",
        favourite: "unactive",
        finished: "",
        addToStorage: function (category) {
            localStorage.setItem("taskId"+localStorage.length, JSON.stringify(toDoList.writeRecord));
            toDoList.taskDisplaying(true,category,"edit");
            $(".jq-calendar").datepicker($(".set-date-input").val($.datepicker.formatDate('dd.mm.yy', new Date())));
            toDoList.writeRecord.id = "";
            toDoList.writeRecord.title = "";
            toDoList.writeRecord.category = "";
            toDoList.writeRecord.date = "";
            toDoList.writeRecord.favourite = "unactive";
            toDoList.writeRecord.finished = "";
        }
    },
    doneTask: function () {
        var labelsArray = document.getElementsByClassName("done-label");
        for (var l = 0; l < labelsArray.length; l++) {
            labelsArray[l].onclick = function () {
                var doneTask = localStorage.getItem(this.classList[1]);
                doneTask = JSON.parse(doneTask);
                if (doneTask.finished === "checked") {
                    doneTask.finished = "";
                } else {
                    doneTask.finished = "checked";
                }
                localStorage.setItem(doneTask.id,JSON.stringify(doneTask));
                var activeCategory = document.getElementsByClassName("cat-button");
                for (var q = 0; q < activeCategory.length; q++) {
                    if (activeCategory[q].classList.contains("active")) {
                        activeCategory = activeCategory[q].id;
                        break;
                    }
                }
                toDoList.taskDisplaying(true,activeCategory,"edit");
            }
        }
    },
    addTaskRecord: {
        setId: function () {
            toDoList.writeRecord.id = "taskId" + localStorage.length++;
        },
        selectTitle: function () {
            var newTaskTitle = document.querySelector(".new-task-name");
            toDoList.writeRecord.title = "";
            toDoList.writeRecord.title = newTaskTitle.value;
        },
        selectCategory: function () {
            var catArray = document.getElementsByClassName("newTaskCat");
            var catButtonArray = document.getElementsByClassName("cat-button");
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

                    for (var j = 0; j < catButtonArray.length; j++) {
                        if (catButtonArray[j].classList.contains("active")) {
                            catButtonArray[j].classList.remove("active");
                        }
                        if (catButtonArray[j].id == getCatColor) {
                            catButtonArray[j].classList.add("active");
                        }
                    }

                    toDoList.taskDisplaying(true,getCatColor,"edit");

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
            //document.querySelector("."+record.category+".newTaskCat").classList.remove("active");
            //document.querySelector(".new-task-category-marker i").classList.remove(record.category);

            newTaskTitleError = document.querySelector(".new-task-name");
            newTaskTitleError.classList.remove("error");
            newTaskTitleError.setAttribute("placeholder", "Add new task");

            document.querySelector(".set-date-input").value = "";
            $('.jq-calendar').datepicker('setDate', null);

            document.querySelector("#newDate").classList.remove("active");
            document.querySelector("#addTaskFavourite").classList.remove("active");

            toDoList.writeRecord.addToStorage(record.category);
            toDoList.categoryFilter();
        }
    },
    addTaskButtonClick: document.getElementById("addTaskButton").onclick = function () {
        toDoList.addTaskRecord.setId();
        toDoList.addTaskRecord.selectTitle();
        toDoList.addTaskRecord.selectCategory();
        toDoList.addTaskRecord.selectDate();
        toDoList.addTaskRecord.selectFavourite();
        toDoList.checkFields();
        //var localStorageObj = localStorage.getItem("task12");
        //localStorageObj = JSON.parse(localStorageObj);
    },
    categoryFilter: function () {
        var catFilterArray = document.getElementsByClassName("cat-button");
        for (var i = 0; i < catFilterArray.length; i++) {
            if (catFilterArray[i].classList.contains("cat-archive") && catFilterArray[i].classList.contains("active")) {
                var catArray = document.getElementsByClassName("newTaskCat");
                var colorMarker = document.querySelector(".new-task-category-marker i");
                catArray[0].classList.add("active");
                colorMarker.classList.add(catArray[0].classList[0]);
                toDoList.writeRecord.category = "";
                toDoList.writeRecord.category = catArray[0].classList[0];
            }
            var catArray = document.getElementsByClassName("newTaskCat");
            for (var g = 0; g < catArray.length; g++ ) {
                if (catArray[g].classList.contains("active")) {
                    toDoList.writeRecord.category = "";
                    toDoList.writeRecord.category = catArray[g].classList[0];
                }
            }
            catFilterArray[i].onclick = function () {
                var catFilterArray = document.getElementsByClassName("cat-button");
                for (var u = 0; u < catFilterArray.length; u++){
                    catFilterArray[u].classList.remove("active");
                }
                this.classList.add("active");
                var currentCategory = this.getAttribute("id");
                toDoList.taskDisplaying(true,currentCategory);
                editTask.init();

                var catArray = document.getElementsByClassName("newTaskCat");
                var colorMarker = document.querySelector(".new-task-category-marker i");

                if (this.classList.contains("cat-archive")) {
                    var catArray = document.getElementsByClassName("newTaskCat");
                    var colorMarker = document.querySelector(".new-task-category-marker i");
                    catArray[0].classList.add("active");
                    colorMarker.classList.add(catArray[0].classList[0]);
                    toDoList.writeRecord.category = "";
                    toDoList.writeRecord.category = catArray[0].classList[0];
                } else {
                    for (var b = 0; b < catArray.length; b++) {
                        catArray[b].classList.remove("active");
                        if (catArray[b].classList.contains(currentCategory)) {
                            catArray[b].classList.add("active");
                            colorMarker.className = "fa fa-circle";
                            colorMarker.classList.add(catArray[b].classList[0]);
                            toDoList.writeRecord.category = "";
                            toDoList.writeRecord.category = catArray[b].classList[0];
                        }
                    }
                }
            }
        }
    },
    taskDisplaying: function (clear,category,edit,search) {
        var tasksTable = document.getElementById("tasksTable");
        if (clear == true) {
            tasksTable.innerHTML = "";
        }
        if (search != undefined) {
            toDoList.displayActivate(search);
            var catButtonArray = document.getElementsByClassName("cat-button");
            for (var j = 0; j < catButtonArray.length; j++) {
                if (catButtonArray[j].classList.contains("active")) {
                    catButtonArray[j].classList.remove("active");
                }
                if (catButtonArray[j].id == "archive") {
                    catButtonArray[j].classList.add("active");
                }
            }
            if (edit == "edit") {
                editTask.init();
            }
        } else {
            for (var q = 0; q < localStorage.length; q++) {
                var localStorageObj = localStorage.getItem(localStorage.key(q));
                localStorageObj = JSON.parse(localStorageObj);
                if (category == "" || category == "archive") {
                    toDoList.displayActivate(localStorageObj);
                    //catFilterArray = document.getElementsByClassName("cat-button");
                    //for (var u = 0; u < catFilterArray.length; u++) {
                    //    catFilterArray[u].classList.remove("active");
                    //}
                    //var categoryButtonClassSwitch = document.getElementById("archive");
                    //categoryButtonClassSwitch.classList.add("active");
                    if (edit == "edit") {
                        editTask.init();
                    }
                }
                if (localStorageObj.category == category) {
                    toDoList.displayActivate(localStorageObj);
                    //var catFilterArray = document.getElementsByClassName("cat-button");
                    //for (var u = 0; u < catFilterArray.length; u++) {
                    //    catFilterArray[u].classList.remove("active");
                    //}
                    //categoryButtonClassSwitch = document.getElementById(category);
                    //categoryButtonClassSwitch.classList.add("active");
                    if (edit == "edit") {
                        editTask.init();
                    }
                }
            }
        }
        if (document.getElementById("tasksTable").innerHTML === "") {
            document.getElementById("tasksTable").innerHTML = "<div class='empty-text'><span>THIS CATEGORY<BR>IS EMPTY</span></div>";
        }
        this.doneTask();
    },
    displayActivate: function (item) {
        var tasksTable = document.getElementById("tasksTable");
        tasksTable.insertAdjacentHTML((item.finished == "")? 'afterbegin':'beforeend', '' +
            '<div id="' + item.id + '" class="task full-width ' + item.category + ' ' + item.finished + '">' +
            '<div class="marker-block">' +
            '<input id="' + item.id + 'Check" type="checkbox" ' + item.finished + '> ' +
            '<label class="done-label '+ item.id  +'" for="' + item.id + 'Check"> ' +
            '<i class="fa fa-check-circle"></i> ' +
            '</label> ' +
            '</div> ' +
            '<div class="task-block"> ' +
            '<div class="row"> ' +
            '<span><i class="fa fa-map-marker"></i></span> ' +
                //'<span>At Tesco</span> ' +
                // '<span class="separator">|</span> ' +
            '<span>' + item.date + '</span> ' +
            '<button class="favourite"><i class="fa fa-star ' + item.favourite + '"></i></button> ' +
            '</div> ' +
            '<button class="task-text-button">' +
            item.title +
            '</button> ' +
            '</div> ' +
            '</div>'
        );
    },
    init: function () {
        this.addTaskRecord.setId();
        this.addTaskRecord.selectCategory();
        this.addTaskRecord.selectFavourite();
        this.taskDisplaying(true,"");
        this.categoryFilter();
        this.doneTask();
    }
}
toDoList.init();

document.getElementById("clearStorage").onclick = function () {
    localStorage.clear();
}