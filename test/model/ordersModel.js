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

export const firstOrder2 = {
  toName: 'Abisola Omobayo',
  toAddress: 'University of Ibadan',
  toEmail: 'oyedejipeace@yahoo.com',
  fromName: 'Abisola Omobayo',
  fromAddress: 'University of Unilag',
  fromEmail: 'abisolaomobayo@gmail.com',
  type: 'Packages',
  weight: '20',
  price: '3000',
};
// Model data for an order void of req.body.customer_id
export const noSender = [
  {
    parcelId: 1,
    fromName: ' ',
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

// Model for wrong orders
export const noSenderAddress = [
  {
    parcelId: 1,
    fromName: 'Andela EPIC',
    fromAddress: '    ',
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
export const badName = [
  {
    parcelId: 1,
    fromName: 'De',
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
export const badName2 = {
  toName: 'Abisola Omobayo bisola Omobayo bisola Omobayo bisola Omobayo bisola Omobayo bisola Omobayo',
  toAddress: 'Unive',
  toEmail: 'oy@ya.com',
  fromName: 'Abisola Omobayo bisola Omobayo bisola Omobayo bisola Omobayo bisola Omobayo bisola Omobayo',
  fromAddress: 'Unive',
  fromEmail: 'oy@ya.com',
  type: 'Packages',
  weight: '20',
  price: '30',
};
export const badName3 = [
  {
    parcelId: 1,
    fromName: '123456789012345',
    fromAddress: 'Andela EPIC Tower, Lagos',
    fromEmail: 'oyedejipeace@gmail.com',
    toName: '123456789012345',
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
export const badAddress = {
  toName: 'Ab',
  toAddress: 'Andela EPIC Tower, Lagos University of Ibadan University of Ibadan University of Ibadan University of Ibadan University of IbadanUniversity of IbadanUniversity of IbadanUniversity of IbadanUniversity of IbadanUniversity of Ibadan',
  toEmail: 'abisolgmail.com',
  fromName: 'Ab',
  fromAddress: 'Andela EPIC Tower, Lagos University of Ibadan University of Ibadan University of Ibadan University of Ibadan University of IbadanUniversity of IbadanUniversity of IbadanUniversity of IbadanUniversity of IbadanUniversity of Ibadan',
  fromEmail: ' abisolagmail.com',
  type: 'Packages',
  weight: '20875798',
  price: '3000234567984',
};

export const badAddress2 = [
  {
    parcelId: 1,
    fromName: '123456789012345',
    fromAddress: ' Andela ',
    fromEmail: 'oyedejipeace@gmail.com',
    toName: '123456789012345',
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
