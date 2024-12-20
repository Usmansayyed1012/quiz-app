
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
];

const selectedQuestions = quizData.sort(() => Math.random() - 0.5).slice(0, 10);


localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestions));

let data = JSON.parse(localStorage.getItem("selectedQuestion")) || [];


let currentIndex = 0;
const totalQuestions = data.length;



// function displayQuestion() {
//   if (data && data.length > 0) {
//     currentIndex = currentIndex % totalQuestions;
//     document.getElementById("ques-number").innerHTML = currentIndex + 1;

//     const randomQue = data[currentIndex];
//     document.getElementById("question-data").innerHTML = `${currentIndex + 1}. ${randomQue.question}`;

//     const list = document.getElementById("option-list");
//     list.innerHTML = "";
//     randomQue.answers.forEach((option, index) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = option;

//       // Highlight previously selected option
//       if (randomQue.choosedAnswer === index) {
//         listItem.classList.add("selected");
//         listItem.style.backgroundColor = "#f3bd00";
//         listItem.style.borderRadius = "10px";
        

       
//       }

//       listItem.addEventListener("click", () => {
//         // Save selected answer
//         randomQue.choosedAnswer = index;

//         if (index === randomQue.correct) {
//           score += 10;
//         }

//         // Clear previous selection
//         const options = list.querySelectorAll("li");
//         options.forEach(option => {
//           option.classList.remove("selected");
//           option.style = "";
//         });

//         // Highlight the current selection
//         listItem.classList.add("selected");
//         listItem.style.backgroundColor = "#f3bd00";
//         listItem.style.borderRadius = "10px";
//         listItem.style.width="fit-content";

//         document.getElementById("nextBtn").disabled = false;
       

//         console.log("Selected Option:", listItem.textContent.trim());
//       });

//       list.appendChild(listItem);
//     });

//     // Handle Previous Button Visibility
//     const previousBtn = document.getElementById("previousBtn");

//       if (currentIndex === 0) {
//         previousBtn.style.display = "none"; // Agar pehla question hai toh button hide hojayega
//       } else {
//         previousBtn.style.display = "inline-block"; // Baki cases me button dikhayega
//       }


//     updateProgress();
//   }
// }




function displayQuestion() {
  if (data && data.length > 0) {
    currentIndex = currentIndex % totalQuestions;
    document.getElementById("ques-number").innerHTML = currentIndex + 1;

    const randomQue = data[currentIndex];

    // Ensure choosedAnswer is initialized
    if (randomQue.choosedAnswer === undefined) {
      randomQue.choosedAnswer = null;
    }

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
        listItem.style.width = "fit-content";

        document.getElementById("nextBtn").disabled = false;
        console.log("Selected Option:", listItem.textContent.trim());
      });

      list.appendChild(listItem);
    });

    // Handle Previous Button Visibility
    const previousBtn = document.getElementById("previousBtn");
    if (previousBtn) {
      if (currentIndex === 0) {
        previousBtn.style.display = "none"; // If it's the first question, hide the button
      } else {
        previousBtn.style.display = "inline-block"; // Show the button for other cases
      }
    }

    updateProgress();
  } else {
    console.error("No questions found in data");
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
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    console.log("No user data available");
    return;
  }

  const sortedUsers = users.sort((a, b) => b.score - a.score);

  for (let i = 0; i < 6; i++) {
    const user = sortedUsers[i];
    if (user) {
      const scoreElement = document.getElementById(`score${i + 1}`);
      if (scoreElement) {
        scoreElement.textContent = `${user.fullName} - ${user.score}`;
      } else {
        console.log(`Element score${i + 1} not found`);
      }
    }
  }
}

window.onload = function() {
  displayLeaderboard();
};




function displayUserRank() {
  // Users aur logged-in user ka data localStorage se lena hai
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  // Logged-in user ka data search karna hai
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == loggedInUserId) {
      user = users[i];
      break;
    }
  }

  // Agar user mil gaya
  if (user) {
    // Users ko score ke hisaab se sort karna hai
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (users[i].score < users[j].score) {
          let temp = users[i];
          users[i] = users[j];
          users[j] = temp;
        }
      }
    }

    // User ki rank dhoondna hai
    let rank = 1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == user.id) {
        rank = i + 1;
        break;
      }
    }

    // User ke liye message dikhana hai
    const userMessage = document.getElementById("userMessage");
    userMessage.textContent = "Wow! You ranked #" + rank + " with a score of " + user.score + "!";
  } else {
    // Agar user ka data nahi mila toh login page pe bhejna hai
    alert("Error: User data not found.");
    window.location.href = "login.html";
  }
}

function displayUserRank() {
 
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUserId = localStorage.getItem("loggedInUserId");


  const user = users.find(u => u.id == loggedInUserId);

  if (user) {
    
    users.sort((a, b) => b.score - a.score);

   
    const rank = users.findIndex(u => u.id === loggedInUserId) + 1;

 
    document.getElementById("userRank").textContent = `#${rank}`;
  } else {
    alert("User not found! Please log in again.");
    window.location.href = "login.html";  
  }
}

// Call the function to display the rank when the page loads
window.onload = displayUserRank;




// page load hone par ye function ko call karega
window.onload = function () {
  displayLeaderboard();
}
  // Logout ka function
  window.onload = function () {
    var logoutBtn = document.getElementById("logoutBtn");
    
    if (logoutBtn) {
      logoutBtn.onclick = function () {
        localStorage.removeItem("loggedInUserId");
        alert("You have been logged out.");
        window.location.href = "login.html";
      };
    }
  };
  







displayQuestion(); //first question print krne ke liye
