import dotenv from "dotenv";
import pg from "pg";
import { home } from "./interface.js";
dotenv.config();
const { Client } = pg;
export async function employeeData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM employees`);
    const employeeList = results.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));
    await client.end();
    return employeeList;
}
;
export async function jobData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM jobs`);
    const jobList = results.rows.map(job => ({
        name: job.title,
        value: job.id,
    }));
    await client.end();
    return jobList;
}
;
export async function salaryData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM jobs`);
    const salaryList = results.rows.map(job => ({
        name: job.salary,
        value: job.id,
    }));
    await client.end();
    return salaryList;
}
;
export async function departmentData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM departments`);
    const departmentList = results.rows.map(department => ({
        name: department.name,
        value: department.id,
    }));
    await client.end();
    return departmentList;
}
export async function viewAll() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM employees
        JOIN jobs ON employees.job = jobs.id
        JOIN departments ON jobs.department = departments.id`);
    console.table(results.rows);
    await client.end();
}
home();
// export async function employees() {
//     await client.query(`SELECT * FROM employees`);
// }
// export async function jobs() {
//     await client.query(`SELECT * FROM jobs`);
// }
// export async function departments() {
//     await client.query(`SELECT * FROM departments`);
// }
// const employees2 = await client.query(`SELECT * FROM employees`);
// const jobs2 = await client.query(`SELECT * FROM jobs`);
// const departments2 = await client.query(`SELECT * FROM departments`);
// const res2 = await client.query({rowMode: 'array', text: `SELECT * FROM employees`});
// console.log(employees2.rows);
// console.log(res2.rows);
// employees2.rows.forEach(employee => console.log(`${employee.first_name} ${employee.last_name}`));
// employees2.rows.map(employee => console.log(`${employee.first_name} ${employee.last_name}`));
// console.log(employees2.rows[3].first_name + ` ` + employees2.rows[3].last_name);
// console.log(res2.rows[3]);
// console.table(employees2.rows);
// console.table(jobs2.rows);
// console.table(departments2.rows);
// await client.end();
// console.log(`goodbye!`);
