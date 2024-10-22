# Employee-Toolbox

  ## Description
    I wanted an application that could be used to manage employee information at a company
    This project was made to create a database to store that information, and manipulate it in various ways
    the Employee-Toolbox allows users to view information regarding their employees, their jobs, salaries, and other details
    This project taught me the fundamentals of database management using SQL

  ## Table of Contents
  -[Install](#install)

-[Usage](#usage)

-[License](#license)

-[Credits](#Credits)


  ## Installation
  After copying the codebase into the folder you wish to run it in, run npm i to install the necessary components

  ## Usage
  After install, ensure you create a .env file within the root of the application, and fill in the following values: 

  PGUSER=postgres

  PGPASSWORD=your postgres password

  PGHOST=localhost 
  
  PGPORT=5432

  PGDATABASE=toolbox_db

  Then from the root folder open your CLI terminal into postgres and run \i db/schema.sql to initialize the database. If you also wish to pre-populate your database you can then run \i db/seed.sql from here you can exit your postgres, and now simply run npm run start in your CLI whenever you wish to use the Employee-Toolbox!

  ## Credits
  made using the inquirer package: github.com/SBoudrias/Inquirer.js

  and the pg package: github.com/brianc/node-postgres

  ## License
  MIT

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [View license here] => (https://opensource.org/license/MIT)

  


  Questions? Please contact me at:
  https://github.com/ChristopherP-C or christopherp.c.2day@gmail.com
