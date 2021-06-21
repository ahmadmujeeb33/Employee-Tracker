const inquirer = require('inquire');
const sql = require('mysql');



const start = () =>{

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
                case 'View all Employees':
                    // something

                case 'View all departments':
                    // something 

                case 'View all roles':
                    // soemthign

                case 'add departments':
                    // soemthuih[onfd]
                case 'add roles':
                    //soemthign

                case 'add employees':
                    // soemthing
                    addEmployee()

                case 'Update Employee Roles':
                    // something 
            }

        })
}

function addEmployee(){
    inquirer
        prompt([
            {
                type:'input',
                message: 'Please enter first name',
                name: "fname"
            },

            {
                type:'input',
                message: 'Please enter last name',
                name: "lname"
            },

            {
                type:'list',
                message: 'What is the employees role',
                name: 'role',
                choices: ['Manager','Software Engineer','Salesperson','Accountant','Lawyer']
            },



            // {
            //     type:'list',
            //     message: 'What is the employees manager',
            //     name: "lname"
            // },

        ])

        .next((response)=>{
            if(response.role != 'Manager'){

            }
        })
}