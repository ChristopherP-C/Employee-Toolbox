import dotenv from "dotenv";
import pg from "pg";
import inquirer from "inquirer";
import { type } from "os";
import { createEmployee, createJob, homeList, depQuestions } from "./questions.js";
import { viewAll, viewDepartments, viewJobs } from "./index.js";

export async function home() {

    inquirer.prompt(homeList).then((answers) => {
        let exit = false;

        if (answers.action === 'View all employees') {
            viewAll();
        } else if (answers.action === 'Add employee') {
            console.log(`add employee`);
        } else if (answers.action === 'Update employee role') {
            console.log(`update employee`);
        } else if (answers.action === 'View all roles') {
            viewJobs();
        } else if (answers.action === 'Add role') {
            console.log(`more jobs`);
        } else if (answers.action === 'View all departments') {
            viewDepartments();
        } else if (answers.action === `Add department`) {
            console.log(`more departments`);
        } else if (answers.action === `Exit`) {
            console.log (`goodbye`);
            exit = true;
        }
        if (!exit) {
            home();
        }
    });

};