
//signup code

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
  event.target.reset();
}


//login code




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
    "question": "What is the effect of the <b> tag?",
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
    "question": "What does the <i> tag do?",
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
    "question": "What is the effect of the <u> tag?",
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
    "question": "What is the effect of the <strong> tag?",
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

//       if (randomQue.choosedAnswer === index) {
//         listItem.classList.add("selected");
//         listItem.style.backgroundColor = "#f3bd00";
//         listItem.style.width = "fit-content";
//         listItem.style.borderRadius = "10px";
//       }

//       listItem.addEventListener("click", () => {
//         const chosenAnswer = index;
//         const questionData = {
//           question: randomQue.question,
//           chosenAnswer: chosenAnswer,
//           correctAnswer: randomQue.correct,
//         };
//         if (chosenAnswer === randomQue.correct) {

//           score += 10;
//         } else {
//           console.log("Your answer is wrong");
//         }
//       });

//       list.appendChild(listItem);




//     });


//     console.log({ score })
//     const optionList = document.getElementById("option-list");
//     optionList.addEventListener("click", function (event) {
//       if (event.target.tagName === "LI") {
//         let selectedElement = document.getElementsByClassName('selected');
//         if (selectedElement.length) {
//           selectedElement[0].style = "";
//           selectedElement[0].classList.remove('selected');
//         }

       
  

//         event.target.classList.add("selected");
//         event.target.style.backgroundColor = "#f3bd00";
//         event.target.style.width = "fit-content";
//         event.target.style.borderRadius = "10px";

       

//         console.log("Selected Option:", event.target.textContent.trim());
//       }
//     });

//     updateProgress();
//   }
// }

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
        listItem.style.width = "fit-content";
        listItem.style.borderRadius = "10px";
      }

      listItem.addEventListener("click", () => {
        // Save selected answer
        randomQue.choosedAnswer = index;
        if (index === randomQue.correct) {
          score += 10;
        }

        // Clear previous selection
        const selectedElement = document.querySelector(".selected");
        if (selectedElement) {
          selectedElement.classList.remove("selected");
          selectedElement.style = "";
        }

        // Highlight the current selection
        listItem.classList.add("selected");
        listItem.style.backgroundColor = "#f3bd00";
        listItem.style.width = "fit-content";
        listItem.style.borderRadius = "10px";

        console.log("Selected Option:", listItem.textContent.trim());
      });

      list.appendChild(listItem);
    });


    const previousBtn = document.getElementById("previousBtn");
    if (currentIndex === 0) {
      previousBtn.style.display = "none"; 
    } else {
      previousBtn.style.display = "inline-block"; 
      previousBtn.style.justifyContent = "dl";
    }

    updateProgress();
  }
}




function nextQuestion() {
  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    displayQuestion();
    // checkAnswer();

  } else {
    alert("You've reached the last question!");
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

  return score;
}

if(score>=100){

  window.location.href = "leaderboard.html";
}else


function saveScore(score) {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.id == loggedInUserId);

  if (user) {
    user.score = score; // Update the user's score
    localStorage.setItem("users", JSON.stringify(users)); // Save updated users
    alert("Score saved!");
    window.location.href = "leaderboard.html"; // Redirect to leaderboard
  } else {
    alert("Error: User not found!");
  }
}



displayQuestion();






