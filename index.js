const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

let generateHTML = require("./generateHTML.js")

const writeFileAsync = util.promisify(fs.writeFile);

function promptUsers() {
return inquirer.prompt([

    {
        type:"list",
        name: "color",
        message: "What is your favorite color?",
        choices: [
            "red",
            "blue",
            "pink",
            "green"
        ]
    }
])

}

async function getGitHub() {
    try {
      const { userName } = await inquirer.prompt({
        message: "Enter your GitHub username:",
        name: "userName"
      });
  
      const { data } = await axios.get(
        `https://api.github.com/users/${userName}`
      );
  
      console.log(data);
        return data;
    
    } catch (err) {
      console.log(err);
    }
  }

function writeToFile(fileName, data, data2) {
 
}

async function init() {
    try{
        const data = await promptUsers();
        const data2 = await getGitHub();

        const html = await generateHTML.generateHTML(data, data2);

        await writeFileAsync("index.html", html);
        console.log("Successfully wrote to index.html");
    } 
    catch(err) {
      console.log(err);
    }
}

init();
