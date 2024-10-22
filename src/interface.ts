import dotenv from "dotenv";
import pg from "pg";
import inquirer from "inquirer";
import { type } from "os";
import { createEmployee, createJob, homeList, depQuestions } from "./questions.js";
import { addDepartment, addEmployee, addJob, viewAll, viewDepartments, viewJobs } from "./index.js";

export async function home() {

    inquirer.prompt(homeList).then(async(answers) => {
        let exit = false;

        if (answers.action === 'View all employees') {
            await viewAll();

        } else if (answers.action === 'Add employee') {
            await addEmployee();

        } else if (answers.action === 'Update employee role') {
            console.log(`update employee`);

        } else if (answers.action === 'View all roles') {
            await viewJobs();

        } else if (answers.action === 'Add role') {
            await addJob();

        } else if (answers.action === 'View all departments') {
            await viewDepartments();

        } else if (answers.action === `Add department`) {
            await addDepartment();

        } else if (answers.action === `Exit`) {
            console.log (`goodbye`);

            exit = true;
        }
        if (!exit) {
            await home();
        }
    });

};