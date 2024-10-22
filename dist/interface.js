import inquirer from "inquirer";
import { homeList, viewList, deleteList } from "./questions.js";
import { addDepartment, addEmployee, addJob, budget, changeManager, changeRole, deleteDepartment, deleteEmployee, deleteJob, viewAll, viewDep, viewDepartments, viewJobs, viewManagers } from "./index.js";
export async function home() {
    inquirer.prompt(homeList).then(async (answers) => {
        let exit = false;
        if (answers.action === 'View employees') {
            await inquirer.prompt(viewList).then(async (answers) => {
                if (answers.view === `View all`) {
                    await viewAll();
                }
                else if (answers.view === `By department`) {
                    await viewDep();
                }
                else {
                    await viewManagers();
                }
            });
        }
        else if (answers.action === 'Add employee') {
            await addEmployee();
        }
        else if (answers.action === 'Update employee role') {
            await changeRole();
        }
        else if (answers.action === `Update employee manager`) {
            await changeManager();
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
        else if (answers.action === `View department utilized budget`) {
            await budget();
        }
        else if (answers.action === `Delete`) {
            await inquirer.prompt(deleteList).then(async (answers) => {
                if (answers.delete === `employees`) {
                    await deleteEmployee();
                }
                else if (answers.action === `jobs`) {
                    await deleteJob();
                }
                else {
                    await deleteDepartment();
                }
            });
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
