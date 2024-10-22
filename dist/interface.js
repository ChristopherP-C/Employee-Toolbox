import inquirer from "inquirer";
import { homeList } from "./questions.js";
import { addDepartment, addEmployee, addJob, changeRole, viewAll, viewDepartments, viewJobs } from "./index.js";
export async function home() {
    inquirer.prompt(homeList).then(async (answers) => {
        let exit = false;
        if (answers.action === 'View all employees') {
            await viewAll();
        }
        else if (answers.action === 'Add employee') {
            await addEmployee();
        }
        else if (answers.action === 'Update employee role') {
            await changeRole();
        }
        else if (answers.action === 'View all roles') {
            await viewJobs();
        }
        else if (answers.action === 'Add role') {
            await addJob();
        }
        else if (answers.action === 'View all departments') {
            await viewDepartments();
        }
        else if (answers.action === `Add department`) {
            await addDepartment();
        }
        else if (answers.action === `Exit`) {
            await console.log(`                   
            *#%%%%%%%%             
          @%%        ##@            
 *++========+++======+++========++* 
%%################################%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%*=-#%%%%%%%%%%%%%%%%
 %%%%%%%%%%%%%%%#--#%%%%%%%%%%%%%%% 
 %%%%%%%%%%%%%%%%##%%%%%%%%%%%%%%%% 
 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     
 
The toolbox is now closed, goodbye!`);
            exit = true;
        }
        if (!exit) {
            await home();
        }
    });
}
;
