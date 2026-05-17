document.addEventListener("DOMContentLoaded", () => {
    // Interactive Timer Logic for Procrastination Page
    const timerDisplay = document.getElementById("pomodoro-timer");
    const startBtn = document.getElementById("start-timer-btn");
    const resetBtn = document.getElementById("reset-timer-btn");
    
    let timerInterval;
    let timeLeft = 25 * 60; // 25 minutes
    let isRunning = false;

    function updateTimerDisplay() {
        if (!timerDisplay) return;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    if (startBtn && timerDisplay) {
        startBtn.addEventListener("click", () => {
            if (!isRunning) {
                isRunning = true;
                startBtn.textContent = "השהה";
                startBtn.classList.replace("btn-primary", "btn-outline-primary");
                
                timerInterval = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timerInterval);
                        isRunning = false;
                        startBtn.textContent = "התחל מחדש";
                        startBtn.classList.replace("btn-outline-primary", "btn-primary");
                        alert("זמן העבודה הסתיים! קחו הפסקה של 5 דקות.");
                    }
                }, 1000);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.textContent = "המשך";
                startBtn.classList.replace("btn-outline-primary", "btn-primary");
            }
        });
    }

    if (resetBtn && timerDisplay) {
        resetBtn.addEventListener("click", () => {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = 25 * 60;
            updateTimerDisplay();
            if(startBtn) {
                startBtn.textContent = "התחל למידה (25 דק')";
                startBtn.classList.replace("btn-outline-primary", "btn-primary");
            }
        });
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
