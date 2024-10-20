INSERT INTO departments (name)
VALUES
('Front-end Development'),
('Back-end Developmetnt'),
('Photography');

INSERT INTO jobs (title, salary, department)
VALUES
('Back-end Dev', 70000, 2),
('Front-end Dev', 70000, 1),
('Photographer', 60000, 3),
('Front-end Lead', 100000, 1),
('Back-end Lead', 100000, 2),
('Lead Photographer', 95000, 3);

INSERT INTO employees (first_name, last_name, job, manager)
VALUES
('Chris', 'P-C', 1, 6),
('Josh', 'Askew', 2, 5),
('Jacob', 'P-C', 3, 4),
('Commander', 'Sheperd', 6, NULL),
('Lara', 'Croft', 4, NULL),
('Samus', 'Aran', 5, NULL);