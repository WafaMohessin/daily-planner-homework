// Declaring Variables
let currentDayDisplay = $('#currentDay')
// Display time when page loads
currentDayDisplay.text(moment().format('LLLL'))
let currentHour = moment().hour()
let timeBlocks = []


// hourBlock Object
class hourBlock {
    constructor(time, taskEl, buttonEl) {
        this.time = time
        this.taskEl = taskEl
        this.buttonEl = buttonEl
    }
    // Will eventually load tasks into the textareas
    loadEvents() {
        this.taskEl.val(localStorage.getItem(this.time))
    }
    // Saves the tasks into local data
    saveButton() {
        this.buttonEl.on('click', e => {
            let task = $(e.target).closest('div.row').find('textarea').val()
            localStorage.setItem(this.time, task)
        })
    }
}

// Updates time every second
setInterval(function () {
    currentDayDisplay.text(moment().format('LLLL'))
    currentHour = moment().hour()
}, 1000)

// loop that creates the timeBlock objects and sets the colors of the textareas
$('.time-block').each(function(i) {

    timeBlocks.push(new hourBlock((i + 9), $(this).find('textarea'), $(this).find('.saveBtn')))
    timeBlocks[i].loadEvents()
    timeBlocks[i].saveButton()
    if (moment(currentHour).isSame(timeBlocks[i].time)) {

        $(this).find('textarea').toggleClass('past present')

    } else if (moment(currentHour).isBefore(timeBlocks[i].time)) {

        $(this).find('textarea').toggleClass('past future')

    }

})s