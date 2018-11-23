// var address = document.getElementById('address');
// var previewAddressTo = document.getElementById('previewAddressTo');
var editButton = document.getElementsByClassName('editButton');
// var cancelButton = document.getElementById('cancelButton');
// var submitButton = document.getElementById('submitButton');

// When the user clicks outside of the password field, hide the message box
document.getElementById('editButton').addEventListener('click', function() {
    //     address.style.display = "block";
    //     previewAddressTo.style.display = "none";
    //     submitButton.style.display = "block";
    //     cancelButton.style.display = "none";
         document.getElementById('editButton').style.display = "none"
              break
    });
    
    
    // submitButton.addEventListener('click', function() {
    //     address.style.display = "none";
    //     submitButton.style.display = "none";
    //     previewAddressTo.style.display = "block";
    //     cancelButton.style.display = "block";
    // });
    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
     editButton[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}