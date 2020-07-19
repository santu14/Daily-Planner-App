
$(document).ready(function () {

    //Create global variable for the current time using the moment.js library
    var now = moment();
    //Format the the varible now to only spit back the current hour within a 24hr cycle in to a new var
    var currentHour = parseInt(now.format("H"));

    //Hours to be displayed and the corresponding hour in the 24hr cycle
    var plannerHours = [
        displayData = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"],
        hourData = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    ];

    
    //array for storing text area values
    var savedTextArray = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    

    //Display the weekday month within the currentDay id
    $("#currentDay").text(moment(now).format("dddd MMMM Do"));


    //Logic for displaying all individual time blocks
    function displayTimeblocks(text, data) {

        //Create a var to access tbody where the timeblocks will be displayed
        var mainDisplay = $("tbody");

        //Loop through the array of displayData
        for (i = 0; i < text.length; i++) {
            //create new table row with the class time-block
            var newRow = $("<tr class='time-block'>");
            //Add a data-type equal to the hour data that corresponds to this timeblock
            newRow.attr("data-type", data[i]);
            //Create a varible to access this time data
            var timeData = parseInt(newRow.attr("data-type"));

            //Create a new area for table data with the class hour
            var timeDisplay = $("<td class='hour'>");
            //make the text within this area display its corresponding hour
            timeDisplay.text(text[i]);

            //Create a textarea with the class textare(plus the corresponding hourData)
            var textarea = $("<textarea class='textarea" + data[i] + "' rows='3' cols='60'>");
            //Create an table data to display the text area
            var textareaDisplay = $("<td class='description '>");
            //append the text area to the textarea display
            textareaDisplay.append(textarea);

            //Create an area to display a button and give it a data type that corresponds whith the correct savedTextArray index spot
            var saveBtnDisplay = $("<td class='saveBtn btn' data-type=" + i + ">");
            saveBtnDisplay.append($("<i class='fa fa-floppy-o fa-3x'>"));

             //Append all items created to the new row
            newRow.append(timeDisplay, textareaDisplay, saveBtnDisplay);
            mainDisplay.append(newRow);

            //Run the ckeckTime and displayStoredText functions
            checkTime(timeData, textarea);
            displayStoredText(textarea);

        }

        console.log(savedTextArray);
    }

    //Logic for saving our textarea value on click
    function saveTextAreaOnClick() {
        $(".saveBtn").on("click", function () {
            
            //when the button is clicked we create a current Time Data var that will grab the time data of the text area we have selceted
            var currentTimeData = $(this).parent().attr("data-type");
            //We create a varible that will indicate the current text are we have selected by using the textarea class plus the current timedata
            var clickedTextarea = $(".textarea" + currentTimeData);
            //we then grab the data-type of the button we clicked which will be equals to the index spot of our SavedTextArray
            var rowToArrayCorrelation = $(this).attr("data-type");
            
            //We then save the current textarea value to the corresponding spot on the array
            savedTextArray[rowToArrayCorrelation] = clickedTextarea.val();

            //store Array to local storage
            storeTextInput();
        });
    }
    
    //Clear all button function
    function clearAllOnClick (){
        $("#clear-btn").on("click", function() {
            //on click clear local storage and refresh the page
            localStorage.clear();
            location.reload();
        })
    }
    
    //Logic to display the saved text
    function displayStoredText(textarea) {
        //return our local storage string to an usable array
        var storedTextInput = JSON.parse(localStorage.getItem("savedtext"));

        //if our saved text is not empty
        if (storedTextInput != null) {
            //Make the saved text array equal the stored array
            savedTextArray = storedTextInput;
            //Display the saved text in the corresponding textarea
            textarea.val(savedTextArray[i]);
            
        };
    };
    
    //Logic for checking if timeblock is in the past present or future
    function checkTime(timeData, textarea) {
        
        //We check the time data which is equal to the datatype of each row to the current hour to see where we are currently in time
        if (timeData === currentHour) {
            textarea.addClass("present");
            
        } else if (timeData < currentHour) {
            textarea.addClass("past");
            
        } else {
            textarea.addClass("future");
            
        };
    }
    
    //Logic for storing our array
    function storeTextInput() {
        localStorage.setItem("savedtext", JSON.stringify(savedTextArray));
    };
    
    //Run our functions!
    displayTimeblocks(plannerHours[0], plannerHours[1]);
    saveTextAreaOnClick();
    clearAllOnClick ();
    
    
});