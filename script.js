
$(document).ready(function () {


    var now = moment();
    var currentHour = parseInt(now.format("H"));

    var plannerHours = [
        displayData = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"],
        hourData = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    ];

    var savedTextArray = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    

    $("#currentDay").text(moment(now).format("dddd MMMM Do"));


    function displayTimeblocks(text, data) {
        var mainDisplay = $("tbody");


        for (i = 0; i < text.length; i++) {

            var newRow = $("<tr class='time-block'>");
            newRow.attr("data-type", data[i]);
            var timeData = parseInt(newRow.attr("data-type"));


            var timeDisplay = $("<td class='hour'>");
            timeDisplay.text(text[i]);

            var textarea = $("<textarea class='textarea" + data[i] + "' rows='3' cols='60'>");
            var textareaDisplay = $("<td class='description '>");
            textareaDisplay.append(textarea);

            var saveBtnDisplay = $("<td class='saveBtn btn' data-type=" + i + ">");
            saveBtnDisplay.append($("<i class='fa fa-floppy-o fa-3x'>"));

            newRow.append(timeDisplay, textareaDisplay, saveBtnDisplay);
            mainDisplay.append(newRow);

            checkTime(timeData, textarea);
            displayStoredText(textarea);

        }

        console.log(savedTextArray);
    }

    
    function saveTextAreaOnClick() {
        $(".saveBtn").on("click", function () {
            var currentTimeData = $(this).parent().attr("data-type");
            var clickedTextarea = $(".textarea" + currentTimeData);
            var rowToArrayCorrelation = $(this).attr("data-type");
            
            savedTextArray[rowToArrayCorrelation] = clickedTextarea.val();
    
            storeTextInput();
        });
    }
    

    function clearAllOnClick (){
        $("#clear-btn").on("click", function() {
            localStorage.clear();
            location.reload();
        })
    }
    
    
    function displayStoredText(textarea) {
        
        var storedTextInput = JSON.parse(localStorage.getItem("savedtext"));
        
        if (storedTextInput != null) {
            savedTextArray = storedTextInput;
            textarea.val(savedTextArray[i]);
            
        };
    };
    

    function checkTime(timeData, textarea) {
        
        if (timeData === currentHour) {
            textarea.addClass("present");
            
        } else if (timeData < currentHour) {
            textarea.addClass("past");
            
        } else {
            textarea.addClass("future");
            
        };
    }
    
    
    function storeTextInput() {
        localStorage.setItem("savedtext", JSON.stringify(savedTextArray));
    };
    

    displayTimeblocks(plannerHours[0], plannerHours[1]);
    saveTextAreaOnClick();
    clearAllOnClick ();
    
    
});