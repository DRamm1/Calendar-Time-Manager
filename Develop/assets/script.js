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

var currentDayEl = $('#currentDat');
var containerEl = $('.container');
var currentHr = moment()
.hour();

var dayHours = [
    moment().
    hour(9).
    format('HH:mm:ss'),
    moment().
    hour(10).
    format('HH:mm:ss'),
    moment().
    hour(11).
    format('HH:mm:ss'),
    moment().
    hour(12).
    format('HH:mm:ss'),
    moment().
    hour(13).
    format('HH:mm:ss'),
    moment().
    hour(14).
    format('HH:mm:ss'),
    moment().
    hour(15).
    format('HH:mm:ss'),
    moment().
    hour(16).
    format('HH:mm:ss'),
    moment().
    hour(17).
    format('HH:mm:ss'),
];

var timeHour = $('col-1 hour')

var task = $('.description')

var currentDay = moment()
.format('dddd, MMMM Do');
currentDayEl.text(currentDay);