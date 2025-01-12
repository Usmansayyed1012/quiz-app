
//------------------------hamburger menu code-------------------


const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');

    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

//------------------------hamburger menu code-------------------



    //------------------------------------------sidebar active class code ----------------------

    var header = document.getElementById("sidebar");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

 //------------------------------------------sidebar active class code ----------------------