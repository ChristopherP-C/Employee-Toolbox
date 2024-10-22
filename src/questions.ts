import inquirer from "inquirer";
import { type } from "os";
import pg from "pg";
import Choices from "inquirer/lib/objects/choices";
import { employeeData, jobData, salaryData, departmentData, managerData } from "./index.js";

export const homeList = 
[{
    type: 'list',
    name: 'action',
    message: "Please choose and option, scroll to view more",
    choices:
    [
        'View employees',
        'Add employee',
        'Update employee role',
        `Update employee manager`,
        'View all roles',
        'Add role',
        'View all departments',
        `Add department`,
        `View department utilized budget`,
        `Delete`,
        `Exit`,
    ]
}];

export async function changeJob() {
    const jobs = await jobData();
    const employees = await employeeData();

    const jobsList =
    [
        {
            type: `list`,
            name: `employees`,
            message: "Select which employee whose role you would like to change",
            choices: employees,
        },
        {
            type: `list`,
            name: `jobs`,
            message: "Please select a new role for this employee",
            choices: jobs,
        },
    ];
    return jobsList;
};

export async function changeLead() {
    const employees = await employeeData();

    const managerList =
    [
        {
            type: `list`,
            name: `employees`,
            message: "Select which employee whose manager you would like to change",
            choices: employees,
        },
        {
            type: `list`,
            name: `manager`,
            message: "Please select a new manager for this employee",
            choices: [
                ...employees,
                {name: 'None', value: null}
            ],
        },
    ];
    return managerList;
};

export async function createEmployee() {

    const jobs = await jobData();
    const employees = await employeeData();

    const employeeQuestions = 
    [
        {
            type: `input`,
            name: `firstName`,
            message: "Enter employee first name",
        },
        {
            type: `input`,
            name: `lastName`,
            message: "Enter employee last name",
        },
        {
            type: `list`,
            name: `job`,
            message: "Select employee job title",
            choices: jobs,
        },
        {
            type: `list`,
            name: `manager`,
            message: "Please select the employees manager",
            choices: [
                ...employees,
                {name: 'None', value: null}
            ],
        },
    ];

    return employeeQuestions;    
}

 export async function createJob() {

    const departments = await departmentData();

    const jobQuestions =
    [
        {
            type: `input`,
            name: `jobTitle`,
            message: "Enter job title",
        },
        {
            type: `number`,
            name: `jobSalary`,
            message: "Please enter this roles salary",
        },
        {
            type: `list`,
            name: `jobDepartment`,
            message: "please assign this jobs department",
            choices: departments,
        },
    ];
    return jobQuestions;
 }

 export async function getDepartments() {
    const departments = await departmentData();

    const depList =
    [
        {
            type: `list`,
            name: `department`,
            message: "Select a department",
            choices: departments,
        },
    ];
    return depList;
 };
 
 export async function getEmployees() {
    const employees = await employeeData();

    const employeeList =
    [
        {
            type: `list`,
            name: `employee`,
            message: "Select an employee",
            choices: employees,
        },
    ];
    return employeeList;
 };

 export async function getJobs() {
    const jobs = await jobData();

    const jobList =
    [
        {
            type: `list`,
            name: `job`,
            message: "Select a job",
            choices: jobs,
        },
    ];
    return jobList;
 };
 
 export async function getManagers() {
    const managers = await managerData();

    const managerChoices =
    [
        {
            type: `list`,
            name: `manager`,
            message: "Select a manager",
            choices: managers,
        },
    ];
    return managerChoices;
 };

export const depQuestions =
    [
        {
        type: `input`,
        name: `depName`,
        message: "Please enter demartment name",
        },
    ];

export const deleteList =
    [
        {
            type: `list`,
            name: `delete`,
            message: "Please select which area to delete from",
            choices:
            [
                `employees`,
                `jobs`,
                `departments`
            ],
        },
    ];

export const viewList =
    [
        {
            type: `list`,
            name: `view`,
            message: "Would you like to view all employees, or based on either department or manager?",
            choices: [
                `View all`,
                `By department`,
                `By manager`
            ],
        },
    ];