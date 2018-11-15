// var editButton = document.getElementById('editButton');
var address = document.getElementsByClassName('address');
var presentLocation = document.getElementsByClassName('presentLocation');
var newLocation = document.getElementsByClassName('newLocation');
var editButton2 = document.getElementsByClassName('editButton2');
var json = document.getElementsByClassName('shipmentOrderPreview');



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
var buttons = document.getElementsByClassName('editButton');
  
function myFunction() { 
    console.log(json);     
    var json = [{
        "id" : "1", 
        "msg"   : "hi",
        "date" : "2013-05-05 23:35",
        "fromWho": "hello1@email.se",
        "orderStatus":"pending",
        "orderLocation":"University of Ibadan,Oyo"
    },
    {
        "id" : "2", 
        "msg"   : "there",
        "date" : "2013-05-05 23:45",
        "fromWho": "hello2@email.se",
        "orderStatus":"delivered",
        "orderLocation": "Orogun Ibadan"
    },
    {
        "id" : "3", 
        "msg"   : "there",
        "date" : "2013-05-05 23:45",
        "fromWho": "hello2@email.se",
        "orderStatus":"delivered",
        "orderLocation": "UI Ibadan"
    }];
    
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        var status = obj['orderStatus']; //assuming ur jason has the orderSatut feild
    var UniqueInputId = 'txtLocation' + obj['id'];
    //alert(json);//debugin purpose
    if(status=='pending') {
        //create the textbox
        var input = document.createElement("input");
            input.setAttribute('id', UniqueInputId);
               input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Edit location');
            //create the button
            var btn = document.createElement("button");
            btn.setAttribute('id', 'btn-edit');
               btn.appendChild(document.createTextNode("EDIT"));
            document.body.appendChild(input);
            document.body.appendChild(btn);
            return true;
        }// end if
        else{
            //show the current location and status
            var p = document.createElement("p");
         p.appendChild(document.createTextNode(obj['orderLocation']));
            }
        }   
    
    }

  
