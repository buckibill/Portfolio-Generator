
const inquirer = require("inquirer");
//axios
const axios = require("axios");
//fs
const fs = require('fs');
//path
const path = require('path');
//open
const open = require('open');

var createHTML = require('create-html')

let html;


fs.writeFile('index.html', html, function (err) {
    if (err) console.log(err)
})




const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },

    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
        const queryUrl = `https://api.github.com/users/${github}`;
        let blog;
        let location;
        let followers;
        let following;
        let name;
        let html_url;
        let company;
        let avatar_url;
        let bio;
        let publicRepos;



        axios.get(queryUrl).then(function (res) {

            blog = res.data.bio;
            location = res.data.location;
            followers = res.data.followers;
            following = res.data.following;
            name = res.data.name;
            html_url = res.data.html_url;
            company = res.data.company
            avatar_url = res.data.avatar_url
            bio = res.data.bio
            publicRepos = data.public_repos

            html = createHTML({
                title: 'example',
                body: `<div class="wrapper">
                <div class="photo-header">
                   <img src="${avatar_url}" alt="Photo of ${name}" />
                   <h1>Hi!</h1>
                   <h2>
                   My name is ${name}!</h1>
                   <h5>${company ? `Currently @ ${company}` : ""}</h5>
                   <nav class="links-nav">
                      ${
                    location
                        ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${
                        location
                        }"><i class="fas fa-location-arrow"></i> ${
                        location
                        }</a>`
                        : ""
                    }
                      <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
                    html_url
                    }"><i class="fab fa-github-alt"></i> GitHub</a>
                      ${
                    blog
                        ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
                        blog
                        }"><i class="fas fa-rss"></i> Blog</a>`
                        : ""
                    }
                   </nav>
                </div>
                <main>
                   <div class="container">
                   <div class="row">
                      <div class="col">
                         <h3>${bio ? `${bio}` : ""}</h3>
                      </div>
                      </div>
                      <div class="row">
                      <div class="col">
                         <div class="card">
                           <h3>Public Repositories</h3>
                           <h4>${public_repos}</h4>
                         </div>
                      </div>
                       <div class="col">
                       <div class="card">
                         <h3>Followers</h3>
                         <h4>${followers}</h4>
                       </div>
                      </div>
                      </div>
                      <div class="row">
                      <div class="col">
                      <div class="card">
                         <h3>GitHub Stars</h3>
                         <h4>${stars}</h4>
                         </div>
                      </div>
                       <div class="col">
                       <div class="card">
                         <h3>Following</h3>
                         <h4>${following}</h4>
                         </div>
                      </div>
                      </div>
                   </div>
                </main>
             </div>`
            })

            fs.writeFile('index.html', html, function (err) {
                if (err) console.log(err)
            })



        });


    })
}

init();