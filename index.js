#!/usr/bin/env node

const inquirer = require("inquirer");

const startGui = require("./start-gui");
const processPhotos = require("./process-photos");
const findInFiles = require("./find-in-files");

const tools = [
  { name: "Find in Files", cmd: findInFiles },
  { name: "GUI", cmd: startGui },
  { name: "Process Photos", cmd: processPhotos }
];

const inq = inquirer
  .prompt([
    {
      type: "list",
      message: "Select tool required.",
      name: "tool",
      choices: tools
    }
  ])
  .then(answers =>
    tools.filter(tool => tool.name === answers.tool)[0].cmd({ inquirer })
  );
