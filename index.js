
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
    fullName,
    email,
    password
  };

  let userArray = JSON.parse(localStorage.getItem("userArray")) || [];

  userArray.push(userData);

  try {
    localStorage.setItem("userArray", JSON.stringify(userArray));
    alert("Signup data saved locally!");
    window.location.href('login.html')
  } catch (e) {
    alert("Error saving data to local storage.");
    console.error(e);
  }

  // Reset form
  event.target.reset();
}


//login code



function validateLogin(event) {
  event.preventDefault();

  const inputValue = document.getElementById('email').value;
  const passValue = document.getElementById('password').value;
  console.log(localStorage.getItem('userArray'))

  const users = JSON.parse(localStorage.getItem('userArray'));

  const userFound = users.find(
    (user) => inputValue === user.email && passValue === user.password
  );

  if (!userFound) {
    alert("No registered data found.");

    return;
  }

  if (userFound) {

    window.location.href = "startQuiz.html"
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

console.log(selectedQuestions);

localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestions));

let data = JSON.parse(localStorage.getItem("selectedQuestion")) || [];


let currentIndex = 0;
const totalQuestions = data.length;

function displayQuestion() {
  if (data && data.length > 0) {
    currentIndex = currentIndex % totalQuestions;
    document.getElementById("ques-number").innerHTML = currentIndex + 1;

    console.log("Current Index:", currentIndex);

    const randomQue = data[currentIndex];

    document.getElementById("question-data").innerHTML = `${currentIndex + 1}. ${randomQue.question}`;

    const list = document.getElementById("option-list");
    list.innerHTML = "";
    randomQue.answers.forEach(option => {
      const listItem = document.createElement("li");
      listItem.textContent = option;
      list.appendChild(listItem);
    });

    const optionList = document.getElementById("option-list");
    optionList.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        let selectedElement = document.getElementsByClassName('selected');
        if (selectedElement.length) {
          selectedElement[0].style = "";
          selectedElement[0].classList.remove('selected');
        }

        event.target.classList.add("selected");
        event.target.style.backgroundColor = "#f3bd00";
        event.target.style.width = "fit-content";
        event.target.style.borderRadius = "10px"; 
        

        console.log("Selected Option:", event.target.textContent.trim());
      }
    });

    updateProgress();
  }
}

function nextQuestion() {
  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    displayQuestion();
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
  const progressPercentage = ((currentIndex+1) / totalQuestions) * 100;
  console.log(progressPercentage);
  let progressBar = document.getElementById("progressBar");
  progressBar.style.width = progressPercentage + "%";
}

// Call displayQuestion initially to show the first question
displayQuestion();






