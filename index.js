
function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!fullName || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!passwordPattern.test(password)) {
    alert("Password must be at least 8 characters long and include at least one special character.");
    return;
  }

  const userData = {
    id: Date.now(), // Unique user ID based on timestamp
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

  // Reset form
  document.getElementById("signupForm").reset();
}

// Login code
function validateLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Save the logged-in user ID
    localStorage.setItem("loggedInUserId", user.id);
    alert("Login successful!");
    window.location.href = "startQuiz.html"; // Redirect to quiz page
  } else {
    alert("Invalid email or password!");
  }
}




let quizData = [
  {
    "question": "What is the effect of the b tag?",
    "answers": [
      "<i>",
      "<italic>",
      "<it>",
      "<pre>"
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "What does the i tag do?",
    "answers": [
      "It makes text bold.",
      "It italicizes text.",
      "It underlines text.",
      "It changes the font color."
    ],
    "correct": 1,
    "choosedAnswer": null
  },
  {
    "question": "Which tag is used to create a hyperlink?",
    "answers": [
      "<a>",
      "<href>",
      "<link>",
      "<url>"
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "What is the effect of the u tag?",
    "answers": [
      "It underlines text.",
      "It makes text bold.",
      "It italicizes text.",
      "It changes text color."
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "Which tag is used to insert an image?",
    "answers": [
      "<image>",
      "<img>",
      "<pic>",
      "<src>"
    ],
    "correct": 1,
    "choosedAnswer": null
  },
  {
    "question": "What does the p tag do?",
    "answers": [
      "It defines a paragraph.",
      "It defines a header.",
      "It defines an ordered list.",
      "It defines a table."
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "Which tag is used to create a table?",
    "answers": [
      "<table>",
      "<tab>",
      "<list>",
      "<tr>"
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "What is the effect of the strong tag?",
    "answers": [
      "It makes text bold.",
      "It italicizes text.",
      "It defines a header.",
      "It defines a list."
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "Which tag is used to create a line break?",
    "answers": [
      "<br>",
      "<hr>",
      "<lb>",
      "<break>"
    ],
    "correct": 0,
    "choosedAnswer": null
  },
  {
    "question": "Which tag is used to create a list item?",
    "answers": [
      "<item>",
      "<li>",
      "<ul>",
      "<list>"
    ],
    "correct": 1,
    "choosedAnswer": null
  }
]
  ;

const selectedQuestions = quizData.sort(() => Math.random() - 0.5).slice(0, 10);


localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestions));

let data = JSON.parse(localStorage.getItem("selectedQuestion")) || [];


let currentIndex = 0;
const totalQuestions = data.length;



function displayQuestion() {
  if (data && data.length > 0) {
    currentIndex = currentIndex % totalQuestions;
    document.getElementById("ques-number").innerHTML = currentIndex + 1;

    const randomQue = data[currentIndex];
    document.getElementById("question-data").innerHTML = `${currentIndex + 1}. ${randomQue.question}`;

    const list = document.getElementById("option-list");
    list.innerHTML = "";
    randomQue.answers.forEach((option, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;

      // Highlight previously selected option
      if (randomQue.choosedAnswer === index) {
        listItem.classList.add("selected");
        listItem.style.backgroundColor = "#f3bd00";
        listItem.style.borderRadius = "10px";
        listItem.classList.add("fit-content");

       
      }

      listItem.addEventListener("click", () => {
        // Save selected answer
        randomQue.choosedAnswer = index;

        if (index === randomQue.correct) {
          score += 10;
        }

        // Clear previous selection
        const options = list.querySelectorAll("li");
        options.forEach(option => {
          option.classList.remove("selected");
          option.style = "";
        });

        // Highlight the current selection
        listItem.classList.add("selected");
        listItem.style.backgroundColor = "#f3bd00";
        listItem.style.borderRadius = "10px";

        document.getElementById("nextBtn").disabled = false;
       

        console.log("Selected Option:", listItem.textContent.trim());
      });

      list.appendChild(listItem);
    });

    // Handle Previous Button Visibility
    const previousBtn = document.getElementById("previousBtn");
    previousBtn.style.display = currentIndex === 0 ? "none" : "inline-block";

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


let score = 0;

function checkAnswer(chosenAnswer, randomQue) {
  if (chosenAnswer === randomQue.correct) {
    score++;
  }

  if (score >= 100) {
    window.location.href = "leaderboard.html";
  }

  return score;
}



function saveScore(score) {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.id == loggedInUserId);

  if (user) {
    user.score = score; // Update the user's score
    localStorage.setItem("users", JSON.stringify(users)); // Save updated users
    alert("Your score is saved!");
    window.location.href = "leaderboard.html"; // Redirect to leaderboard
  } else {
    alert("Error: User not found!");
  }
}

function displayLeaderboard() {
  // Fetch users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Sort users by score (highest first)
  const sortedUsers = users.sort((a, b) => b.score - a.score);

  // Update podium (1st, 2nd, 3rd positions)
  if (sortedUsers[0]) document.getElementById("score1").textContent = `${sortedUsers[0].fullName} - ${sortedUsers[0].score}`;
  if (sortedUsers[1]) document.getElementById("score2").textContent = `${sortedUsers[1].fullName} - ${sortedUsers[1].score}`;
  if (sortedUsers[2]) document.getElementById("score3").textContent = `${sortedUsers[2].fullName} - ${sortedUsers[2].score}`;

  // Update rankings (#4, #5, #6)
  if (sortedUsers[3]) document.getElementById("score4").textContent = `${sortedUsers[3].fullName} - ${sortedUsers[3].score}`;
  if (sortedUsers[4]) document.getElementById("score5").textContent = `${sortedUsers[4].fullName} - ${sortedUsers[4].score}`;
  if (sortedUsers[5]) document.getElementById("score6").textContent = `${sortedUsers[5].fullName} - ${sortedUsers[5].score}`;
}

function displayUserRank() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  // Find the logged-in user's data
  const user = users.find(u => u.id == loggedInUserId);

  if (user) {
    // Sort users by score (highest first) and find the rank
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    const rank = sortedUsers.findIndex(u => u.id === user.id) + 1;

    // user ka score update krne ke liye
    const userMessage = document.getElementById("userMessage");
    userMessage.textContent = `Wow! You ranked #${rank} with a score of ${user.score}!`;
  } else {
    alert("Error: User data not found.");
    window.location.href = "login.html"; // wapis login pr bhejega agar user ka data nhi milega toh
  }
}

// page load hone par ye function ko call karega
window.onload = function () {
  displayLeaderboard();

  // Logout ka function
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("loggedInUserId");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });
};







displayQuestion(); //first question print krne ke liye
