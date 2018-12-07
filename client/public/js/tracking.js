var address = document.getElementById('address');
var previewAddressTo = document.getElementById('previewAddressTo');
var editButton = document.getElementsByClassName('editButton');
var editButtonbtn = document.getElementsByClassName('editButtonbtn');
var destination = document.getElementById('destination');
var newDestination = document.getElementById('newDestination');
var cancelButton = document.getElementById('cancelButton');
var cancelled = document.getElementById('cancelled');
var cancelButton2 = document.getElementById('cancelButton2');
var cancelled2= document.getElementById('cancelled2');
var cancelButton3 = document.getElementById('cancelButton3');
var cancelled3 = document.getElementById('cancelled3');
var cancelButton4 = document.getElementById('cancelButton4');
var cancelled4 = document.getElementById('cancelled4');
var submitButton = document.getElementById('submitButton');

// // When the user clicks outside of the password field, hide the message box
// document.getElementById('editButton').addEventListener('click', function() {
//     //     address.style.display = "block";
//     //     previewAddressTo.style.display = "none";
//     //     submitButton.style.display = "block";
//     //     cancelButton.style.display = "none";
//          document.getElementById('editButton').style.display = "none"
//               break
//     });
    
    
    // submitButton.addEventListener('click', function() {
    //     address.style.display = "none";
    //     submitButton.style.display = "none";
    //     previewAddressTo.style.display = "block";
    //     cancelButton.style.display = "block";
    // });
//     var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//      editButton[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }

document.getElementById('cancelButton').addEventListener('click', function() {
    cancelButton.style.display = 'none'
    cancelled.style.display = 'block'
       });
document.getElementById('cancelButton2').addEventListener('click', function() {
    cancelButton2.style.display = 'none'
    cancelled2.style.display = 'block'
           });
document.getElementById('cancelButton3').addEventListener('click', function() {
    cancelButton3.style.display = 'none'
    cancelled3.style.display = 'block'
               });
document.getElementById('cancelButton4').addEventListener('click', function() {
    cancelButton4.style.display = 'none'
    cancelled4.style.display = 'block'
    });

// document.getElementById('editButton').addEventListener('click', function() {
//     destination.style.display = 'none'
//     newDestination.style.display = 'block'
//     });

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
var divs=['new','pending','delivered'];
for (var i=0;i<divs.length;i++)
  {
  if (onediv != document.getElementById(divs[i]))
    {
    document.getElementById(divs[i]).style.display='none';
    }
  }
onediv.style.display = 'block';
}