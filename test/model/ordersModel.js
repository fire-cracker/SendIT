// Model of the database content
export const databaseOrders = [{
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'University of Ibadan',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleoliver@gmail.com',
  type: 'Packages',
  weight: '5',

},
{
  parcelId: 2,
  fromName: 'Jamal Empire ',
  fromAddress: 'Bodija,Ibadan Oyo State',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleoliver@gmail.com',
  type: 'Packages',
  weight: '5',

},
];

// Model data for a complete Order
export const fullOrder = {
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'University of Ibadan',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleoliver@gmail.com',
  type: 'Packages',
  weight: '5',

};

// Model of the database[1]
export const firstOrder = [{
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'University of Ibadan',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleoliver@gmail.com',
  type: 'Packages',
  weight: '5',

}];

// Model for wrong orders
export const wrongDataType = [{
  parcelId: 1,
  fromName: '',
  fromAddress: '',
  fromEmail: '',
  toName: '',
  toAddress: '',
  toEmail: '',
  type: '',
  weight: '',

}];

export const wrongDataType2 = [{
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: '',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleoliver@gmail.com',
  type: 'Packages',
  weight: '5',

}];
// Model of the database[1]
export const wrongEmail = {
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'University of Ibadan',
  fromEmail: 'oyedejipeacegmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleolivergmail.com',
  type: 'Packages',
  weight: '5',

};
export const wrongLength = {
  parcelId: 1,
  fromName: 'Oyedeji Peace Olubukola Ajoke, Oyetola',
  fromAddress: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  fromEmail: 'OyedejiPeaceOlubukolaAjoke,Oyetola@gmail.com',
  toName: 'A',
  toAddress: 'Ibadan',
  toEmail: 'a@gmail',
  type: 'Packagesparcel',
  weight: '50000',

};
export const emailLength = {
  parcelId: 1,
  fromName: 'Oyedeji Peace',
  fromAddress: 'University of Ibadan',
  fromEmail: 'o@gma.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleolivergmail.com',
  type: 'Packages',
  weight: '5',

};
export const nameLength = {
  parcelId: 1,
  fromName: 'Oyedeji Peace Olubukola Ajoke, Oyetola',
  fromAddress: 'University of Ibadan',
  fromEmail: 'oyedejipeace@gmail.com',
  toName: 'Anabelle Oliver',
  toAddress: 'University of Ilorin',
  toEmail: 'anabelleolivergmail.com',
  type: 'Packages',
  weight: '5',

};
