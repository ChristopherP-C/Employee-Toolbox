import dotenv from "dotenv";
import pg from "pg";
import inquirer from "inquirer";
import { type } from "os";
import { createEmployee, createJob, homeList, depQuestions } from "./questions";