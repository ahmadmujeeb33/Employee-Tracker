const inquirer = require('inquire');

inquirer
    prompt([
        
        {
            type:'list',
            message:'What would you like to do',
            name:'options',
            choices: ['View all Employees','View all departments','View all roles','add departments','add roles','add employees','Update Employee Roles']
        }

    ])

    .then((response) =>{

        switch(response){
            
        }

    })