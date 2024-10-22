import { employeeData, jobData, departmentData } from "./index.js";
export const homeList = [{
        type: 'list',
        name: 'action',
        message: "Please choose and option, scroll to view more",
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            `Add department`,
            `Exit`,
        ]
    }];
export async function createEmployee() {
    const jobs = await jobData();
    const employees = await employeeData();
    const employeeQuestions = [
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
                { name: 'None', value: null }
            ],
        },
    ];
    return employeeQuestions;
}
export async function createJob() {
    const departments = await departmentData();
    const jobQuestions = [
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
export const depQuestions = [
    {
        type: `input`,
        name: `depName`,
        message: "Please enter demartment name",
    },
];
