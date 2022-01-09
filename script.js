// Declaring Variables
var currentDisplay = $('#currentDisplay')

// Display time when page loads
currentDisplay.text(moment().format('LLLL'))
var currentHour = moment().hour()
var timeBlocks = []


// hourBlock Object
class hourBlock {
    constructor(time, taskEl, buttonEl) {
        this.time = time
        this.taskEl = taskEl
        this.buttonEl = buttonEl
    }
    // load activity into the textareas
    loadEvents() {
        this.taskEl.val(localStorage.getItem(this.time))
    }
    // Saves the activities into local data
    saveButton() {
        this.buttonEl.on('click', e => {
            var task = $(e.target).closest('div.row').find('textarea').val()
            localStorage.setItem(this.time, task)
        })
    }
}

// Updates time every second
setInterval(function () {
    currentDisplay.text(moment().format('LLLL'))
    currentHour = moment().hour()
}, 1000)

// timeBlock objects and sets the colors of the textareas
    $('.time-block').each(function(i) {

    timeBlocks.push(new hourBlock((i + 9), $(this).find('textarea'), $(this).find('.saveBtn')))
    timeBlocks[i].loadEvents()
    timeBlocks[i].saveButton()
    if (moment(currentHour).isSame(timeBlocks[i].time)) {

        $(this).find('textarea').toggleClass('past present')

    } else if (moment(currentHour).isBefore(timeBlocks[i].time)) {

        $(this).find('textarea').toggleClass('past future')

    }

})