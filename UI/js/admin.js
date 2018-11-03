// var editButton = document.getElementById('editButton');
var address = document.getElementsByClassName('address');
var presentLocation = document.getElementsByClassName('presentLocation');
var newLocation = document.getElementsByClassName('newLocation');
var editButton2 = document.getElementsByClassName('editButton2');


(function () {
    "use strict";
    var buttons = document.getElementsByClassName('editButton');
    for ( var i in Object.keys( buttons ) ) {
        buttons[i].onclick = function() {
            var k;
                    for (k =0; k < presentLocation.length; k++) {
                        presentLocation[k].style.display = "none";
                        newLocation[k].style.display = "block";
                    };
            console.log(this.id);
        };
    }
})();