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

    // Stop Animation Toggle Logic for Distractions Page
    const animToggleBtn = document.getElementById("animToggleBtn");
    if (animToggleBtn) {
        animToggleBtn.addEventListener("click", function() {
            const isPaused = this.dataset.paused === "true";
            document.querySelectorAll('.phone-notification').forEach(el => {
                el.style.animationPlayState = isPaused ? 'running' : 'paused';
            });
            this.dataset.paused = !isPaused;
            
            if (!isPaused) {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-play-fill me-1" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                    המשך אנימציה
                `;
                this.classList.remove('btn-outline-danger');
                this.classList.add('btn-outline-success');
            } else {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-stop-fill me-1" viewBox="0 0 16 16">
                        <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                    </svg>
                    עצור אנימציה
                `;
                this.classList.remove('btn-outline-success');
                this.classList.add('btn-outline-danger');
            }
        });
    }
});
