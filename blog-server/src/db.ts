import mysql from "mysql2";

/*Connecting to the database. Change password and other values to use local database*/
export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"" /*insert root password here*/,
    database:"microblog" /*name of the database*/
});

