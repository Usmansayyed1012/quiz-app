function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const termsAccepted = document.querySelector("input[type='checkbox']")?.checked;

  if (!fullName || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  if (!termsAccepted) {
    alert("You must accept the Terms & Conditions.");
    return;
  }

  const fullNamePattern = /^[a-zA-Z]+(\s[a-zA-Z]+)+$/;
  if (!fullName || !fullNamePattern.test(fullName)) {
    alert("Please enter your full name (first and last name).");
    return;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!passwordPattern.test(password)) {
    alert("Password must be at least 8 characters long and include at least one special character.");
    return;
  }

  const userData = {
    id: Date.now(),
    fullName,
    email,
    password,
    score: 0,
    tests: [] // Initialize an empty array for test details
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  window.location.href = "login.html";
  document.getElementById("signupForm").reset();
}

function togglePassword() {
  const passwordField = document.getElementById('password');
  const eyeIcon = document.getElementById('eye');
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    passwordField.type = 'password';
    eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

function validateLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Admin login validation
  if (email === "admin123" && password === "password") {
    alert("Login successful!");
    window.location.href = "admin-dashboard.html";
    return; // Exit the function after successful admin login
  }

  // Normal user login validation
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUserId", user.id);
    alert("Login successful!");
    window.location.href = "startQuiz.html";
  } else {
    alert("Invalid email or password!");
  }
}


let quizData = [
  { "question": "What is the effect of the i tag?", "answers": ["<i>", "<italic>", "<it>", "<pre>"], "correct": 0, "choosedAnswer": null },
  { "question": "What does the b tag do?", "answers": ["It makes text bold.", "It italicizes text.", "It underlines text.", "It changes the font color."], "correct": 1, "choosedAnswer": null },
  { "question": "Which tag is used to create a hyperlink?", "answers": ["<a>", "<href>", "<link>", "<url>"], "correct": 0, "choosedAnswer": null },
  { "question": "What is the effect of the u tag?", "answers": ["It underlines text.", "It makes text bold.", "It italicizes text.", "It changes text color."], "correct": 0, "choosedAnswer": null },
  { "question": "Which tag is used to insert an image?", "answers": ["<image>", "<img>", "<pic>", "<src>"], "correct": 1, "choosedAnswer": null },
  { "question": "What does the p tag do?", "answers": ["It defines a paragraph.", "It defines a header.", "It defines an ordered list.", "It defines a table."], "correct": 0, "choosedAnswer": null },
  { "question": "Which tag is used to create a table?", "answers": ["<table>", "<tab>", "<list>", "<tr>"], "correct": 0, "choosedAnswer": null },
  { "question": "What is the effect of the strong tag?", "answers": ["It makes text bold.", "It italicizes text.", "It defines a header.", "It defines a list."], "correct": 0, "choosedAnswer": null },
  { "question": "Which tag is used to create a line break?", "answers": ["<br>", "<hr>", "<lb>", "<break>"], "correct": 0, "choosedAnswer": null },
  { "question": "Which tag is used to create a list item?", "answers": ["<item>", "<li>", "<ul>", "<list>"], "correct": 1, "choosedAnswer": null }
];

const users = JSON.parse(localStorage.getItem("users")) || [];
users.forEach(user => {
  user.tests = user.tests || []; // Initialize tests if undefined
});
localStorage.setItem("users", JSON.stringify(users));

const selectedQuestions = quizData.sort(() => Math.random() - 0.5).slice(0, 10);
localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestions));
let data = JSON.parse(localStorage.getItem("selectedQuestion")) || [];
let currentIndex = 0;
const totalQuestions = data.length;
let score = 0;

function displayQuestion() {
  if (data.length > 0) {
    currentIndex = currentIndex % totalQuestions;

    let headerText = `Question ${currentIndex + 1} of 10`;
    if (currentIndex === totalQuestions - 2) { 
      headerText = "Last 2 Questions Left";
    } else if (currentIndex === totalQuestions - 1) { 
      headerText = "Hey, this is the Last Question";
    }

    document.querySelector("h1").innerHTML = headerText;
    const randomQue = data[currentIndex];
    document.getElementById("question-data").innerHTML = `${currentIndex + 1}. ${randomQue.question}`;
    const list = document.getElementById("option-list");
    list.innerHTML = "";

    randomQue.answers.forEach((option, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;
      if (randomQue.choosedAnswer === index) {
        listItem.classList.add("selected");
        listItem.style.backgroundColor = "#f3bd00";
        listItem.style.borderRadius = "10px";
        listItem.style.width = "fit-content";
      }

      listItem.addEventListener("click", () => {
        randomQue.choosedAnswer = index;
        if (index === randomQue.correct) {
          score += 10;
        }
        const options = list.querySelectorAll("li");
        options.forEach(option => {
          option.classList.remove("selected");
          option.style = "";
        });
        listItem.classList.add("selected");
        listItem.style.backgroundColor = "#f3bd00";
        listItem.style.borderRadius = "10px";
        listItem.style.width = "fit-content";
        list.style.hover = "#f3bd00";
        document.getElementById("nextBtn").disabled = false;
      });

      list.appendChild(listItem);
    });

    const previousBtn = document.getElementById("previousBtn");
    previousBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";

    updateProgress();
  }
}

