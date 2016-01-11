var editTask = {
    activeTaskId: "",
    activityFlag: false,
    editFunctions: {
        calendarEdit: function () {
            $(".jq-calendar-edit").datepicker({
                    dateFormat: "dd.mm.yy",
                    onSelect: function (date) {
                        $(".edit-date-input").text(date);
                        $(".edit-date-button").addClass("active");
                    }
                }
            );
        },
        categoryEdit: function () {
            var catArray = document.getElementsByClassName("side-cat-button");
            var curCat = document.getElementById("edit-category-button").firstChild.classList[2];
            for (var x = 0; x < catArray.length; x++) {
                if (curCat == catArray[x].id) {
                    var curCatIndex = x;
                }
            }
            document.getElementById("edit-category-button").onclick = function () {
                this.classList.add("active");
                document.getElementById("edit-category-button").firstChild.className = "fa fa-circle";
                if (curCatIndex < catArray.length-1) {
                    curCatIndex++;
                    console.log("PLUS")
                } else {
                    curCatIndex = 0;
                    console.log("ZERO")
                }

                var nextClass = catArray[curCatIndex].id;
                document.getElementById("edit-category-button").firstChild.classList.add(nextClass);
            }
        },
        favouriteEdit: function () {
            document.getElementById("edit-favourite-button").onclick = function () {
                this.classList.toggle('active');
                this.classList.toggle('unactive');
            }
        },
        saveEdit: function () {
            document.getElementById("saveEdit").onclick = function () {
                var editRec = localStorage.getItem(editTask.activeTaskId);
                editRec = JSON.parse(editRec);
                if (/\S/.test(document.getElementById("edit-title-field").innerText)) {
                    editRec.title = document.getElementById("edit-title-field").innerText;
                    editRec.category = document.getElementById("edit-category-button").firstChild.classList[2];
                    editRec.date = document.getElementById("edit-date-button").innerText;
                    if (document.getElementById("checkCur").checked == true) {
                        editRec.finished = "checked";
                    } else {
                        editRec.finished = "";
                    }
                    if (document.getElementById("edit-favourite-button").classList.contains("active")) {
                        editRec.favourite = "active";
                    }
                    if (document.getElementById("edit-favourite-button").classList.contains("unactive")) {
                        editRec.favourite = "unactive";
                    }
                    localStorage.setItem(editTask.activeTaskId,JSON.stringify(editRec));
                    editTask.close(event,true);
                    var activeCategory = document.getElementsByClassName("cat-button");
                    for (var q = 0; q < activeCategory.length; q++) {
                        if (activeCategory[q].classList.contains("active")) {
                            activeCategory = activeCategory[q].id;
                            break;
                        }
                    }
                    toDoList.taskDisplaying(true,activeCategory,"edit");
                } else {
                    document.getElementById("edit-title-field").innerText = "Unnamed";
                }
            }
        }
    },
    close: document.onclick = function (event,buttonClose) {
        //if (event.toElement.classList.contains("done-label")) {
        //    toDoList.doneTask(event.toElement.id);
        //    console.log(event.path[2].id);
        //}
        if (document.getElementById("taskDetails").classList.contains("active")) {
            if (editTask.activityFlag) {
                var closeFlag = true;
                if (!buttonClose) {
                    for (var i = 0; i < event.path.length; i++) {
                        if (event.path[i].id === "taskDetails") {
                            closeFlag = false;
                            break;
                        }
                    }
                }
                if (closeFlag) {
                    document.getElementById("taskDetails").classList.remove("active");
                    editTask.activityFlag = false;
                    return false;
                }
            }
            editTask.activityFlag = true;
        }
    },
    taskClick: function () {
        var tasksArray = document.getElementsByClassName("task-text-button");
        for (var i = 0; i < tasksArray.length; i++) {
            tasksArray[i].onclick = function () {
                if (!document.getElementById("taskDetails").classList.contains("active")) {
                    var detailsBlock = document.getElementById("taskDetails");
                    detailsBlock.classList.add("active");
                    editTask.activeTaskId = "";
                    editTask.activeTaskId = this.parentNode.parentNode.id;
                    editTask.renderData();
                }
            }
        }
    },
    renderData: function () {
        for (var q = 0; q < localStorage.length; q++) {
            var localStorageObj = localStorage.getItem(localStorage.key(q));
            localStorageObj = JSON.parse(localStorageObj);
            if (localStorageObj.id == this.activeTaskId) {
                var editBlock = document.getElementById("taskDetails");
                editBlock.className = "task-details active " + localStorageObj.category;
                editBlock.innerHTML = "";
                editBlock.insertAdjacentHTML('afterbegin', '' +
                    '<button id="edit-favourite-button" class="fav ' + localStorageObj.favourite + '"><i class="fa fa-star"></i></button>' +
                    '<div class="details-header">' +
                    '<div class="marker-block">' +
                    '<input id="checkCur" type="checkbox" '+ localStorageObj.finished +'>' +
                    '<label for="checkCur"><i class="fa fa-check-circle"></i></label>' +
                    '</div>' +
                    '<p id="edit-title-field" contenteditable="true">' + localStorageObj.title + '</p>' +
                    '</div>' +
                    '<div class="task-options">' +
                    '<div class="option">' +
                    '<button id="edit-date-button" class="option-button edit-date-button"><div class="jq-calendar-edit"></div><i class="fa fa-calendar"></i><span class="edit-date-input">' + localStorageObj.date + '</span></button>' +
                    '</div>' +
                    //'<div class="option">' +
                    //'<button class="option-button"><i class="fa fa-clock-o"></i><span>Omittam suscipit</span></button>' +
                    //'</div>' +
                    '<div class="option">' +
                    '<button id="edit-category-button" class="option-button"><i class="fa fa-circle ' + localStorageObj.category + '"></i><span>Category</span></button>' +
                    '</div>' +
                    '<div class="option">' +
                    '<button id="saveEdit" class="option-button"><i class="fa fa-pencil"></i><span>Edit</span></button>' +
                    '</div>' +
                    '</div>'
                );
                editTask.editFunctions.calendarEdit();
                editTask.editFunctions.categoryEdit();
                editTask.editFunctions.favouriteEdit();
                editTask.editFunctions.saveEdit();
            }
        }
    },
    init: function () {
        this.taskClick()
    }
}
editTask.init();