var tasks = {};

$("#currentDay").html("<p>" + moment().format("MMMM Do YYYY") + "</p>");

var loadTasks = function () {
	tasks = JSON.parse(localStorage.getItem("tasks"));
};

var saveTasks = function () {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

var updateTime = function () {
	currentTime = moment().hours();
	console.log(`currentTime: ${currentTime}`);
	$(".row").each(function () {
		checkTime = $(this).attr("id");
		checkTime = parseInt(checkTime);
		console.log(`checkTime: ${checkTime}`); 
		if (currentTime > checkTime) {
			$(`#scheduleText${checkTime}`).addClass("past");
		} else if (currentTime === checkTime) {
			$(`#scheduleText${checkTime}`).addClass("present");
		} else if (currentTime < checkTime) {
			$(`#scheduleText${checkTime}`).addClass("future");
		}
	});
};

$(document).ready(function () {
	updateTime();
});

$("#saved").on("click", function () {
	console.log("Saved");
});
