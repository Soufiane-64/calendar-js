const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev");
(next = document.querySelector(".next")),
    (todayBtn = document.querySelector(".todaybtn")),
    (gotoBtn = document.querySelector(".gotobtn")),
    (dateInput = document.querySelector(".date-input"));

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
];


//Funktion zum Hinzufügen von Tagen

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update date on the Top
    date.innerHTML = months[month] + " " + year;

    // adding days 
    let days = "";

    //prev moth days
    for (let x = day; x > 0; x--) {
        days += `<div class = "day prev-date" >${prevDays - x + 1}</div>`;
    }
    // current month days
    for (let i = 1; i <= lastDate; i++) {
        //if day is today add class today
        if (i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class = "day today" >${i}</div>`;
        }
        else {
            days += `<div class = "day" >${i}</div>`;
        }
    }

    //next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class = "day next-date" >${j}</div>`;
    }

    daysContainer.innerHTML = days;
}

initCalendar();

//prev month 
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// add eventlistnner on prev and next

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);


todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});


dateInput.addEventListener("input", (e) => {
    // allow only numbers remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    if (dateInput.value.length === 2) {
        // add a slash if two numbers entred
        dateInput.value += "/";

    }

    if (dateInput.value.length > 7) {
        // dont allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    // if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }

});

gotoBtn.addEventListener("click", gotoDate);

// functio to go to the entred date  
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // Date validation
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {

            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    // if the date is invalid
    alert("ungültiges Datum");



}