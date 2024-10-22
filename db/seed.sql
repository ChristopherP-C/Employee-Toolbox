DO $$
  DECLARE
  BEGIN
  
INSERT INTO departments (department_name)
VALUES
('Front-end Development'),
('Back-end Developmetnt'),
('Photography');

INSERT INTO jobs (title, salary, department_id)
VALUES
('Back-end Dev', 70000, 2),
('Front-end Dev', 70000, 1),
('Photographer', 60000, 3),
('Front-end Lead', 100000, 1),
('Back-end Lead', 100000, 2),
('Lead Photographer', 95000, 3);

INSERT INTO employees (first_name, last_name, job_id, manager_id)
VALUES
('Chris', 'P-C', 1, 6),
('Josh', 'Askew', 2, 5),
('Jacob', 'P-C', 3, 4),
('Commander', 'Sheperd', 6, NULL),
('Lara', 'Croft', 4, NULL),
('Samus', 'Aran', 5, NULL);

RAISE NOTICE 'complete';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
        ROLLBACK; 
END $$;