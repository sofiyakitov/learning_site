document.addEventListener("DOMContentLoaded", () => {
    // Interactive Timer Logic for Procrastination Page
    const timerDisplay = document.getElementById("pomodoro-timer");
    const startBtn = document.getElementById("start-timer-btn");
    const resetBtn = document.getElementById("reset-timer-btn");
    const modeButtons = document.querySelectorAll(".pomodoro-mode-btn");

    let timerInterval;
    let selectedDuration = 25 * 60;
    let timeLeft = selectedDuration;
    let isRunning = false;
    let widget;
    let widgetTime;
    let widgetToggleBtn;

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        if (!timerDisplay) return;
        const formattedTime = formatTime(timeLeft);
        timerDisplay.textContent = formattedTime;
        if (widgetTime) {
            widgetTime.textContent = formattedTime;
        }
    }

    function updateControls() {
        if (startBtn) {
            startBtn.textContent = isRunning ? "Pause" : "Start";
        }
        if (widgetToggleBtn) {
            widgetToggleBtn.setAttribute("aria-label", isRunning ? "Pause timer" : "Start timer");
            widgetToggleBtn.innerHTML = isRunning
                ? '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14"/></svg>'
                : '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7-11-7Z"/></svg>';
        }
    }

    function ensureFloatingWidget() {
        if (widget) return;

        widget = document.createElement("div");
        widget.className = "pomodoro-floating-widget";
        widget.setAttribute("aria-label", "Pomodoro mini timer");
        widget.innerHTML = `
            <span class="pomodoro-widget-time" aria-live="polite">${formatTime(timeLeft)}</span>
            <button type="button" class="pomodoro-widget-btn" aria-label="Pause timer"></button>
            <button type="button" class="pomodoro-widget-close" aria-label="Close mini timer">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
            </button>
        `;

        document.body.appendChild(widget);
        widgetTime = widget.querySelector(".pomodoro-widget-time");
        widgetToggleBtn = widget.querySelector(".pomodoro-widget-btn");
        const widgetCloseBtn = widget.querySelector(".pomodoro-widget-close");

        widgetToggleBtn.addEventListener("click", toggleTimer);
        widgetCloseBtn.addEventListener("click", () => {
            widget.classList.remove("visible");
        });
    }

    function showFloatingWidget() {
        ensureFloatingWidget();
        updateTimerDisplay();
        updateControls();
        requestAnimationFrame(() => widget.classList.add("visible"));
    }

    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        updateControls();
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        showFloatingWidget();
        updateControls();

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
                return;
            }

            stopTimer();
            timeLeft = selectedDuration;
            updateTimerDisplay();
        }, 1000);
    }

    function toggleTimer() {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        stopTimer();
        timeLeft = selectedDuration;
        updateTimerDisplay();
    }

    if (timerDisplay) {
        updateTimerDisplay();
    }

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modeButtons.forEach((modeButton) => {
                modeButton.classList.remove("active");
                modeButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            selectedDuration = Number(button.dataset.duration) * 60;
            resetTimer();
        });
    });

    if (startBtn && timerDisplay) {
        startBtn.addEventListener("click", toggleTimer);
    }

    if (resetBtn && timerDisplay) {
        resetBtn.addEventListener("click", resetTimer);
    }




    // Contact Form Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            contactForm.classList.add('was-validated');
        }, false);
    }
});
