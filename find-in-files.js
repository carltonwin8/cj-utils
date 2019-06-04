#!/usr/bin/env node
let inquirer = require("inquirer");
const { spawn } = require("child_process");

const msg = "start the gui";

if (require.main === module) getStringAndSearch();

function getStringAndSearch() {
  return inquirer
    .prompt([{ type: "input", message: "Enter string to search", name: "str" }])
    .then(({ str }) => exe(str))
    .catch(e => console.error("Failed running find cli with", e.message));
}

module.exports = ({ inquirer: iIn, getFunctions }) => {
  if (getFunctions)
    return {
      exe: str => exe(str)
    };

  if (iIn) inquirer = iIn;
  return getStringAndSearch();
};

function exe(str) {
  // only reason for 2D below is not to get reformated by pretty
  const findCli2D = [
    ["."],
    ["-name", "node_modules", "-prune", "-o"],
    ["-name", ".git", "-prune", "-o"],
    ["-name", ".build", "-prune", "-o"],
    ["-name", "build", "-prune", "-o"],
    ["-name", ".next", "-prune", "-o"],
    ["-name", "_next", "-prune", "-o"],
    ["-name", "*.js"],
    ["-exec", "grep", "-inH", `${str}`, "{}", ";"]
  ];

  const findCli = findCli2D.reduce((a, i) => [...a, ...i], []);
  const find = spawn("find", findCli, { stdio: "inherit" });
  return find;
}
