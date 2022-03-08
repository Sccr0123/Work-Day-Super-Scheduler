var tasks = [];
var date = "";
test = 0;

$("#currentDay").html("<p>" + moment().format("MMMM Do, YYYY") + "</p>");

var loadTasks = function () {
    savedDate = localStorage.getItem("date");
    if (date === savedDate) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(tasks);
        console.log("Loaded");
    } else {
        localStorage.clear("tasks");
    };

    $(".row").each(function () {
        row = $(this).attr("id");
        array = $(this).attr("id") - 9;
        console.log(tasks[array]);
        $(`#scheduleText${row}`).html(tasks[array]);
    });
};

var saveTasks = function () {
    test = test + 1;
    console.log("Saved "+test);
    localStorage.clear();
    $(".row").each(function () {
        row = $(this).attr("id");
        array = row - 9;
        tempTask = ($(`textarea#scheduleText${row}`).val());
        tasks[array] = tempTask;
    });
    localStorage.setItem("date", date);
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

var updateTime = function () {
    date = moment().format("MMMM Do, YYYY");
	currentTime = moment().hours();
	$(".row").each(function () {
		checkTime = $(this).attr("id");
		checkTime = parseInt(checkTime);
		if (currentTime > checkTime) {
			$(`#scheduleText${checkTime}`).addClass("past");
		} else if (currentTime === checkTime) {
			$(`#scheduleText${checkTime}`).addClass("present");
		} else if (currentTime < checkTime) {
			$(`#scheduleText${checkTime}`).addClass("future");
		}
    });
    loadTasks();
};

$(document).ready(function () {
    
	updateTime();
});

$(".saveBtn").on("click", function () {
	saveTasks();
});
