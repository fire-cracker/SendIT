// Model of the database content
export const databaseOrders = [
  {
    parcelId: 1,
    fromName: 'Oyedeji Peace',
    fromAddress: 'Andela EPIC Tower, Lagos',
    fromEmail: 'oyedejipeace@gmail.com',
    toName: 'Akin Omobayo',
    toAddress: 'University of Ibadan',
    toEmail: 'akinomo@gmail.com',
    type: 'Documents',
    weight: 3,
    price: 2000,
    userId: 1,
    createdAt: '2018-11-19T15:48:55.633Z',
    modifiedDate: null,
    orderStatus: 'New',
    presentLocation: 'Orogun Ibadan',
  },
  {
    parcelId: 2,
    fromName: 'Angelina Jolie',
    fromAddress: 'Andela EPIC Tower, Lagos',
    fromEmail: 'angelina@gmail.com',
    toName: 'Jamal Smollet',
    toAddress: 'University of Abuja',
    toEmail: 'jsmollet@gmail.com',
    type: 'Packages',
    weight: 3,
    price: 5000,
    userId: 2,
    createdAt: '2018-11-19T15:48:55.633Z',
    modifiedDate: null,
    orderStatus: 'Delivered',
    presentLocation: 'University of Ibadan',
  },
];

// Model of a particular user orders
export const orders = [
  {
    parcelId: 1,
    fromName: 'Oyedeji Peace',
    fromAddress: 'Andela EPIC Tower, Lagos',
    fromEmail: 'oyedejipeace@gmail.com',
    toName: 'Akin Omobayo',
    toAddress: 'University of Ibadan',
    toEmail: 'akinomo@gmail.com',
    type: 'Documents',
    weight: 3,
    price: 2000,
    userId: 1,
    createdAt: '2018-11-19T15:48:55.633Z',
    modifiedDate: null,
    orderStatus: 'New',
    presentLocation: 'Orogun Ibadan',

  },
];

// Model data for a updated Order
export const updateOrder = [
  {
    parcelId: 1,
    fromName: 'Oyedeji Peace',
    fromAddress: 'University of Ibadan',
    fromEmailaddress: 'oyedejipeace@gmail.com',
    fromPhonenumber: '08162514166',
    toName: 'Anabelle Oliver',
    toAddress: 'University of Ilorin',
    toEmailaddress: 'anabelleoliver@gmail.com',
    toPhonenumber: '08162789045',
    type: 'Packages',
    weight: '5',
    price: '2000',
    createdAt: '2018-10-18T07:13:56.584Z',
    modifiedDate: '2018-10-18T07:13:56.584Z',
    orderStatus: 'Pending',
    presentLocation: 'University of Ilorin',
  },
];

export const update = {
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'University of Ibadan',
  fromEmailaddress: 'oyedejipeace@gmail.com',
  fromPhonenumber: '08162514166',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmailaddress: 'anabelleoliver@gmail.com',
  toPhonenumber: '08162789045',
  type: 'Packages',
  weight: '5',
  price: '2000',
  createdAt: '2018-10-18T07:13:56.584Z',
  modifiedDate: '2018-10-18T07:13:56.584Z',
  orderStatus: 'Pending',
  presentLocation: 'University of Ilorin',
};


// Model of the database[1]
export const firstOrder = {
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'Andela EPIC Tower, Lagos',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Akin Omobayo',
  toAddress: 'University of Ibadan',
  toEmail: 'akinomo@gmail.com',
  type: 'Documents',
  weight: 3,
  price: 2000,
  userId: 1,
  createdAt: '2018-11-19T15:48:55.633Z',
  modifiedDate: null,
  orderStatus: 'New',
  presentLocation: 'Orogun Ibadan',

};

// Model data for an order void of req.body.customer_id
export const invalidUser = [
  {
    parcel_id: 'A',
    from_name: 'Oyedeji Peace',
    from_address: 'University of Ibadan',
    from_emailaddress: 'oyedejipeace@gmail.com',
    from_phonenumber: '08162514166',
    to_name: 'Anabelle Oliver',
    to_address: 'University of Ilorin',
    to_emailaddress: 'anabelleoliver@gmail.com',
    to_phonenumber: '08162789045',
    type: 'Packages',
    weight: '5',
    length: '20',
    width: '10',
    height: '30',
    price: '2000',
    user_id: 'A',
  },
];

// Model for wrong orders
export const invalidParcelId = [
  {
    parcel_id: 'A',
    from_name: 'Oyedeji Peace',
    from_address: 'University of Ibadan',
    from_emailaddress: 'oyedejipeace@gmail.com',
    from_phonenumber: '08162514166',
    to_name: 'Anabelle Oliver',
    to_address: 'University of Ilorin',
    to_emailaddress: 'anabelleoliver@gmail.com',
    to_phonenumber: '08162789045',
    type: 'Packages',
    weight: '5',
    length: '20',
    width: '10',
    height: '30',
    price: '2000',

  },
];
