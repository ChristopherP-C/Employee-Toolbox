DROP DATABASE IF EXISTS toolbox_db;

CREATE DATABASE toolbox_db;

\c toolbox_db;

DO $$
  DECLARE
  BEGIN
  


CREATE TABLE departments (
    departments_id SERIAL,
    department_name VARCHAR(40) UNIQUE NOT NULL,
    PRIMARY KEY (departments_id)
);

CREATE TABLE jobs (
    jobs_id SERIAL,
    title VARCHAR(25) UNIQUE NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(departments_id)
    ON DELETE CASCADE,
    PRIMARY KEY (jobs_id)
);

CREATE TABLE employees (
    employees_id SERIAL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_id INTEGER NOT NULL,
    manager_id INTEGER DEFAULT NULL,
    FOREIGN KEY(job_id)
    REFERENCES jobs(jobs_id)
    ON DELETE CASCADE,
    FOREIGN KEY(manager_id)
    REFERENCES employees(employees_id)
    ON DELETE SET NULL,
    PRIMARY KEY (employees_id)
);

RAISE NOTICE 'complete';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
        ROLLBACK; 
END $$;
