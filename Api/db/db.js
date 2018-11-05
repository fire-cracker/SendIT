const orders = [
      {
            orderId: 1,
            from: {
                  name: 'Oyedeji Peace',
                  address: 'University of Ibadan',
                  emailaddress: 'oyedejipeace@gmail.com',
                  phonenumber: '08162514166',
            },

            to: {
                  toName: 'Anabelle Oliver',
                  toAddress: 'University of Ilorin',
                  toEmailaddress: 'anabelleoliver@gmail.com',
                  toPhonenumber: '08162789045',
            },

            parceldetails: {
                  type: 'Packages',
                  weight: '5',
                  dimension: { length: '20', width: '10', height: '30' }
            },

      }
];

export default orders;
