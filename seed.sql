DROP DATABASE IF Exists seed_DB;
CREATE DATABASE seed_DB;

USE seed_DB;


CREATE Table department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE Table role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT(20),
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE Table employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id) 
);

INSERT INTO department(name) values('Engineering');
INSERT INTO role(title,salary,department_id) values('Software Engineer',100000, 1);
INSERT INTO employee(first_name,last_name,role_id) values('Ahmad','Mujeeb',1);

INSERT INTO department(name) values('Law');
INSERT INTO role(title,salary,department_id) values('Sales Person',100000, 2);
INSERT INTO employee(first_name,last_name,role_id) values('Lemar','Jackson',2);

INSERT INTO department(name) values('Finance');
INSERT INTO role(title,salary,department_id) values('Accountant',100000, 3);
INSERT INTO employee(first_name,last_name,role_id) values('John','Cena',3);