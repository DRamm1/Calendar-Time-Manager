// 1) Display the current date at the top of the calendar
// - learn how to get the current date in JS and how to use dates in JS
// 2) Create time blocks
// - Utilize hard code in HTML using rows and colums
// - Loop over and render the table rows and colums in JS
// 3) Color-code time blocks for dates based on past, present and future
// - JS, and CSS
// - if then statements related to the date and then apply certain styling properties (select HTML elements in JS and add styles to it)
// 4) Let users type in the timeblocks
// - Use input fields with text that can be saved to local storage
// - On save we should store the date/time as the key and the event as a value
// -create an event listener for the save button that puts this key value pair on local storage.
// 5) On refresh, grab the data from local storage and display it in the correct time slot.

/**
 * The function currentDate() is called and it sets the current day and time to the dateNow and
 * timeNow variables.
 *
 * The dateNow variable is set to the current day and the timeNow variable is set to the current
 * time.
 *
 * The timeNow variable is set to update every second.
 *
 * The function is called at the end of the function.
 */
function currentDate() {
  let dateNow = $("#dateNow");

  dateNow
  .text(moment()
  .format("dddd, MMMM Do YYYY"));

  setInterval(function () {
    let timeNow = $("#timeNow");

    timeNow
    .text(moment()
    .format("h:mm:ss A"));
  }, 1000);
}
currentDate();

// createBlock variables
const containerEl = $(".container");

let id = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
let timeHR = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

let hourTime = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

let halfHourTime = [
  "7:30 AM",
  "8:30 AM",
  "9:30 AM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "1:30 PM",
  "2:30 PM",
  "3:30 PM",
  "4:30 PM",
  "5:30 PM",
];

/**
 * It creates a row for each hour of the day, and within each row, it creates a div for the hour, a div
 * for the description, a button for saving the description, and a button for clearing the description.
 */
function createBlocks() {
  let savedEvents = loadEvents();

  for (i = 0; i < hourTime.length; i++) {
    const rowEl = $("<div>").addClass("row d-flex justify-content-center");

    const hourEl = $("<div>").addClass("hour col-hour p-0 d-flex flex-column");

    let timeEl_1 = $("<div>")
    .addClass("headingTop h-50 text-right d-flex justify-content-center")
    .text(hourTime[i]);

    let timeEl_2 = $("<div>")
    .addClass("headingBottom h-50 text-right d-flex justify-content-center")
    .text(halfHourTime[i]);

    hourEl.append(timeEl_1, timeEl_2);

    const descriptionEl = $("<div>")
      .attr("id", timeHR[i])
      .addClass("description col-8 p-0 d-flex flex-column");

    let descEl_1 = $("<textarea>").addClass("topDescription h-50 d-flex justify-content-center");

    let descEl_2 = $("<textarea>").addClass("bottomDescription h-50 d-flex justify-content-center");

    if (savedEvents[hourTime[i]]) {
      descEl_1.text(savedEvents[hourTime[i]][0]);

      descEl_2.text(savedEvents[hourTime[i]][1]);
    }

    descriptionEl.append(descEl_1, descEl_2);

    const btnEl = $("<button>")
      .addClass("saveBtn col-1 btn")
      .attr("onclick", "saveEvents(event, '" + hourTime[i] + "')")
      .attr("onkeypress", "return pressedKey(event)");

    const spanEl = $("<span>").addClass(
      "fa-solid fa-square-check d-flex justify-content-center"
    );

    btnEl.append(spanEl);

    const clearEl = $("<button>")
      .addClass("clearBtn col-clear btn")
      .attr("onclick", "clearEvents(event, '" + hourTime[i] + "')")
      .attr("onkeypress", "return pressedKey(event)");

    const spanClearEl = $("<span>").addClass(
      "fa fa-delete-left d-flex justify-content-center"
    );

    clearEl.append(spanClearEl);

    rowEl.append(hourEl, descriptionEl, btnEl, clearEl);

    containerEl.append(rowEl);
  }
}
createBlocks();

/**
 * The function compares the current time to the time blocks in the planner. If the time block is less
 * than the current time, the text area is given the class of "past". If the time block is greater than
 * the current time, the text area is given the class of "future".
 */
function timeCompare() {
  let currHR = moment()
  .format("HH");
  let currTime = parseInt(currHR);

  const textArea = $(".description");

  $(textArea).removeClass(".past .present .future");

  for (i = 0; i < timeHR.length; i++) {
    let blockTime = timeHR[i];

    let textAreaEl = $("#" + blockTime);

    if (blockTime < currTime) {
      textAreaEl.addClass("past");
    } else if (blockTime > currTime) {
      textAreaEl.addClass("future");
    } else {
    }
  }
}
timeCompare();

/**
 * It takes the value of the txtArea and pushes them into an array.
 *
 * Then it checks if the array is empty or not.
 *
 * If it's not empty, it saves the array into localStorage.
 *
 * If it is empty, it does nothing.
 * @param event - the event object
 * @param eventTime - the time of the event
 */
function saveEvents(event, eventTime) {
  let eventsArr = [];

  const Parent = $(event.target).parent();

  const textParent = Parent.children(".description");

  const txtArea = textParent.children("textarea");

  const textTop = txtArea[0].value;
  const textBot = txtArea[1].value;

  if ((!textTop && textBot) || (textTop && !textBot) || (textTop && textBot)) {
    eventsArr.push(textTop, textBot);
  }

  if (eventsArr.length !== 0) {
    localStorage.setItem(eventTime, JSON.stringify(eventsArr));
  }

  event.target.blur();
}

/**
 * If the key pressed is the enter key, then save the score
 * @param event - The event object.
 * @returns The return value is the value of the last expression evaluated.
 */
function pressedKey(event) {
  if (event.keyCode == 13) {
    saveScore();
    return true;
  }
}

/**
 * It removes the event from local storage, clears the text areas, and removes focus from the button.
 * @param event - the event that was triggered
 * @param eventTime - the time of the event
 */
function clearEvents(event, eventTime) {
  localStorage.removeItem(eventTime);

  const Parent = $(event.target).parent();

  const textParent = Parent.children(".description");

  const txtArea = textParent.children("textarea");

  txtArea[0].value = "";
  txtArea[1].value = "";

  event.target.blur();
}

/**
 * The function loops through the hourTime array, and for each item in the array, it checks to see if
 * there is a saved event in local storage. If there is, it adds the saved event to the loadedEvents
 * object.
 */
function loadEvents() {
  let loadedEvents = {};

  for (i = 0; i < hourTime.length; i++) {
    let savedEvents = JSON.parse(localStorage
      .getItem(hourTime[i]));

    if (savedEvents !== null) {
      let timeBlock = hourTime[i];

      loadedEvents[timeBlock] = savedEvents;
    }
  }

  return loadedEvents;
}
loadEvents();