DROP DATABASE IF EXISTS toolbox_db;

CREATE DATABASE toolbox_db;

\c toolbox_db;

CREATE TABLE departments (
    id SERIAL,
    name VARCHAR(40) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE jobs (
    id SERIAL,
    title VARCHAR(25) UNIQUE NOT NULL,
    salary INTEGER NOT NULL,
    department INTEGER NOT NULL,
    FOREIGN KEY (department)
    REFERENCES departments(id)
    ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id SERIAL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job INTEGER NOT NULL,
    manager INTEGER DEFAULT NULL,
    FOREIGN KEY(job)
    REFERENCES jobs(id)
    ON DELETE SET NULL,
    FOREIGN KEY(manager)
    REFERENCES employees(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

\i db/seedDefault.sql;