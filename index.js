function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const termsAccepted = document.querySelector("input[type='checkbox']")?.checked;

  if (!fullName || !email || !password ) {
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
    score: 0
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

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUserId", user.id);
    alert("Login successful!");
    window.location.href = "startQuiz.html";
  } else {
    alert("Invalid email or password!");
  }

  if (email === "admin123" && password === "password") {
    alert("Login successful!");
    window.location.href = "admin-dashboard.html";
} else {
    alert("Invalid Admin ID or Password. Please try again.");
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
    user.score = score;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Your score is saved!");
    window.location.href = "leaderboard.html";
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
      scoreElement.textContent = `${users[i].fullName} - Score: ${users[i].score}`;
    } else if (scoreElement) {
      scoreElement.textContent = " ";
    }
  }

  const score6Element = document.getElementById("score6");
  const userRankLabel = document.getElementById("userRankLabel");

  if (score6Element && userRankLabel) {
    if (rank > 5) {
      userRankLabel.textContent = `#${rank}`;
      score6Element.textContent = `${loggedInUser.fullName} - Score:- ${loggedInUser.score}`;
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















window.onload = displayLeaderboard();




window.onload = function() {
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


// function validateAdminLogin(event) {
//   event.preventDefault();
//   var adminId = document.getElementById('email').value;
//   var adminPassword = document.getElementById('password').value;

//   if (adminId === "admin123" && adminPassword === "password") {
//       alert("Login successful!");
//       window.location.href = "admin-dashboard.html";
//   } else {
//       alert("Invalid Admin ID or Password. Please try again.");
//   }
// }


// ------------------------------------admin js-----------------------



    //-----------------------------------------------


    

