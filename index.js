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

// function displayQuestion() {
//   if (data.length > 0) {
//     currentIndex = currentIndex % totalQuestions;
//     document.getElementById("ques-number").innerHTML = currentIndex + 1;
    
//     const randomQue = data[currentIndex];
//     document.getElementById("question-data").innerHTML = `${currentIndex + 1}. ${randomQue.question}`;
//     const list = document.getElementById("option-list");
//     list.innerHTML = "";

//     randomQue.answers.forEach((option, index) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = option;
//       if (randomQue.choosedAnswer === index) {
//         listItem.classList.add("selected");
//         listItem.style.backgroundColor = "#f3bd00";
//         listItem.style.borderRadius = "10px";
//         listItem.style.width = "fit-content";
//       }

//       listItem.addEventListener("click", () => {
//         randomQue.choosedAnswer = index;
//         if (index === randomQue.correct) {
//           score += 10;
//         }
//         const options = list.querySelectorAll("li");
//         options.forEach(option => {
//           option.classList.remove("selected");
//           option.style = "";
//         });
//         listItem.classList.add("selected");
//         listItem.style.backgroundColor = "#f3bd00";
//         listItem.style.borderRadius = "10px";
//         listItem.style.width = "fit-content";
//         document.getElementById("nextBtn").disabled = false;
//       });

//       list.appendChild(listItem);
//     });

//     const previousBtn = document.getElementById("previousBtn");
//     previousBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";

//     updateProgress();
//   }
// }

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
    saveScore(score);
    alert("Quiz Complete! Your score: " + score);
    window.location.href = "leaderboard.html";
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

  if (users.length === 0) return; // Agar koi user nahi hai, toh kuch mat karo

  users.sort((a, b) => (b.score || 0) - (a.score || 0)); // Score ke hisaab se sort karoega

  // Logged-in user ka rank aur score dikhana
  const rank = users.findIndex(user => user.id == loggedInUserId) + 1;
  document.getElementById("userRank").textContent = rank || " ";

  // Top 6 ranks ke scores dikhana
  for (let i = 1; i <= 6; i++) {
    const scoreElement = document.getElementById(`score${i}`);
    const user = users[i - 1]; // Rank 1 ke liye index 0
    if (scoreElement && user) {
      scoreElement.textContent = `${user.fullName || "Unknown"} - ${user.score || 0}`;
    }
  }
}






window.onload = displayLeaderboard();



  // Logout ka function
  // window.onload = function () {
  //   var logoutBtn = document.getElementById("logoutBtn");

  //   if (logoutBtn) {
  //     logoutBtn.onclick = function () {
  //       const confirmation = confirm("Are you sure you want to log out?");
  //       if (confirmation) {
  //         localStorage.removeItem("loggedInUserId");
  //         window.location.href = "login.html";
  //       }
  //     };
  //   } else {
  //     alert("You have been logged out.");
  //   }
  //   }

  window.onload = () => {
    const logoutAvatar = document.getElementById("logoutAvatar");
    const logoutModal = document.getElementById("logoutModal");
    const cancelBtn = document.getElementById("cancelBtn");
    const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
    const userGreeting = document.getElementById("userGreeting");
  
    const currentUser = JSON.parse(localStorage.getItem("users") || "[]")
      .find(user => user.id == localStorage.getItem("loggedInUserId"));
  
    if (currentUser) userGreeting.textContent = `Are you sure you want to logout, ${currentUser.fullName}?`;
  
    logoutAvatar?.addEventListener("click", () => logoutModal.style.display = "block");
    cancelBtn?.addEventListener("click", () => logoutModal.style.display = "none");
    confirmLogoutBtn?.addEventListener("click", () => {
      localStorage.removeItem("loggedInUserId");
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  
    window.addEventListener("click", e => {
      if (e.target === logoutModal) logoutModal.style.display = "none";
    });
  };
  
  
  
    
  







