#!/usr/bin/env node
var inquirer = require("inquirer");

const msg = "start the gui";

if (require.main === module) exe();

function exe() {
  console.log(msg, "as an exe");
}

module.exports = ({ inquirer: iIn, getFunctions }) => {
  if (getFunctions)
    return {
      startGui: () => console.log("Start gui"),
      sayHi: () => console.log("hi")
    };

  if (iIn) inquirer = iIn;
  console.log(msg, "as a module");
};