function nextQuestion() {
  const currentQuestion = data[currentIndex];

  if (currentQuestion.choosedAnswer === null) {
    alert("Please select an answer before proceeding!");
    return;
  }

  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    displayQuestion();
  } else {
    const confirmation = confirm("Are you sure you want to submit?");
    if (confirmation) {
      saveScore(score);
      alert("Quiz Complete! Your score: " + score);
      window.location.href = "leaderboard.html";
    }
  }
}

function previousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    displayQuestion();
  } else {
    alert("You're already at the first question!");
  }
}

function updateProgress() {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  let progressBar = document.getElementById("progressBar");
  progressBar.style.width = progressPercentage + "%";
}

function saveScore(score) {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.id == loggedInUserId);

  if (user) {
    const testDetails = {
      date: new Date().toLocaleString(), // Store test date
      score: score, // Store score
      correctAnswers: Math.floor(score / 10), // Assuming each correct answer gives 10 points
    };

    user.tests = user.tests || []; // Ensure tests array exists
    user.tests.push(testDetails);

    // Debugging: Log user and tests data
    console.log("Updated user:", user);
    console.log("User tests:", user.tests);

    // Save updated users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Your score is saved! You have taken the test ${user.tests.length} time(s).`);
    window.location.href = "leaderboard.html";
  } else {
    alert("User not found!");
  }
}

function displayLeaderboard() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (users.length === 0) return;

  users.sort((a, b) => (b.score || 0) - (a.score || 0));

  const loggedInUser = users.find(user => user.id == loggedInUserId);
  const rank = users.indexOf(loggedInUser) + 1;

  for (let i = 0; i < 5; i++) {
    const scoreElement = document.getElementById(`score${i + 1}`);
    if (scoreElement && users[i]) {
      scoreElement.textContent = `${users[i].fullName} -  ${users[i].score}`;
    } else if (scoreElement) {
      scoreElement.textContent = " ";
    }
  }

  const score6Element = document.getElementById("score6");
  const userRankLabel = document.getElementById("userRankLabel");

  if (score6Element && userRankLabel) {
    if (rank > 5) {
      userRankLabel.textContent = `#${rank}`;
      score6Element.textContent = `${loggedInUser.fullName} -  ${loggedInUser.score}`;
    } else {
      userRankLabel.textContent = "#6";
      score6Element.textContent = " ";
    }
  }

  const rankElement = document.getElementById("userRank");
  if (rankElement) {
    rankElement.textContent = `Your rank: ${rank}`;
  }
}

window.onload = function() {
  displayLeaderboard();

  var logoutAvatar = document.getElementById("logoutAvatar");
  var logoutModal = document.getElementById("logoutModal");
  var cancelBtn = document.getElementById("cancelBtn");
  var confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  var userGreeting = document.getElementById("userGreeting");

  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var loggedInUserId = localStorage.getItem("loggedInUserId");
  var currentUser = null;

  for (var i = 0; i < users.length; i++) {
    if (users[i].id == loggedInUserId) {
      currentUser = users[i];
      break;
    }
  }

  if (currentUser) {
    userGreeting.textContent = "Are you sure you want to logout, " + currentUser.fullName + "?";
  }

  if (logoutAvatar) {
    logoutAvatar.onclick = function() {
      logoutModal.style.display = "block";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = function() {
      logoutModal.style.display = "none";
    };
  }

  if (confirmLogoutBtn) {
    confirmLogoutBtn.onclick = function() {
      localStorage.removeItem("loggedInUserId");
      alert("You have been logged out.");
      window.location.href = "login.html";
    };
  }

  window.onclick = function(e) {
    if (e.target === logoutModal) {
      logoutModal.style.display = "none";
    }
  };
};





//--------------------------------------Admin side code-------------------------------------------------------


// ------------------------ Hamburger Menu Toggle ------------------------
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');

hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  content.style.marginLeft = sidebar.classList.contains('open') ? '250px' : '0';
});

// ------------------------ Sidebar Link Active State ------------------------
const sidebarLinks = document.querySelectorAll('#sidebar .btn');
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    const activeLink = document.querySelector('#sidebar .btn.active');
    if (activeLink) activeLink.classList.remove('active');
    link.classList.add('active');

    // Close sidebar after link click
    sidebar.classList.remove('open');
    content.style.marginLeft = '0';
  });
});

// ------------------------ User Dropdown Toggle ------------------------
const userIcon = document.getElementById('user-icon');
const dropdown = document.getElementById('dropdown');
const logoutBtn = document.getElementById('logout-btn');

userIcon.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target) && event.target !== userIcon) {
    dropdown.classList.remove('active');
  }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to logout?')) {
    alert('You have logged out successfully!');
    window.location.href = 'login.html';
  }
});

// ------------------------ User Management ------------------------




