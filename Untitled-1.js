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


document.addEventListener("DOMContentLoaded", () => {
    const leaderboardTable = document.getElementById("leaderboardTable");
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Sort users by score in descending order
    const sortedUsers = users.sort((a, b) => b.score - a.score);
  
    // Get the top 6 users
    const topUsers = sortedUsers.slice(0, 6);
  
    // Display top 6 users in the table
    topUsers.forEach((user, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.fullName}</td>
        <td>${user.score}</td>
      `;
  
      leaderboardTable.appendChild(row);
    });
  
    if (topUsers.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="3">No users available</td>`;
      leaderboardTable.appendChild(row);
    }
  });
  