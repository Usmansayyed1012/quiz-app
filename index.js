
//signup code

// function handleFormSubmit(event) {
//   event.preventDefault();

//   const fullName = document.getElementById("name")?.value.trim();
//   const email = document.getElementById("email")?.value.trim();
//   const password = document.getElementById("password")?.value.trim();

//   if (!fullName || !email || !password) {
//     alert("Please fill out all fields.");
//     return;
//   }

//   const userData = {
//     id: Date.now(), // Unique user ID based on timestamp
//     fullName,
//     email,
//     password,
//     score: 0
//   };

//   let users = JSON.parse(localStorage.getItem("users")) || [];
//   users.push(userData);
//   localStorage.setItem("users", JSON.stringify(users));

//   alert("Signup successful!");
//   window.location.href = "login.html";

//   // Reset form
//   document.getElementById("signupForm").reset();

// }


// //login code




//   function validateLogin(event) {
//     event.preventDefault();
  
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();
  
//     const users = JSON.parse(localStorage.getItem("users")) || [];
  
//     const user = users.find(u => u.email === email && u.password === password);
  
//     if (user) {
//       // Save the logged-in user ID
//       localStorage.setItem("loggedInUserId", user.id);
//       alert("Login successful!");
//       window.location.href = "startQuiz.html"; // Redirect to quiz page
//     } else {
//       alert("Invalid email or password!");
//     }
//   }
  
// Signup code
function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!fullName || !email || !password) {
    alert("Please fill out all fields.");
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

function logout() {
  // Remove logged-in user ID from localStorage
  localStorage.removeItem("loggedInUserId");

  // Clear any quiz data to reset the session
  localStorage.removeItem("selectedQuestion");

  // Redirect to login page
  alert("You have been logged out.");
  window.location.href = "login.html";
}

// Add this check when the quiz page or any page that requires login is loaded:
window.onload = function () {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  
  if (!loggedInUserId) {
    // If the user is not logged in, redirect to the login page
    window.location.href = "login.html";
  }
};






displayQuestion();


// document.getElementById("logoutBtn").addEventListener("click", logout);