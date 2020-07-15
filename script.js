
$(document).ready(function () {
var now = moment();
var currentHour = now.format("H");
var plannerHours = [
    displayData = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    hourData = [9, 10, 11, 12, 13, 14, 15, 16, 17]
];

function displayTimeblocks(text, data) {
    var mainDisplay = $("tbody");

    for (i = 0; i < text.length; i++) {

        var newRow = $("<tr class'time-block'>");
        newRow.attr("data-type", data[i]);

        var timeDisplay = $("<td>").addClass("hour").text(text[i]);
            
        var textarea = $("<textarea rows='3' cols='60'>");
        var textareaDisplay = $("<td class'description'>").append(textarea);

        if (newRow.attr("data-type") === currentHour) {
            textarea.addClass("present");

        } else if (newRow.attr("data-type") < currentHour) {
            textarea.addClass("past");

        } else if (newRow.attr("data-type") > currentHour) {
            textarea.addClass("future");

        };
        var saveBtnDisplay = $("<td class='saveBtn btn'>").append($("<i class='fa fa-floppy-o fa-3x'>"));
        newRow.append(timeDisplay, textareaDisplay, saveBtnDisplay);
        mainDisplay.append(newRow);
    }
}


$("#currentDay").text(moment(now).format("dddd MMMM Do"));
displayTimeblocks(plannerHours[0], plannerHours[1]);
console.log(plannerHours);
console.log(currentHour);
});