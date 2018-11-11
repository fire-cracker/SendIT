import database from './config'
import bcrypt from 'bcryptjs'

/**
 * Create Tables
 */
async function createTables() {
    const dropTables = `DROP TABLE IF EXISTS user_accounts, orders; DROP TYPE IF EXISTS user_role, status;`;
    const enum_account = `CREATE TYPE user_role AS ENUM ('User', 'Admin');`;
    const enum_role = `CREATE TYPE status AS ENUM ('New' , 'Pending' , 'Cancelled', 'Delivered');`;

    const userAccounts = `CREATE TABLE IF NOT EXISTS user_accounts(
        user_id SERIAL PRIMARY KEY,
        user_name varchar(255) NOT NULL,
        user_email varchar(255) NOT NULL UNIQUE,
        user_password varchar(255) NOT NULL,
        user_role user_role DEFAULT 'User',
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date varchar(255) DEFAULT NULL
      );`;

    const orders = `CREATE TABLE IF NOT EXISTS orders(
            parcel_id SERIAL PRIMARY KEY,
            from_name varchar(255) NOT NULL,
            from_address varchar(255) NOT NULL,
            from_emailaddress varchar(255) NOT NULL,
            from_phonenumber bigint NOT NULL,
            to_name varchar(255) NOT NULL,
            to_address varchar(255) NOT NULL,
            to_emailaddress varchar(255) NOT NULL,
            to_phonenumber bigint NOT NULL,
            type varchar(255) NOT NULL,
            weight integer NOT NULL,
            length integer NOT NULL,
            width integer NOT NULL,
            height integer NOT NULL,
            price integer NOT NULL,
            user_id SERIAL REFERENCES user_accounts(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            modified_date varchar(255) DEFAULT NULL,
            order_status status DEFAULT 'New',
            present_location varchar(255) DEFAULT NULL 
           

          );`;
     
    let user_data = `INSERT INTO user_accounts (user_name, user_email,user_password,user_role)
      VALUES ('testName', 'testEmail@address.com', '${bcrypt.hashSync('P@ssword', 10)}','User'),
      ('tester', 'tester@owner.com', '${bcrypt.hashSync('P@$$word123', 10)}','Admin'),
      ('backEndTester', 'backendtester1@address.com', '${bcrypt.hashSync('backendtester123', 10)}','User');`


    let order_data = `INSERT INTO orders (from_name, from_address, from_emailaddress, from_phonenumber, to_name, to_address, to_emailaddress, to_phonenumber, type, weight, length, width, height, price, order_status,present_location)
      VALUES ('Oyedeji Peace', 'Andela EPIC Tower, Lagos', 'oyedejipeace@gmail.com', '07063707124', 'Akin Omobayo', 'University of Ibadan', 'akinomo@gmail.com','08123456789','Documents','3', '6', '5', '4','2000','New','Orogun Ibadan'),('Angelina Jolie', 'Andela EPIC Tower, Lagos', 'angelina@gmail.com', '07034123344', 'Jamal Smollet', 'University of Abuja', 'jsmollet@gmail.com','08123456789','Packages','3', '6', '5', '4','5000','Delivered','University of Ibadan')`


    const input = dropTables + enum_account + enum_role + userAccounts  + orders;
    const create = user_data  + order_data ;
    await database.query(input);
    await database.query(create);
}


module.exports = {
    createTables,
};

async function instantiateTables() {
    try {
          // create new tables
        await createTables();
        console.log('All Tables created successfully!');
    } catch (err) {
        console.log(err);
    }
}

instantiateTables();