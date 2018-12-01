var editButton = document.getElementById('editButton');
var addressbtn1 = document.getElementById('addressbtn1');
var location1 = document.getElementById('location1');
var presentLocation = document.getElementById('presentLocation');
var newLocation = document.getElementById('newLocation');
var presentLocation2 = document.getElementById('presentLocation2');
var newLocation2 = document.getElementById('newLocation2');
var editButton2 = document.getElementById('editButton2');
var editButton = document.getElementById('editButton');
var editButton3 = document.getElementById('editButton3');
var editButton4 = document.getElementById('editButton4');


// (function () {
//     "use strict";
//     var buttons = document.getElementsByClassName('editButton');
//     for ( var i in Object.keys( buttons ) ) {
//         buttons[i].onclick = function() {
//             var k;
//                     for (k =0; k < presentLocation.length; k++) {
//                         presentLocation[k].style.display = "none";
//                         newLocation[k].style.display = "block";
//                     };
//             console.log(this.id);
//         };
//     }
// })();

editButton.addEventListener('click', function() {
    presentLocation.style.display = "none";
    newLocation.style.display = "block";
    
});
editButton2.addEventListener('click', function() {
    presentLocation.style.display = "block";
    newLocation.style.display = "none";
    addressbtn1.innerhtml = location1.innerhtml;

    
});
editButton3.addEventListener('click', function() {
    presentLocation2.style.display = "none";
    newLocation2.style.display = "block";
    
});
editButton4.addEventListener('click', function() {
    presentLocation2.style.display = "block";
    newLocation2.style.display = "none";
    
});

// Add active class to the current button (highlight it)
var header = document.getElementById("navTabs");
var btns = header.getElementsByClassName("navLink");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Hide/Show active div 
function showHide(d)
{
var onediv = document.getElementById(d);
var divs=['content1','content2','content3'];
for (var i=0;i<divs.length;i++)
  {
  if (onediv != document.getElementById(divs[i]))
    {
    document.getElementById(divs[i]).style.display='none';
    }
  }
onediv.style.display = 'block';
}