const confirmPassword = document.getElementById('confirmPassword');
// const message = document.getElementById('message');
// const letter = document.getElementById('letter');
// const capital = document.getElementById('capital');
// const number = document.getElementById('number');
// const length = document.getElementById('length');
const loginPassword = document.getElementById('loginPassword');
const loginShowPassword = document.getElementById('loginShowPassword');
const password = document.getElementById('password');
const showPassword = document.getElementById('showPassword');
const login = document.getElementById('login');
const register = document.getElementById('register');
const toRegister = document.getElementById('to_register');
const toLogin = document.getElementById('to_login');


// eventListener toggles the Login/signup page visibility
toRegister.addEventListener('click', () => {
  login.style.display = 'none';
  register.style.display = 'block';
});

toLogin.addEventListener('click', () => {
  login.style.display = 'block';
  register.style.display = 'none';
});
// event listener to toggle password visibility for login page
loginShowPassword.addEventListener('click', () => {
  if (loginPassword.type === 'password') {
    loginPassword.type = 'text';
  } else {
    loginPassword.type = 'password';
  }
});

// event listener to toggle password visibility for signup page
showPassword.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
    // confirmPassword.type = 'text';
  } else {
    password.type = 'password';
    // confirmPassword.type = 'password';
  }
});


// When the user clicks on the password field, show the message box
// password.addEventListener('keyup', () => {
//   message.style.display = 'block';
// });

// When the user clicks outside of the password field, hide the message box
// password.addEventListener('blur', () => {
//   message.style.display = 'none';
// });

// When the user starts to type text into the password field
// password.onkeyup = function () {
//   let count = 0;
//   // Validate lowercase letters
//   const lowerCase = /[a-z]/g;
//   validate(letter, lowerCase, count++);

//   // Validate capital letters
//   const upperCase = /[A-Z]/g;
//   validate(capital, upperCase, count++);

//   // Validate numbers
//   const numbers = /[0-9]/g;
//   validate(number, numbers, count++);

//   // Validate length
//   if (password.value.length >= 8) {
//     length.classList.remove('invalid');
//     length.classList.add('valid');
//     count++;
//   } else {
//     length.classList.remove('valid');
//     length.classList.add('invalid');
//   }
//   if (count == 4) {
//     message.style.display = 'none';
//   }
// };


/**
 * function allows to Validate password with a green tick
 * @param {*} attribute - the P element to be modified
 * @param {*} check - the Regex pattern to be checked for
 * @param {*} count - count stores the number of rules obeyed
 */
// function validate(attribute, check, count) {
//   if (password.value.match(check)) {
//     attribute.classList.remove('invalid');
//     attribute.classList.add('valid');
//   } else {
//     attribute.classList.remove('valid');
//     attribute.classList.add('invalid');
//   }
// }


/* checks if the text entered in the 'password section'
and 'confirm password' section are the same
*/
// confirmPassword.onkeyup = function () {
//     if (confirmPassword.value == password.value) {
//         comparePassword.style.color = 'green';
//         comparePassword.innerHTML = 'Password matching';
//     } else {
//         comparePassword.style.color = 'red';
//         comparePassword.innerHTML = 'Password not matching';
//     }
// }

window.onresize = (evt) => {
  console.log(window.innerWidth);
  if (innerWidth > 768) {
    document.getElementById('heroWhite').style.display = 'block';
  } else {
    document.getElementById('heroWhite').style.display = 'none';
  }
};
