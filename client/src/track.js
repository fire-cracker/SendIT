import Controller from './controller';
import auth from './auth';

const logout = document.getElementById('logout');
const newOrder = document.getElementById('new');
const pending = document.getElementById('pending');
const delivered = document.getElementById('delivered');
const newToAddress = document.getElementById('newToAddress');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');

const baseUrl = 'https://sendit-courier.herokuapp.com/api/v1';

const controller = new Controller(baseUrl);

// Get User Parcel Order History
async function getMenu() {
  try {
    const method = {
      method: 'GET',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
    };
    const data = await controller.get('/users/:userId/parcels', method);
    console.log(data);
    if (data.success === 'true' && data.orders.orderStatus === 'New') {
      data.orders.forEach((post) => {
        const model = `<div id="shipmentOrderPreview" class = 'new'>
                            <div id="createShipmentPreview" class="createShipmentPreview">
                                <form class="fromPreview" id="fromPreview">
                                    <div class="img_login">
                                            <h2> From </h2> 
                                    </div>
                                    <ul id="fromParticulars">
                                        <li><b>Name :</b> <p id="fromName" class="previewName">${post.fromName}</p></li>
                                        <li><b>Address :</b> <p id="fromAddress" class="previewAddress">${post.fromAddress}</p></li>
                                        <li><b>Email Address :</b> <p id="fromEmail" class="previewEmail">${post.fromEmail}</p></li>  
                                    </ul>
                                </form>
                                <section class="particulars"></section>
                                <form class="toPreview" id="toPreview">
                                    <div class="img_login">
                                        <h2> To </h2> 
                                    </div>
                                    <ul id="toParticulars">
                                        <li><b>Name :</b> <p id="toName" class="previewName">${post.toName}</p></li>   
                                        <li class="destination" id="destination">
                                            <b>Address :</b> <p class="toAddress" id="toAddress" >${post.toAddress}</p>
                                            <button id="editButton" class="editButton" type="submit">Edit</button>
                                        </li>
                                        <li class="newDestination" id="newDestination">
                                            <b>Address :</b> <input type="text" class="newToAddress" id="newToAddress" name="address">
                                            <button id="submitButton" class="submitButton" type="submit">submit</button>
                                        </li>
                                        <li><b>Email Address :</b> <p id="toEmail" class="previewEmail">${post.toEmail}</p></li> 
                                    </ul>
                                </form>
                                            <section class="particulars"></section>
                                <div id="parcel">
                                    <h2> Parcel Details </h2> 
                                    <ul id="parcelParticulars">
                                        <li><b>Type:</b> <p id="parcelPreferencePreview">${post.type}</p></li>
                                        <li><b>weight(kg):</b> <p id="weightPreview">${post.weight}</p>
                                            <p> kg </p>
                                            <b>| Price :</b><p id="parcelPreferencePreview">&#8358;${post.price}</p>
                                        </li>
                                        <li><b>Date of Order:</b><p id="parcelPreferencePreview">${post.createdAt}</p></li>
                                    </ul>  
                                </div>
                            </div>
                        
                                <div id="buttons">
                                    <!-- Parcel order status section -->
                                    <div>
                                        <button id="cancelButton" class="cancelButton" type="submit">Cancel</button>
                                        <button id="cancelled" class="cancelled" type="submit">Cancelled</button>
                                    </div>
                                </div>
                             
                           
                        </div>`;

        console.log(model);
        newOrder.innerHTML += model;
        pending.innerHTML += model;
        delivered.innerHTML += model;
      });
    }
  } catch (err) {
    console.log('run but error');
    //     if (err) {
    //         alert("Network Error, Please check your network connection and try again");
    //     }
  }
}
// initiate login when the token is invalid or has expired
window.onload = async () => {
  const validity = await auth();
  if (validity === 'Failed') {
    return logout.click();
  }
  getMenu();
};

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      toAddress: newToAddress.value,
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/parcels/:parcelId/destination/', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});

cancelButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      orderStatus: 'Cancelled',
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/parcels/:parcelId/cancel/', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});
