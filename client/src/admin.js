import Controller from './controller';
import auth from './auth';

const logout = document.getElementById('logout');
const newOrder = document.getElementById('new');
const pending = document.getElementById('pending');
const delivered = document.getElementById('delivered');
const newPresentLocation = document.getElementById('newPresentLocation');
const submitButton = document.getElementById('submitButton');
const pendingButton = document.getElementById('pendingButton');
const deliveredButton = document.getElementById('deliveredButton');

const baseUrl = 'https://sendit-courier.herokuapp.com/api/v1';

const controller = new Controller(baseUrl);

// Get all Parcel Order History
async function getOrder() {
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
                                            <li><b>Address :</b><p id="toAddress" class="previewAddressTo">${post.toAddress}</p></li>
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
                                          <div id="presentLocation">
                                            <b>Present Location :</b> <p id="location1" >${post.toAddress}</p>
                                            <button id="editButton" class="editButton" type="submit">Edit</button>
                                          </div>
                                          <div class="newLocation" id="newLocation">
                                            <b>Present Location :</b> <input type="text" id="newPresentLocation" class="address" name="address">
                                            <button id="editButton2" class="editButton2" type="submit">submit</button>
                                          </div>
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
  getOrder();
};

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      presentLocation: newPresentLocation.value,
      orderStatus: 'Pending',
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/parcels/:parcelId/presentLocation/', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});

pendingButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      orderStatus: 'Delivered',
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/parcels/:parcelId/status/', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});

deliveredButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      orderStatus: 'Pending',
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/parcels/:parcelId/status/', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});
