document.addEventListener("DOMContentLoaded", function() {
    const importantEvents = [
        { date: "2024-05-09", name: "Victory Day" },
        { date: "2024-07-04", name: "Independence Day" },
        { date: "2024-10-31", name: "Halloween" },
        { date: "2024-11-23", name: "Thanksgiving" },
        { date: "2024-11-24", name: "Black Friday" },
        { date: "2024-12-25", name: "Christmas" },
        { date: "2024-12-31", name: "New Year's Eve" },
        { date: "2025-01-01", name: "New Year's Day" },
        { date: "2025-02-14", name: "Valentine's Day" },
        { date: "2025-03-17", name: "St. Patrick's Day" },
        { date: "2025-04-01", name: "April Fools' Day" },
        { date: "2025-11-28", name: "Thanksgiving" },
    ];

    const eventsContainer = document.getElementById("events");
    const countdownTimer = document.getElementById("countdownTimer");
    const countdownText = document.getElementById("countdownText");
    const datePicker = document.getElementById("datepicker");
    const datePickerStart = document.getElementById("datepickerStart");
    const datePickerEnd = document.getElementById("datepickerEnd");
    const dateDifferenceResult = document.getElementById("dateDifferenceResult");
    const dateDifferenceText = document.getElementById("dateDifferenceText");
    const calculateBtn = document.getElementById("calculateBtn");
    const calculateDifferenceBtn = document.getElementById("calculateDifferenceBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const refreshBtnDifference = document.getElementById("refreshBtnDifference");

    function displayImportantEvents() {
        importantEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.getMonth() + 1;
            const year = eventDate.getFullYear();
            const today = new Date();
            const remainingDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

            const eventElement = document.createElement("div");
            eventElement.classList.add("event");
            eventElement.innerHTML = `
                <h4>${event.name}</h4>
                <p>${day}/${month}/${year}</p>
                <p><i id="hourglassIcon" class="fas fa-hourglass-half"></i> ${remainingDays < 0 ? 'Event Passed' : remainingDays + ' days left'}</p>
            `;
            eventsContainer.appendChild(eventElement);
        });
    }

    function checkImportantDates() {
        const today = new Date();

        importantEvents.forEach(event => {
            const eventDate = new Date(event.date);
            
            if (today > eventDate) {
                const eventElement = eventsContainer.querySelector(`[data-date="${event.date}"] .event-text`);
                eventElement.textContent = "This date has passed";
            }
        });
    }

    function calculateCountdown() {
        const selectedDate = new Date(datePicker.value);
        const now = new Date();
        const timeDifference = selectedDate.getTime() - now.getTime(); 

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownTimer.innerHTML = `
                <span id="days">${days}</span> days
                <span id="hours">${hours}</span> hours
                <span id="minutes">${minutes}</span> minutes
                <span id="seconds">${seconds}</span> seconds
            `;

            countdownText.textContent = "Time remaining:";
        } else {
            countdownText.textContent = "Please select a future date.";
            countdownTimer.innerHTML = "";
        }
    }

    function calculateDateDifference() {
        const startDate = new Date(datePickerStart.value);
        const endDate = new Date(datePickerEnd.value);
        const timeDifference = endDate.getTime() - startDate.getTime();

        if (!isNaN(timeDifference) && timeDifference >= 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            dateDifferenceResult.innerHTML = `
                <span>${days}</span> days
            `;

            dateDifferenceText.textContent = "Difference between dates:";
        } else {
            dateDifferenceText.textContent = "Please select valid dates.";
            dateDifferenceResult.innerHTML = "";
        }
    }

    function clearFields() {
        datePicker.value = "";
        countdownTimer.innerHTML = "";
        countdownText.textContent = "Time remaining:"; 
        datePickerStart.value = "";
        datePickerEnd.value = "";
        dateDifferenceResult.innerHTML = "";
        dateDifferenceText.textContent = "Difference between dates:";
    }

    calculateBtn.addEventListener("click", calculateCountdown);
    calculateDifferenceBtn.addEventListener("click", calculateDateDifference);
    refreshBtn.addEventListener("click", clearFields);
    refreshBtnDifference.addEventListener("click", clearFields);

    displayImportantEvents();
    checkImportantDates();
});

  