const addressbtn1 = document.getElementById('addressbtn1');
const location1 = document.getElementById('location1');
const presentLocation = document.getElementById('presentLocation');
const newLocation = document.getElementById('newLocation');
const presentLocation2 = document.getElementById('presentLocation2');
const newLocation2 = document.getElementById('newLocation2');
const submitButton = document.getElementById('submitButton');
const editButton = document.getElementById('editButton');
const editButton3 = document.getElementById('editButton3');
// const editButton4 = document.getElementById('editButton4');


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

editButton.addEventListener('click', () => {
  presentLocation.style.display = 'none';
  newLocation.style.display = 'block';
});
submitButton.addEventListener('click', () => {
  presentLocation.style.display = 'block';
  newLocation.style.display = 'none';
  addressbtn1.innerhtml = location1.innerhtml;
});
editButton3.addEventListener('click', () => {
  presentLocation2.style.display = 'none';
  newLocation2.style.display = 'block';
});
// editButton4.addEventListener('click', () => {
//   presentLocation2.style.display = 'block';
//   newLocation2.style.display = 'none';
// });

// Add active class to the current button (highlight it)
const header = document.getElementById('navTabs');
const btns = header.getElementsByClassName('navLink');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}

// Hide/Show active div
function showHide(d) {
  const onediv = document.getElementById(d);
  const divs = ['new', 'pending', 'delivered'];
  for (let i = 0; i < divs.length; i++) {
    if (onediv !== document.getElementById(divs[i])) {
      document.getElementById(divs[i]).style.display = 'none';
    }
  }
  onediv.style.display = 'block';
}
