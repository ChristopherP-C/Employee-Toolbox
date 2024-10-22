import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
const { Client } = pg;
const client = new Client();
await client.connect();
export async function employees() {
    await client.query(`SELECT * FROM employees`);
}
export async function jobs() {
    await client.query(`SELECT * FROM jobs`);
}
export async function departments() {
    await client.query(`SELECT * FROM departments`);
}
const employees2 = await client.query(`SELECT * FROM employees`);
const jobs2 = await client.query(`SELECT * FROM jobs`);
const departments2 = await client.query(`SELECT * FROM departments`);
const res2 = await client.query({ rowMode: 'array', text: `SELECT * FROM employees` });
console.log(employees2.rows);
console.log(res2.rows);
employees2.rows.forEach(employee => console.log(`${employee.first_name} ${employee.last_name}`));
employees2.rows.map(employee => console.log(`${employee.first_name} ${employee.last_name}`));
console.log(employees2.rows[3].first_name + ` ` + employees2.rows[3].last_name);
console.log(res2.rows[3]);
console.table(employees2.rows);
console.table(jobs2.rows);
console.table(departments2.rows);
await client.end();
console.log(`goodbye!`);
// DO $$
//   DECLARE
//   BEGIN
// RAISE NOTICE 'complete';
// EXCEPTION
//     WHEN OTHERS THEN
//         RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
//         ROLLBACK; 
// END $$;
