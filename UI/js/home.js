var createAshipment = document.getElementById('createAshipment');
var preview = document.getElementById('preview');
var previewButton = document.getElementById('previewButton');
var editButton = document.getElementById('editButton');
var username = document.getElementById('username');
var country = document.getElementById('country');
var address = document.getElementById('address');
var email = document.getElementById('email');
var phoneNumber = document.getElementById('phoneNumber');
var nameTo = document.getElementById('nameTo');
var countryTo = document.getElementById('countryTo');
var addressTo = document.getElementById('addressTo');
var emailTo = document.getElementById('emailTo');
var phoneNumberTo = document.getElementById('phoneNumberTo');
var previewName = document.getElementById('previewName');
var previewCountry = document.getElementById('previewCountry');
var previewAddress = document.getElementById('previewAddress');
var previewEmail = document.getElementById('previewEmail');
var previewPhonenumber = document.getElementById('previewPhonenumber');
var previewNameTo = document.getElementById('previewNameTo');
var previewCountryTo = document.getElementById('previewCountryTo');
var previewAddressTo = document.getElementById('previewAddressTo');
var previewEmailTo = document.getElementById('previewEmailTo');
var previewPhonenumberTo = document.getElementById('previewPhonenumberTo');
var parcelPreference = document.getElementById('parcelPreference');
var parcelPreferencePreview = document.getElementById('parcelPreferencePreview');
var weight = document.getElementById('weight');
var length = document.getElementById('length');
var width = document.getElementById('width');
var height = document.getElementById('height');
var weightPreview = document.getElementById('weightPreview');
var lengthPreview = document.getElementById('lengthPreview');
var widthPreview = document.getElementById('widthPreview');
var heightPreview = document.getElementById('heightPreview');


    // submitButton.addEventListener('click', function() {
//     address.style.display = "none";
//     submitButton.style.display = "none";
//     previewAddressTo.style.display = "block";
//     cancelButton.style.display = "block";
// });
// When the user clicks on the password field, show the message box
previewButton.addEventListener('click', function() {
    createAshipment.style.display = "none";
    preview.style.display = "block";
});

// When the user clicks outside of the password field, hide the message box
editButton.addEventListener('click', function() {
    createAshipment.style.display = "block";
    preview.style.display = "none";
});

previewButton.addEventListener('click', function() {
     previewName.innerHTML = username.value;
     previewCountry.innerHTML = country.value
     previewAddress.innerHTML = address.value
     previewEmail.innerHTML = email.value
     previewPhonenumber.innerHTML = phoneNumber.value
     previewNameTo.innerHTML = nameTo.value
     previewCountryTo.innerHTML = countryTo.value
     previewAddressTo.innerHTML = addressTo.value
     previewEmailTo.innerHTML = emailTo.value
     previewPhonenumberTo.innerHTML = phoneNumberTo.value
     parcelPreferencePreview.innerHTML = parcelPreference.value
     weightPreview.innerHTML = weight.value
     lengthPreview.innerHTML = length.value
     widthPreview.innerHTML = width.value
     heightPreview.innerHTML = height.value
});