// Home menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const homeMenu = document.querySelector('a[href="#home"]');
  const mainContent = document.querySelector('.content');

  // Load and display Home content
  homeMenu.addEventListener('click', () => {
    mainContent.innerHTML = `
      <h2>Welcome to Admin Page !!!</h2>
    `;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const usersMenu = document.querySelector('a[href="#users"]');
  const mainContent = document.querySelector('.content');

  // Users section
  usersMenu.addEventListener('click', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
      mainContent.innerHTML = '<h3>No users found!</h3>';
      return;
    }

    let tableHTML = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Email-id</th>
            <th>No. of Tests Given</th>
            <th>Scores</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    users.forEach((user, index) => {
      const testsGiven = user.tests ? user.tests.length : 0;

      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.fullName}</td>
          <td>${user.email}</td>
          <td>${testsGiven}</td>
          <td>${user.score || 0}</td>
          <td><button onclick="viewTests(${index})">View Tests</button></td>
        </tr>
      `;
    });

    tableHTML += `</tbody></table>`;
    mainContent.innerHTML = tableHTML;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const quizzesMenu = document.querySelector('a[href="#quizzes"]');
  const mainContent = document.querySelector('.content');
  const modal = document.getElementById("createQuestionModal");
  const questionForm = document.getElementById("questionForm");

  // Function to render quizzes table
  function renderQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem('selectedQuestion')) || [];

    if (quizzes.length === 0) {
      mainContent.innerHTML = '<h3>No quizzes found!</h3>';
      return;
    }

    let tableHTML = `
      <div class="quiz-header">
        <h2>MCQ Question Lists</h2>
        <hr>
        <div class="button-new-question" >
          <button type="button" class="add-btn" onclick="openModal()">Add new Question</button>
        </div>
      </div>
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;

    quizzes.forEach((quiz, index) => {
      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${quiz.question}</td>
          <td>
            <button onclick="viewQuiz(${index})" class="view-btn">👁️</button>
            <button onclick="editQuiz(${index})" class="edit-btn">✏️</button>
            <button onclick="deleteQuiz(${index})" class="delete-btn">🗑️</button>
          </td>
        </tr>
      `;
    });

    tableHTML += `</tbody></table>`;
    mainContent.innerHTML = tableHTML;
  }

  quizzesMenu.addEventListener('click', renderQuizzes);

  // Open modal function
  window.openModal = function () {
    modal.style.display = "block";
  };

  // Close modal function
  window.closeModal = function () {
    modal.style.display = "none";
  };

  // Close modal when clicking outside
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  // Handle form submission
  questionForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    const newQuiz = {
      question: document.getElementById("questionInput").value,
      options: [
        document.getElementById("option1").value,
        document.getElementById("option2").value,
        document.getElementById("option3").value,
        document.getElementById("option4").value,
      ],
      correctAnswer: document.getElementById("correctOption").value
    };

    // Get existing quizzes from localStorage
    let quizzes = JSON.parse(localStorage.getItem("selectedQuestion")) || [];
    quizzes.push(newQuiz);

    // Save updated list back to localStorage
    localStorage.setItem("selectedQuestion", JSON.stringify(quizzes));

    // Close modal and refresh table
    closeModal();
    renderQuizzes();

    // Reset form
    questionForm.reset();
  });

 // Function to delete quiz with confirmation
window.deleteQuiz = function (index) {
  const confirmDelete = confirm("Are you sure you want to delete this question?");
  if (confirmDelete) {
    let quizzes = JSON.parse(localStorage.getItem("selectedQuestion")) || [];
    quizzes.splice(index, 1);
    localStorage.setItem("selectedQuestion", JSON.stringify(quizzes));
    renderQuizzes();
  }
};




// Function to view quiz details safely
window.viewQuiz = function (index) {
  let quizzes = JSON.parse(localStorage.getItem("selectedQuestion")) || [];

  if (!Array.isArray(quizzes) || index < 0 || index >= quizzes.length) {
    alert("Invalid question selection.");
    return;
  }

  let quiz = quizzes[index];

  if (!quiz || !quiz.question || !Array.isArray(quiz.options)) {
    alert("Question data is corrupted or missing.");
    return;
  }

  let viewModal = document.getElementById("viewQuestionModal");
  viewModal.innerHTML = ""; // Clear previous content

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  modalContent.innerHTML = `
    <span class="close-btn" onclick="closeViewModal()">&times;</span>
    <h2>Question Details</h2>
    <p><strong>Question:</strong> ${quiz.question}</p>
    <p><strong>Options:</strong></p>
    <ul>
      <li>${quiz.options[0] ?? "N/A"}</li>
      <li>${quiz.options[1] ?? "N/A"}</li>
      <li>${quiz.options[2] ?? "N/A"}</li>
      <li>${quiz.options[3] ?? "N/A"}</li>
    </ul>
    <p><strong>Correct Answer:</strong> ${quiz.correctAnswer ?? "N/A"}</p>
  `;

  viewModal.appendChild(modalContent);
  viewModal.style.display = "block";
};



  // Load quizzes initially when quizzes menu is clicked
  if (window.location.hash === "#quizzes") {
    renderQuizzes();
  }
});
