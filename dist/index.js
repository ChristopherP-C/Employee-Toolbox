import dotenv from "dotenv";
import pg from "pg";
import { home } from "./interface.js";
import inquirer from "inquirer";
import { createEmployee, createJob, depQuestions, changeJob, changeLead, getDepartments, getManagers, getEmployees, getJobs } from "./questions.js";
dotenv.config();
const { Client } = pg;
export async function employeeData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM employees`);
    const employeeList = results.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employees_id
    }));
    await client.end();
    return employeeList;
}
;
export async function managerData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT DISTINCT managers.employees_id, CONCAT(managers.first_name, ' ', managers.last_name) 
        AS manager_name FROM employees AS employees
        JOIN employees AS managers ON employees.manager_id = managers.employees_id
        WHERE managers.employees_id IS NOT NULL;`);
    const managerChoices = results.rows.map(manager => ({
        name: manager.manager_name,
        value: manager.employees_id
    }));
    await client.end();
    return managerChoices;
}
;
export async function jobData() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT * FROM jobs`);
    const jobList = results.rows.map(job => ({
        name: job.title,
        value: job.jobs_id
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
        value: job.jobs_id
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
        name: department.department_name,
        value: department.departments_id
    }));
    await client.end();
    return departmentList;
}
export async function viewAll() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT employees.employees_id, CONCAT(employees.first_name, ' ', employees.last_name) 
        AS employee_name, title, salary, department_name, CONCAT(managers.first_name, ' ', managers.last_name) 
        AS manager FROM employees JOIN jobs ON employees.job_id = jobs_id 
        JOIN departments ON jobs.department_id = departments_id LEFT JOIN 
        employees AS managers ON employees.manager_id = managers.employees_id;`);
    console.table(results.rows);
    await client.end();
}
export async function viewDep() {
    const client = new Client();
    await client.connect();
    const depList = await getDepartments();
    const answers = await inquirer.prompt(depList);
    const results = await client.query(`SELECT department_name, CONCAT(employees.first_name, ' ', employees.last_name) AS employee 
        FROM employees JOIN jobs ON employees.job_id = jobs_id JOIN departments 
        ON jobs.department_id = departments_id WHERE departments_id = $1;`, [answers.department]);
    console.table(results.rows);
    await client.end();
}
export async function viewManagers() {
    const client = new Client();
    await client.connect();
    const ourManagers = await getManagers();
    const answers = await inquirer.prompt(ourManagers);
    const results = await client.query(`SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, 
        CONCAT(employees.first_name, ' ', employees.last_name) AS employee
        FROM employees JOIN employees AS manager ON employees.manager_id = manager.employees_id
        WHERE employees.manager_id = $1;`, [answers.manager]);
    console.table(results.rows);
    await client.end();
}
export async function viewJobs() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT jobs_id, title, salary, department_name 
    FROM jobs JOIN departments ON jobs.department_id = departments_id;`);
    console.table(results.rows);
    await client.end();
}
export async function viewDepartments() {
    const client = new Client();
    await client.connect();
    const results = await client.query(`SELECT departments_id, department_name FROM departments`);
    console.table(results.rows);
    await client.end();
}
export async function budget() {
    const client = new Client();
    await client.connect();
    const depList = await getDepartments();
    const answers = await inquirer.prompt(depList);
    try {
        const results = await client.query(`SELECT SUM(salary) FROM jobs WHERE department_id = $1`, [answers.department]);
        console.log(`Here is this departments total salary cost`);
        console.table(results.rows);
    }
    catch (err) {
        console.log(`Something failed!`, err);
    }
    finally {
        await client.end();
    }
    ;
}
;
export async function addEmployee() {
    const client = new Client();
    await client.connect();
    const employeeQuestions = await createEmployee();
    const answers = await inquirer.prompt(employeeQuestions);
    try {
        await client.query(`INSERT INTO employees (first_name, last_name, job_id, manager_id)
            VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, answers.job, answers.manager]);
        console.log(`New employee added!`);
    }
    catch (err) {
        console.log(`Something failed!`, err);
    }
    finally {
        await client.end();
    }
}
;
export async function addJob() {
    const client = new Client();
    await client.connect();
    const jobQuestions = await createJob();
    const answers = await inquirer.prompt(jobQuestions);
    try {
        await client.query(`INSERT INTO jobs (title, salary, department_id)
            VALUES ($1, $2, $3)`, [answers.jobTitle, answers.jobSalary, answers.jobDepartment]);
        console.log(`New job created!`);
    }
    catch (err) {
        console.log(`Something failed!`, err);
    }
    finally {
        await client.end();
    }
}
;
export async function addDepartment() {
    const client = new Client();
    await client.connect();
    const answers = await inquirer.prompt(depQuestions);
    try {
        await client.query(`INSERT INTO departments (department_name)
            VALUES ($1)`, [answers.depName]);
        console.log(`New department created!`);
    }
    catch (err) {
        console.log(`Something failed!`, err);
    }
    finally {
        await client.end();
    }
}
;
export async function changeRole() {
    const client = new Client();
    await client.connect();
    const jobsList = await changeJob();
    const answers = await inquirer.prompt(jobsList);
    try {
        await client.query(`UPDATE employees SET job_id = $1 WHERE employees_id = $2`, [answers.jobs, answers.employees]);
        console.log(`Employee role has changed!`);
    }
    catch (err) {
        console.log(`Something went wrong!`, err);
    }
    finally {
        await client.end();
    }
    ;
}
;
export async function changeManager() {
    const client = new Client();
    await client.connect();
    const managerList = await changeLead();
    const answers = await inquirer.prompt(managerList);
    if (answers.manager === answers.employees) {
        console.log(`Warning: Cannot set employee to their own manager, must be set none`);
        console.log(`Your request did not complete`);
        await client.end();
        return;
    }
    try {
        await client.query(`UPDATE employees SET manager_id = $1 WHERE employees_id = $2`, [answers.manager, answers.employees]);
        console.log(`Employee manager has changed!`);
    }
    catch (err) {
        console.log(`Something went wrong!`, err);
    }
    finally {
        await client.end();
    }
    ;
}
;
export async function deleteEmployee() {
    const client = new Client();
    await client.connect();
    const employeeList = await getEmployees();
    const answers = await inquirer.prompt(employeeList);
    try {
        await client.query(`DELETE FROM employees WHERE employees_id = $1`, [answers.employee]);
        console.log(`An employee has been terminated`);
    }
    catch (err) {
        console.log(`Employee could not be deleted!`, err);
    }
    finally {
        await client.end();
    }
}
;
export async function deleteJob() {
    const client = new Client();
    await client.connect();
    const jobList = await getJobs();
    const answers = await inquirer.prompt(jobList);
    try {
        await client.query(`DELETE FROM jobs WHERE jobs_id = $1`, [answers.job]);
        console.log(`A job has been deleted`);
    }
    catch (err) {
        console.log(`job could not be deleted!`, err);
    }
    finally {
        await client.end();
    }
}
;
export async function deleteDepartment() {
    const client = new Client();
    await client.connect();
    const departmentList = await getDepartments();
    const answers = await inquirer.prompt(departmentList);
    try {
        await client.query(`DELETE FROM departments WHERE departments_id = $1`, [answers.department]);
        console.log(`A department has been deleted`);
    }
    catch (err) {
        console.log(`department could not be deleted!`, err);
    }
    finally {
        await client.end();
    }
}
;
console.log(`                  @%++*%@               
                 %**=--==+**#%@@        
               @#++###*+==+++**********@
              %#+*#********###*+=====*%%
             @++#*****++++++++++++##%##%
  @@@@%%%#######****+++++++++=++=*%##%@@
%%%##**++++====++++*##**+++====+%##%@@  
%##*****##*+==+***##########*+=+#%@@    
%##*******##**%#############%%%#@       
%##******#%*+++*#%%#####%#*++***%       
%#####**************%#+++*******%       
%########**********+#*++********%       
%#########**********#*+*********%       
 @%########*********#***********%       
    @%%#**####******#********###@       
       @%##**###**##%*****###***%       
          @%##**####%**##*****##@       
             @######%##****%@@          
               @####%***#@              
                @%##%*#@                
                  @%@@                  
                  
        The toolbox is open!`);
home();
