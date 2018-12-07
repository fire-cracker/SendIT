import bcrypt from 'bcryptjs';
import database from './config';

/**
 * Create Tables
 */
async function createTables() {
  const dropTables = 'DROP TABLE IF EXISTS user_accounts, orders; DROP TYPE IF EXISTS user_role, status;';
  const enumAccount = 'CREATE TYPE user_role AS ENUM (\'User\', \'Admin\');';
  const enumRole = 'CREATE TYPE status AS ENUM (\'New\' , \'Pending\' , \'Cancelled\', \'Delivered\');';

  const userAccounts = `CREATE TABLE IF NOT EXISTS user_accounts(
        "userId" SERIAL PRIMARY KEY,
        "userName" varchar(255) NOT NULL UNIQUE,
        "userEmail" varchar(255) NOT NULL UNIQUE,
        "userPassword" varchar(255) NOT NULL,
        "userRole" user_role DEFAULT 'User',
        "createdDate" TIMESTAMP DEFAULT NOW(),
        "modifiedDate" varchar(255) DEFAULT NULL
      );`;

  const orders = `CREATE TABLE IF NOT EXISTS orders(
            "parcelId" SERIAL PRIMARY KEY,
            "fromAddress" varchar(255) NOT NULL,
            "toAddress" varchar(255) NOT NULL,
            weight integer NOT NULL,
            price integer NOT NULL,
            "userId" integer NOT NULL REFERENCES user_accounts("userId") ON DELETE CASCADE ON UPDATE CASCADE,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            "modifiedDate" varchar(255) DEFAULT NULL,
            "orderStatus" status DEFAULT 'New',
            "presentLocation" varchar(255) DEFAULT NULL 
          );`;

  const userData = `INSERT INTO user_accounts ("userName", "userEmail","userPassword","userRole")
      VALUES ('testName', 'testEmail@address.com', '${bcrypt.hashSync('P@ssword', 10)}','User'),
      ('OyedejiPeace', 'oyedejipeace@gmail.com', '${bcrypt.hashSync('oyedejipeace', 10)}','Admin'),
      ('AfolabiAbimbola', 'afolabiabimbola@address.com', '${bcrypt.hashSync('afolabiabimbola', 10)}','Admin');`;


  const orderData = `
    INSERT INTO orders ("fromAddress", "toAddress", weight, price,"userId", "orderStatus", "presentLocation")
      VALUES ('Andela EPIC Tower, Lagos', 'University of Ibadan', '3', '2000',1,'New','Orogun Ibadan'),
      ('Andela EPIC Tower, Lagos', 'University of Abuja', '3','5000',2,'Delivered','University of Ibadan'),
      ('Andela EPIC Tower, Lagos', 'University of Abuja', '3','5000', 3,'Delivered','University of Ibadan');`;


  const input = dropTables + enumAccount + enumRole + userAccounts + orders;
  const create = userData + orderData;
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
