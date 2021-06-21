DROP DATABASE IF Exists seed_DB
CREATE DATABASE seed_DB

USE seed_DB


CREATE Table department{
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
}

CREATE Table role{
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT(20),
    PRIMARY KEY (id)
}

CREATE Table employee{
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id) 
}

INSERT INTO department(name) values('Ahmad');
INSERT INTO role()


