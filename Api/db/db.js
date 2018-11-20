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
            "fromName" varchar(255) NOT NULL,
            "fromAddress" varchar(255) NOT NULL,
            "fromEmail" varchar(255) NOT NULL,
            "toName" varchar(255) NOT NULL,
            "toAddress" varchar(255) NOT NULL,
            "toEmail" varchar(255) NOT NULL,
            type varchar(255) NOT NULL,
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
      ('tester', 'tester@owner.com', '${bcrypt.hashSync('P@$$word123', 10)}','Admin'),
      ('backEndTester', 'backendtester1@address.com', '${bcrypt.hashSync('backendtester123', 10)}','User');`;


  const orderData = `INSERT INTO orders ("fromName", "fromAddress", "fromEmail", "toName", "toAddress", "toEmail", type, weight, price,"userId", "orderStatus","presentLocation")
      VALUES ('Oyedeji Peace', 'Andela EPIC Tower, Lagos', 'oyedejipeace@gmail.com', 'Akin Omobayo', 'University of Ibadan', 'akinomo@gmail.com','Documents','3', '2000','1','New','Orogun Ibadan'),('Angelina Jolie', 'Andela EPIC Tower, Lagos', 'angelina@gmail.com', 'Jamal Smollet', 'University of Abuja', 'jsmollet@gmail.com','Packages','3','5000','2','Delivered','University of Ibadan')`;


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
