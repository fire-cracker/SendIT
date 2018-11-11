//Model of the database content
export const databaseOrders = [
    {
        parcel_id: 1,
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
        price :'5000',

    },
    {
        parcel_id: 2,
        from_name: 'Jamal Empire ',
        from_address: 'Bodija,Ibadan Oyo State',
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
        price :'2000',
    }
]

//Model of a particular user orders
export const orders = [
    {
        parcel_id: 1,
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
        price :'5000',
        user_id: '1',
        created_at: "2018-10-18T07:13:56.584Z",
        modified_date: null,
        order_status: 'New',
        present_location:null

    },
    {
        parcel_id: 2,
        from_name: 'Jamal Empire ',
        from_address: 'Bodija,Ibadan Oyo State',
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
        price :'2000',
        user_id: '1',
        created_at: "2018-10-18T07:13:56.584Z",
        modified_date: null,
        order_status: 'New',
        present_location:null
    }
]

//Model data for a updated Order
export const updateOrder = [
    {
        parcel_id: 1,
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
        price :'2000',
        created_at: "2018-10-18T07:13:56.584Z",
        modified_date:"2018-10-18T07:13:56.584Z",
        order_status: 'Pending',
        present_location:'University of Ilorin'
    }
];

export const update = [
    {
        parcel_id: 1,
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
        price :'2000',
        created_at: "2018-10-18T07:13:56.584Z",
        modified_date:"2018-10-18T07:13:56.584Z",
        order_status: 'Delivered',
        present_location:'University of Ilorin'
    }
];

//Model of the database[1]
export const firstOrder = [
    {
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
        price :'2000'
    }
]

//Model data for an order void of req.body.customer_id
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
        price :'2000',
        user_id: 'A'
}
]

//Model for wrong orders
export const invalidParcel_id= [
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
        price :'2000'

    }
];

