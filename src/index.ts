import dotenv from "dotenv";
import pg, { QueryResult } from "pg";
import { home } from "./interface.js";
import inquirer from "inquirer";
import { createEmployee, createJob, homeList, depQuestions, changeJob } from "./questions.js";

dotenv.config();

const { Client } = pg;


export async function employeeData() {
    const client = new Client();
    await client.connect();

    const results = await client.query(`SELECT * FROM employees`);

    const employeeList = results.rows.map( employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employees_id
    }));

    await client.end();

    return employeeList;
};

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
};

export async function salaryData() {
    const client = new Client();
    await client.connect();

    const results = await client.query(`SELECT * FROM jobs`);

    const salaryList = results.rows.map( job => ({
        name: job.salary,
        value: job.jobs_id
    }));

    await client.end();

    return salaryList;
};

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

    const results = await client.query(
        `SELECT employees.employees_id, CONCAT(employees.first_name, ' ', employees.last_name) 
        AS employee_name, title, salary, department_name, CONCAT(managers.first_name, ' ', managers.last_name) 
        AS manager FROM employees JOIN jobs ON employees.job_id = jobs_id 
        JOIN departments ON jobs.department_id = departments_id LEFT JOIN 
        employees AS managers ON employees.manager_id = managers.employees_id;`
    );
    console.table(results.rows);
    await client.end();
}

export async function viewJobs() {
    const client = new Client();
    await client.connect();

    const results = await client.query(
    `SELECT jobs_id, title, salary, department_name 
    FROM jobs JOIN departments ON jobs.department_id = departments_id;`
    );
    console.table(results.rows);
    await client.end();
}

export async function viewDepartments() {
    const client = new Client();
    await client.connect();
    
    const results = await client.query(
    `SELECT departments_id, department_name FROM departments`
    );
    console.table(results.rows);
    await client.end();
}

export async function addEmployee() {
    const client = new Client();
    await client.connect();

    const employeeQuestions = await createEmployee();

    const answers = await inquirer.prompt(employeeQuestions);

    try {
        await client.query(`INSERT INTO employees (first_name, last_name, job_id, manager_id)
            VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, answers.job, answers.manager]);
            console.log(`New employee added!`);
        } catch (err) {
            console.log(`Something failed!`, err);
        } finally {
            await client.end();
        }
};

export async function addJob() {
    const client = new Client();
    await client.connect();

    const jobQuestions = await createJob();

    const answers = await inquirer.prompt(jobQuestions);

    try {
        await client.query(`INSERT INTO jobs (title, salary, department_id)
            VALUES ($1, $2, $3)`, [answers.jobTitle, answers.jobSalary, answers.jobDepartment]);
            console.log(`New job created!`);
        } catch (err) {
            console.log(`Something failed!`, err);
        } finally {
            await client.end();
        }
};

export async function addDepartment() {
    const client = new Client();
    await client.connect();

    const answers = await inquirer.prompt(depQuestions);

    try {
        await client.query(`INSERT INTO departments (department_name)
            VALUES ($1)`, [answers.depName]);
            console.log(`New department created!`);
        } catch (err) {
            console.log(`Something failed!`, err);
        } finally {
            await client.end();
        }
};

export async function changeRole() {
    const client = new Client();
    await client.connect();

    const jobsList = await changeJob();

    const answers = await inquirer.prompt(jobsList);
    console.log(`${answers.employee} ${answers.job}`);

    try {
        await client.query
        (`UPDATE employees SET job_id = $1 WHERE employees_id = $2`, 
            [answers.jobs, answers.employees]);
            console.log(`Employee role has changed!`);
        } catch (err) {
            console.log(`Something went wrong!`, err);
        } finally {
            await client.end();
        };
};

await console.log(
    `                  @%++*%@               
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
                  
        The toolbox is open!`
);
home();