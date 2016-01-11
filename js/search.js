var search = {
    searchFieldActivity: function () {
        var searchInput = document.getElementById("searchInput");
        document.onkeyup = function () {
            if (document.activeElement.id == searchInput.id) {
                toDoList.taskDisplaying(true,"");
                document.getElementById("tasksTable").innerHTML = "";
                var searchLength = searchInput.value.length;
                for (var r = 0; r < localStorage.length; r++) {
                    var localStorageSearchObj = localStorage.getItem(localStorage.key(r));
                    localStorageSearchObj = JSON.parse(localStorageSearchObj);
                    if (localStorageSearchObj.title.substr(0, searchLength) == searchInput.value) {
                        toDoList.taskDisplaying(false,"","edit",localStorageSearchObj);
                    }
                }
            }
            if (document.getElementById("tasksTable").innerHTML === "") {
                document.getElementById("tasksTable").innerHTML = "<div class='empty-text search-text'><span>NO RESULTS<BR></span></div>";
            }
        }
    },
    init: function () {
        this.searchFieldActivity();
    }
}
search.init();