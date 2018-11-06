//Model of the database content
export const databaseOrders = [
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

    },
    {
        orderId: 2,
        from: {
            name: 'Jamal Empire ',
            address: 'Bodija,Ibadan Oyo State',
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
]

//Model data for a complete Order
export const fullOrder = [
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

//Model of the database[1]
export const firstOrder = [
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

//Model for wrong orders
export const wrongDataType = [
    {
        orderId: 1,
        from: {
            name: '',
            address: '',
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
            weight: 5,
            dimension: { length: 20, width: 10, height: 30 }
        },

    }
];

export const orders = [
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
