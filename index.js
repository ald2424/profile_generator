const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var pdf = require('html-pdf');



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
        
        return data;
    
    } catch (err) {
      console.log(err);
    }
  }


async function init() {
    try{
        const data = await promptUsers();
        const data2 = await getGitHub();

        const html = await generateHTML.generateHTML(data, data2);

        await writeFileAsync("index.html", html);
        console.log("Successfully wrote to index.html");

        var doc = fs.readFileSync('index.html', 'utf8');
        var options = { format: 'Letter', orientation: "portrait" };

        pdf.create(doc, options).toFile('profile_generator.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log("Created pdf file"); 
        });
    } 
    catch(err) {
      console.log(err);
    }
}

init();
