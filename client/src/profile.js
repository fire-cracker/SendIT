import Controller from './controller';
import auth from './auth';

const logout = document.getElementById('logout');
const newOrder = document.getElementById('new');
const pending = document.getElementById('pending');
const delivered = document.getElementById('delivered');

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
        const model = `<div id="shipmentOrderPreview" class='new'>
        <div id="createShipmentPreview" class="createShipmentPreview">
            <form class="fromPreview" id="fromPreview">
                <div class="img_login">
                    <h2> From </h2>
                </div>
                <div id="fromParticulars">
                    <b>Name :</b>
                    <p id="fromName" class="previewName">${post.fromName}</p><br>
                    <b>Address :</b>
                    <p id="fromAddress" class="previewAddress">${post.fromAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="fromEmail" class="previewEmail">${post.fromEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <form class="toPreview" id="toPreview">
                <div class="img_login">
                    <h2> To </h2>
                </div>

                <div id="toParticulars">
                    <b>Name :</b>
                    <p id="toName" class="previewName">${post.toName}</p><br>
                    <b>Address :</b>
                    <p id="toAddress" class="previewAddressTo">${post.toAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="toEmail" class="previewEmail">${post.toEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <!-- Parcel Details Section -->
            <div id="parcel">
                <h2> Parcel Details </h2>
                <div id="parcelParticulars">
                    <b>Type:</b>
                    <p id="parcelPreferencePreview">${post.type}</p><br>
                    <b>weight(kg):</b>
                    <p id="weightPreview">${post.weight}</p>
                    <p> kg </p>
                    <br>
                    <b>Price :</b>
                    <p id="parcelPreferencePreview">&#8358;${post.price}</p><br>
                    <b>Date of Order:</b>
                    <p id="parcelPreferencePreview">${post.createdAt}</p>
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
  getMenu();
};
