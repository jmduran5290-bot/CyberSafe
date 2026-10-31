document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // SAVE AND LOAD PROGRESS
    // =========================

    function loadData(key, fallback) {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    let completedLessons = loadData("cybersafeLessons", []);
    let completedMissions = loadData("cybersafeMissions", []);
    let totalXP = loadData("cybersafeXP", 0);
    let completedGames = loadData("cybersafeGames", []);

    function saveProgress() {
        localStorage.setItem("cybersafeLessons", JSON.stringify(completedLessons));
        localStorage.setItem("cybersafeMissions", JSON.stringify(completedMissions));
        localStorage.setItem("cybersafeXP", JSON.stringify(totalXP));
        localStorage.setItem("cybersafeGames", JSON.stringify(completedGames));
        updateDashboard();
    }

    // =========================
    // NAVIGATION
    // =========================

    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("pageTitle");

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle("active", page.id === pageId);
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.page === pageId);
        });

        const activeLink = document.querySelector(
            `.nav-link[data-page="${pageId}"]`
        );

        if (activeLink && pageTitle) {
            pageTitle.textContent = activeLink.textContent.trim();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            showPage(this.dataset.page);
        });
    });

    document.querySelectorAll("[data-go]").forEach(button => {
        button.addEventListener("click", function () {
            showPage(this.dataset.go);
        });
    });

    // =========================
    // DASHBOARD
    // =========================

    function updateDashboard() {
        document.getElementById("lessonCount").textContent =
            completedLessons.length;

        document.getElementById("xpCount").textContent = totalXP;

        document.getElementById("missionCount").textContent =
            completedMissions.length;

        document.getElementById("gameCount").textContent =
            completedGames.length;

        const totalTasks = 10;
        const completedTasks =
            completedLessons.length + completedMissions.length;

        const percentage = Math.round(
            (completedTasks / totalTasks) * 100
        );

        document.getElementById("progressBar").style.width =
            percentage + "%";

        document.getElementById("progressText").textContent =
            percentage + "% Completed";
    }

    // =========================
    // LEARNING HUB
    // =========================

    const lessons = [
        {
            id: "phishing",
            icon: "🎣",
            title: "Understanding Phishing",
            description: "Learn how scammers use fake messages to steal personal information.",
            content: `
                <h2>Understanding Phishing</h2>
                <p>Phishing is a type of cyberattack where criminals pretend to be a trusted person or organization to trick people into sharing sensitive information.</p>
                <h3>Common Warning Signs</h3>
                <ul>
                    <li>Unexpected messages asking for personal information.</li>
                    <li>Suspicious links or attachments.</li>
                    <li>Messages that create fear or urgency.</li>
                    <li>Unusual requests for passwords or OTP codes.</li>
                </ul>
                <p><strong>Safety Tip:</strong> Verify the sender before clicking links or responding to unexpected requests.</p>
            `
        },
        {
            id: "passwords",
            icon: "🔐",
            title: "Password Security",
            description: "Discover how to create strong and unique passwords.",
            content: `
                <h2>Password Security</h2>
                <p>A strong password helps protect your online accounts from unauthorized access.</p>
                <h3>Good Password Practices</h3>
                <ul>
                    <li>Use long and unique passwords.</li>
                    <li>Avoid personal information such as birthdays.</li>
                    <li>Do not reuse the same password on every account.</li>
                    <li>Consider using a trusted password manager.</li>
                    <li>Enable multi-factor authentication when available.</li>
                </ul>
            `
        },
        {
            id: "malware",
            icon: "🦠",
            title: "Understanding Malware",
            description: "Learn about harmful software and how it affects devices.",
            content: `
                <h2>Understanding Malware</h2>
                <p>Malware is software designed to harm devices, steal information, or gain unauthorized access.</p>
                <h3>Examples of Malware</h3>
                <ul>
                    <li>Virus – attaches itself to files or programs.</li>
                    <li>Ransomware – locks or encrypts files and demands payment.</li>
                    <li>Spyware – secretly collects information.</li>
                    <li>Trojan – disguises itself as legitimate software.</li>
                </ul>
                <p><strong>Safety Tip:</strong> Download programs only from trusted sources and keep your device updated.</p>
            `
        },
        {
            id: "privacy",
            icon: "🕵️",
            title: "Online Privacy",
            description: "Understand why protecting personal information matters.",
            content: `
                <h2>Online Privacy</h2>
                <p>Online privacy means controlling what personal information you share on the internet.</p>
                <h3>Protect Your Privacy</h3>
                <ul>
                    <li>Avoid posting sensitive personal information publicly.</li>
                    <li>Review the privacy settings of your accounts.</li>
                    <li>Be careful when using public Wi-Fi.</li>
                    <li>Do not share private photos or information with strangers.</li>
                </ul>
            `
        },
        {
            id: "social",
            icon: "📱",
            title: "Social Media Safety",
            description: "Practice responsible and safe social media use.",
            content: `
                <h2>Social Media Safety</h2>
                <p>Social media helps people communicate, but it can also expose users to scams, fake accounts, and privacy risks.</p>
                <h3>Stay Safe on Social Media</h3>
                <ul>
                    <li>Be careful when accepting friend requests.</li>
                    <li>Report suspicious accounts.</li>
                    <li>Think before sharing posts and personal information.</li>
                    <li>Do not open unexpected links from unknown accounts.</li>
                </ul>
            `
        }
    ];

    const lessonList = document.getElementById("lessonList");
    const lessonModal = document.getElementById("lessonModal");
    const lessonContent = document.getElementById("lessonContent");

    function renderLessons() {
        lessonList.innerHTML = "";

        lessons.forEach(lesson => {
            const isCompleted = completedLessons.includes(lesson.id);

            const card = document.createElement("div");
            card.className = "lesson-card" + (isCompleted ? " completed" : "");

            card.innerHTML = `
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                ${isCompleted ? '<p class="completed-label">✓ Completed</p>' : ""}
                <button class="primary-btn open-lesson">Read Lesson →</button>
            `;

            card.querySelector(".open-lesson").addEventListener("click", function () {
                openLesson(lesson);
            });

            lessonList.appendChild(card);
        });
    }

    function openLesson(lesson) {
        lessonContent.innerHTML = lesson.content;

        if (!completedLessons.includes(lesson.id)) {
            completedLessons.push(lesson.id);
            totalXP += 10;
            saveProgress();
            renderLessons();
        }

        lessonModal.classList.add("show");
    }

    document.getElementById("closeModal").addEventListener("click", function () {
        lessonModal.classList.remove("show");
    });

    lessonModal.addEventListener("click", function (event) {
        if (event.target === lessonModal) {
            lessonModal.classList.remove("show");
        }
    });

    renderLessons();

    // =========================
    // CYBER QUIZ
    // =========================

    const quizQuestions = [
        {
            question: "What is phishing?",
            choices: [
                "A way to improve internet speed",
                "A trick used to steal personal information",
                "A computer cleaning process",
                "A type of computer hardware"
            ],
            answer: 1,
            explanation: "Phishing tricks people into revealing sensitive information through fake messages or websites."
        },
        {
            question: "Which is the safest password practice?",
            choices: [
                "Use your birthday",
                "Use the same password everywhere",
                "Use long and unique passwords",
                "Share your password with friends"
            ],
            answer: 2,
            explanation: "Long, unique passwords make accounts harder to compromise."
        },
        {
            question: "What should you do with a suspicious link?",
            choices: [
                "Click it immediately",
                "Share it with everyone",
                "Ignore all warnings",
                "Verify it before opening"
            ],
            answer: 3,
            explanation: "Always verify unexpected links before opening them."
        },
        {
            question: "What does OTP mean?",
            choices: [
                "One-Time Password",
                "Online Transfer Program",
                "Open Text Page",
                "One Type Program"
            ],
            answer: 0,
            explanation: "An OTP is a temporary verification code. Never share it with other people."
        },
        {
            question: "What is malware?",
            choices: [
                "A safe website",
                "A harmful type of software",
                "A computer accessory",
                "A social media application"
            ],
            answer: 1,
            explanation: "Malware is software designed to harm devices or access information without permission."
        }
    ];

    const quizBox = document.getElementById("quizBox");
    let quizIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;

    function renderQuiz() {
        if (quizIndex >= quizQuestions.length) {
            quizBox.innerHTML = `
                <div class="score-display">QUIZ COMPLETED</div>
                <h2>Your Score: ${quizScore} / ${quizQuestions.length}</h2>
                <p class="muted">You have completed the cybersecurity quiz!</p>
                <button class="primary-btn" id="restartQuiz">Try Again</button>
            `;

            document.getElementById("restartQuiz").addEventListener("click", function () {
                quizIndex = 0;
                quizScore = 0;
                quizAnswered = false;
                renderQuiz();
            });

            return;
        }

        const question = quizQuestions[quizIndex];
        quizAnswered = false;

        quizBox.innerHTML = `
            <div class="question-count">
                QUESTION ${quizIndex + 1} OF ${quizQuestions.length}
            </div>
            <h2 class="question-text">${question.question}</h2>
            <div class="answer-list">
                ${question.choices.map((choice, index) => `
                    <button class="answer-btn" data-answer="${index}">
                        ${String.fromCharCode(65 + index)}. ${choice}
                    </button>
                `).join("")}
            </div>
            <div id="quizFeedback"></div>
            <button class="primary-btn" id="nextQuestion" style="display:none">
                ${quizIndex === quizQuestions.length - 1 ? "See Results" : "Next Question"}
            </button>
        `;

        quizBox.querySelectorAll("[data-answer]").forEach(button => {
            button.addEventListener("click", function () {
                if (quizAnswered) return;

                quizAnswered = true;

                const selected = Number(this.dataset.answer);
                const isCorrect = selected === question.answer;

                if (isCorrect) quizScore++;

                quizBox.querySelectorAll(".answer-btn").forEach(option => {
                    option.disabled = true;

                    if (Number(option.dataset.answer) === question.answer) {
                        option.classList.add("correct");
                    }
                });

                if (!isCorrect) {
                    this.classList.add("wrong");
                }

                document.getElementById("quizFeedback").innerHTML = `
                    <div class="feedback ${isCorrect ? "good" : "bad"}">
                        <strong>${isCorrect ? "Correct!" : "Not quite!"}</strong>
                        <p>${question.explanation}</p>
                    </div>
                `;

                document.getElementById("nextQuestion").style.display = "inline-block";
            });
        });

        document.getElementById("nextQuestion").addEventListener("click", function () {
            quizIndex++;
            renderQuiz();
        });
    }

    renderQuiz();

    // =========================
    // THREAT CHECKER
    // =========================

    document.getElementById("checkThreat").addEventListener("click", function () {

        const message = document.getElementById("threatInput").value.trim();
        const result = document.getElementById("threatResult");

        if (message === "") {
            result.innerHTML = `
                <div class="feedback bad">
                    <strong>Please enter a message.</strong>
                    <p>Maglagay muna ng message na gusto mong i-check.</p>
                </div>
            `;
            return;
        }

        const suspiciousPatterns = [
            {
                pattern: /click\s+(this\s+)?link/i,
                reason: "Suspicious link instruction"
            },
            {
                pattern: /enter\s+your\s+password/i,
                reason: "Request for password"
            },
            {
                pattern: /send\s+(me\s+)?your\s+otp/i,
                reason: "Request for OTP"
            },
            {
                pattern: /verify\s+your\s+account/i,
                reason: "Unusual account verification request"
            },
            {
                pattern: /account\s+(will\s+be\s+)?suspended/i,
                reason: "Account suspension threat"
            },
            {
                pattern: /claim\s+your\s+(prize|reward)/i,
                reason: "Suspicious prize or reward offer"
            },
            {
                pattern: /you\s+(have\s+)?won\s+(a\s+)?(prize|money)/i,
                reason: "Unexpected prize notification"
            },
            {
                pattern: /send\s+money\s+(now|immediately)/i,
                reason: "Urgent money request"
            },
            {
                pattern: /limited\s+time\s+offer/i,
                reason: "Pressure to act quickly"
            },
            {
                pattern: /urgent.*(password|account|payment)/i,
                reason: "Urgent request involving sensitive information"
            }
        ];

        const detectedThreats = suspiciousPatterns.filter(item =>
            item.pattern.test(message)
        );

        if (detectedThreats.length > 0) {
            result.innerHTML = `
                <div class="threat-warning">
                    <h3>⚠️ POTENTIAL THREAT DETECTED</h3>
                    <p>This message contains suspicious indicators.</p>
                    <h4>Detected Warning Signs:</h4>
                    <ul>
                        ${detectedThreats.map(item => `<li>${item.reason}</li>`).join("")}
                    </ul>
                    <p><strong>Safety Recommendation:</strong></p>
                    <p>Do not click suspicious links, share passwords,
                    or provide OTP codes. Verify the sender first.</p>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="threat-safe">
                    <h3>✅ NO THREAT DETECTED</h3>
                    <p>No common suspicious indicators were found in this message.</p>
                    <p><strong>Safety Recommendation:</strong></p>
                    <p>Continue practicing safe online habits.
                    Always verify unknown senders and links.</p>
                </div>
            `;
        }
    });

    // =========================
    // PASSWORD CHECKER
    // =========================

    document.getElementById("checkPassword").addEventListener("click", function () {

        const password = document.getElementById("passwordInput").value;
        const result = document.getElementById("passwordResult");

        if (password.length === 0) {
            result.innerHTML = `
                <div class="feedback bad">Please enter a sample password first.</div>
            `;
            return;
        }

        let score = 0;
        const suggestions = [];

        if (password.length >= 12) score++;
        else suggestions.push("Use at least 12 characters.");

        if (/[A-Z]/.test(password)) score++;
        else suggestions.push("Add an uppercase letter.");

        if (/[a-z]/.test(password)) score++;
        else suggestions.push("Add a lowercase letter.");

        if (/[0-9]/.test(password)) score++;
        else suggestions.push("Add a number.");

        if (/[^A-Za-z0-9]/.test(password)) score++;
        else suggestions.push("Add a special character.");

        let strength = "Weak";
        let percentage = 20;

        if (score >= 5) {
            strength = "Strong";
            percentage = 100;
        } else if (score >= 3) {
            strength = "Medium";
            percentage = 60;
        }

        const strengthColor =
            score >= 5 ? "#22c55e" :
            score >= 3 ? "#facc15" : "#ef4444";

        result.innerHTML = `
            <div class="password-result">
                <h3>Password Strength: <span style="color:${strengthColor}">${strength}</span></h3>
                <div class="strength-track">
                    <div class="strength-fill"
                         style="width:${percentage}%;background:${strengthColor}">
                    </div>
                </div>
                <p><strong>Suggestions:</strong></p>
                ${
                    suggestions.length
                    ? `<ul>${suggestions.map(item => `<li>${item}</li>`).join("")}</ul>`
                    : "<p>Your sample password meets all the listed checks.</p>"
                }
            </div>
        `;
    });

    // =========================
    // CYBER MISSIONS
    // =========================

    const missions = [
        "Create a strong and unique sample password.",
        "Learn how to recognize phishing messages.",
        "Review the privacy settings of your social media account.",
        "Enable two-factor authentication on an account.",
        "Learn why you should never share your OTP."
    ];

    const missionList = document.getElementById("missionList");

    function renderMissions() {
        missionList.innerHTML = "";

        missions.forEach((mission, index) => {
            const isDone = completedMissions.includes(index);

            const label = document.createElement("label");
            label.className = "mission-item" + (isDone ? " done" : "");

            label.innerHTML = `
                <input type="checkbox" ${isDone ? "checked" : ""}>
                <span>${mission}</span>
            `;

            label.querySelector("input").addEventListener("change", function () {
                if (this.checked && !completedMissions.includes(index)) {
                    completedMissions.push(index);
                    totalXP += 5;
                } else if (!this.checked && completedMissions.includes(index)) {
                    completedMissions = completedMissions.filter(item => item !== index);
                    totalXP = Math.max(0, totalXP - 5);
                }

                saveProgress();
                renderMissions();
            });

            missionList.appendChild(label);
        });
    }

    renderMissions();

    // =========================
    // SPOT THE RED FLAGS GAME
    // =========================

    const redFlagQuestions = [
        {
            message: "URGENT! Your bank account will be suspended today. Click this link and enter your password to verify your account.",
            options: [
                "The message creates urgency and fear.",
                "It asks for a password.",
                "It tells the receiver to click an unexpected link.",
                "It includes a friendly greeting."
            ],
            correct: [0, 1, 2],
            explanation: "The message pressures the receiver, requests a password, and encourages clicking an unexpected link. These are common phishing warning signs."
        },
        {
            message: "Congratulations! You won a free smartphone. Pay a small processing fee now to receive your prize.",
            options: [
                "It promises an unexpected prize.",
                "It asks for money before receiving the prize.",
                "It gives a normal school announcement.",
                "It pressures the receiver to pay."
            ],
            correct: [0, 1, 3],
            explanation: "Unexpected prizes and requests for advance payment are common scam warning signs."
        },
        {
            message: "Hello! I am from technical support. Please send me the OTP you received so I can fix your account.",
            options: [
                "The sender asks for an OTP.",
                "The sender claims to be technical support.",
                "The sender asks for a private verification code.",
                "The message gives a class schedule."
            ],
            correct: [0, 1, 2],
            explanation: "Never share OTPs or verification codes. A person claiming to be support should not ask you to reveal them."
        },
        {
            message: "Hi! Our group project meeting is scheduled for 10 AM tomorrow. Please bring your notes.",
            options: [
                "It requests an OTP.",
                "It contains an unexpected prize.",
                "It gives a normal meeting announcement.",
                "It threatens to suspend an account."
            ],
            correct: [2],
            explanation: "This message looks like a normal announcement and does not contain the warning signs listed in the activity. Still, always consider who sent it and the context."
        }
    ];

    const redFlagsBox = document.getElementById("redFlagsBox");
    let redFlagIndex = 0;
    let redFlagScore = 0;
    let redFlagAnswered = false;

    function renderRedFlags() {
        if (redFlagIndex >= redFlagQuestions.length) {
            finishGame("redflags", redFlagsBox, redFlagScore, redFlagQuestions.length,
                "Red Flags Game Completed!");

            return;
        }

        const question = redFlagQuestions[redFlagIndex];
        redFlagAnswered = false;

        redFlagsBox.innerHTML = `
            <div class="score-display">
                SCORE: ${redFlagScore} / ${redFlagQuestions.length}
            </div>
            <div class="game-progress">
                MESSAGE ${redFlagIndex + 1} OF ${redFlagQuestions.length}
            </div>
            <div class="game-message">
                <strong>Sample Message:</strong><br>
                "${question.message}"
            </div>
            <h3 class="question-text">Select all warning signs you can identify:</h3>
            <div class="flag-options">
                ${question.options.map((option, index) => `
                    <label class="flag-option">
                        <input type="checkbox" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join("")}
            </div>
            <div id="redFlagFeedback"></div>
            <div class="game-actions">
                <button class="primary-btn" id="submitFlags">Submit Answer</button>
                <button class="secondary-btn" id="nextFlags" style="display:none">Next Message →</button>
            </div>
        `;

        document.getElementById("submitFlags").addEventListener("click", function () {
            if (redFlagAnswered) return;

            const selected = Array.from(
                redFlagsBox.querySelectorAll("input[type='checkbox']:checked")
            ).map(input => Number(input.value));

            if (selected.length === 0) {
                document.getElementById("redFlagFeedback").innerHTML =
                    `<div class="feedback bad">Please select at least one answer.</div>`;
                return;
            }

            redFlagAnswered = true;

            const correct = question.correct;
            const isCorrect =
                selected.length === correct.length &&
                selected.every(value => correct.includes(value));

            if (isCorrect) redFlagScore++;

            redFlagsBox.querySelectorAll("input").forEach(input => {
                input.disabled = true;
            });

            document.getElementById("redFlagFeedback").innerHTML = `
                <div class="feedback ${isCorrect ? "good" : "bad"}">
                    <strong>${isCorrect ? "Excellent! All correct!" : "Good try! Review the explanation."}</strong>
                    <p>${question.explanation}</p>
                </div>
            `;

            document.getElementById("submitFlags").style.display = "none";
            document.getElementById("nextFlags").style.display = "inline-block";
        });

        document.getElementById("nextFlags").addEventListener("click", function () {
            redFlagIndex++;
            renderRedFlags();
        });
    }

    // =========================
    // CYBER SAFETY SIMULATOR
    // =========================

    const scenarios = [
        {
            situation: "You receive a message from an unknown account saying you won a cash prize. It asks you to click a link and provide your personal details.",
            question: "What should you do?",
            choices: [
                "Click the link and provide your details.",
                "Ignore the message and verify the offer through an official source.",
                "Forward the message to all your friends.",
                "Send your password to claim the prize."
            ],
            answer: 1,
            explanation: "Unexpected prize messages may be scams. Do not click suspicious links or provide personal details. Verify claims through official channels."
        },
        {
            situation: "You accidentally entered your password on a website that you now suspect is fake.",
            question: "What is the safest next step?",
            choices: [
                "Do nothing and wait.",
                "Share the website with friends.",
                "Change the affected password using the official website or app and secure the account.",
                "Send your OTP to the website."
            ],
            answer: 2,
            explanation: "Change the compromised password using the official service, and enable multi-factor authentication if available. If you reused that password, change it on other accounts too."
        },
        {
            situation: "A person online asks you to send your OTP because they claim they need it to verify your identity.",
            question: "What should you do?",
            choices: [
                "Send the OTP immediately.",
                "Post the OTP publicly.",
                "Refuse to share it and report the suspicious request.",
                "Give them your account password instead."
            ],
            answer: 2,
            explanation: "An OTP is a private verification code. Never share it with another person, even if they claim to be from support."
        },
        {
            situation: "You are using public Wi-Fi at a coffee shop and need to access your bank account.",
            question: "What is the safer choice?",
            choices: [
                "Use a trusted mobile data connection if possible.",
                "Use any website that appears in a pop-up.",
                "Share your banking details with someone nearby.",
                "Turn off all security settings."
            ],
            answer: 0,
            explanation: "For sensitive activities, a trusted mobile data connection is generally safer than an unknown public Wi-Fi network. Always use the official banking app or website."
        },
        {
            situation: "A stranger sends you a friend request and asks for your home address and school schedule.",
            question: "What should you do?",
            choices: [
                "Share all the information.",
                "Send your daily routine.",
                "Avoid sharing private details and block or report the account if suspicious.",
                "Give the stranger your account password."
            ],
            answer: 2,
            explanation: "Keep personal information private. Be cautious with strangers online and use platform safety tools when needed."
        }
    ];

    const simulatorBox = document.getElementById("simulatorBox");
    let scenarioIndex = 0;
    let scenarioScore = 0;
    let scenarioAnswered = false;

    function renderSimulator() {
        if (scenarioIndex >= scenarios.length) {
            finishGame("simulator", simulatorBox, scenarioScore, scenarios.length,
                "Cyber Safety Simulation Completed!");

            return;
        }

        const scenario = scenarios[scenarioIndex];
        scenarioAnswered = false;

        simulatorBox.innerHTML = `
            <div class="score-display">
                SCORE: ${scenarioScore} / ${scenarios.length}
            </div>
            <div class="game-progress">
                SCENARIO ${scenarioIndex + 1} OF ${scenarios.length}
            </div>
            <div class="game-message">
                <strong>Situation:</strong><br>
                ${scenario.situation}
            </div>
            <h3 class="question-text">${scenario.question}</h3>
            <div id="scenarioChoices">
                ${scenario.choices.map((choice, index) => `
                    <button class="scenario-choice" data-choice="${index}">
                        ${String.fromCharCode(65 + index)}. ${choice}
                    </button>
                `).join("")}
            </div>
            <div id="scenarioFeedback"></div>
            <button class="primary-btn" id="nextScenario" style="display:none">
                ${scenarioIndex === scenarios.length - 1 ? "See Final Score" : "Next Scenario →"}
            </button>
        `;

        simulatorBox.querySelectorAll("[data-choice]").forEach(button => {
            button.addEventListener("click", function () {
                if (scenarioAnswered) return;

                scenarioAnswered = true;

                const selected = Number(this.dataset.choice);
                const isCorrect = selected === scenario.answer;

                if (isCorrect) scenarioScore++;

                simulatorBox.querySelectorAll(".scenario-choice").forEach(option => {
                    option.disabled = true;

                    if (Number(option.dataset.choice) === scenario.answer) {
                        option.classList.add("correct");
                    }
                });

                if (!isCorrect) {
                    this.classList.add("wrong");
                }

                document.getElementById("scenarioFeedback").innerHTML = `
                    <div class="feedback ${isCorrect ? "good" : "bad"}">
                        <strong>${isCorrect ? "Correct decision!" : "Not the safest choice."}</strong>
                        <p>${scenario.explanation}</p>
                    </div>
                `;

                document.getElementById("nextScenario").style.display = "inline-block";
            });
        });

        document.getElementById("nextScenario").addEventListener("click", function () {
            scenarioIndex++;
            renderSimulator();
        });
    }

    // =========================
    // GAME COMPLETION
    // =========================

    function finishGame(gameId, container, score, total, heading) {
        const isNewCompletion = !completedGames.includes(gameId);

        if (isNewCompletion) {
            completedGames.push(gameId);
            totalXP += 20;
            saveProgress();
        }

        container.innerHTML = `
            <div class="score-display">${heading}</div>
            <h2>Your Final Score: ${score} / ${total}</h2>
            <p class="muted">
                ${score === total
                    ? "Perfect score! Excellent cybersecurity awareness!"
                    : "Good effort! Review the explanations and try again to improve your score."}
            </p>
            <p class="muted">
                ${isNewCompletion
                    ? "You earned 20 XP for completing this activity!"
                    : "You have already earned the completion XP for this activity."}
            </p>
            <button class="primary-btn" id="playAgain">Play Again</button>
        `;

        document.getElementById("playAgain").addEventListener("click", function () {
            if (gameId === "redflags") {
                redFlagIndex = 0;
                redFlagScore = 0;
                redFlagAnswered = false;
                renderRedFlags();
            } else {
                scenarioIndex = 0;
                scenarioScore = 0;
                scenarioAnswered = false;
                renderSimulator();
            }
        });
    }

    renderRedFlags();
    renderSimulator();

    // =========================
    // INITIAL DASHBOARD
    // =========================

    updateDashboard();
    showPage("dashboard");

});