/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */

const { execSync } = require("child_process");
const fs = require("fs-extra");

const REPORTS_FOLDER = "coverage/temp";
const FINAL_OUTPUT_FOLDER = "coverage/final-report";

const run = commands => {
  commands.forEach(command => execSync(command, { stdio: "inherit" }));
};

// Create the coverage/temp folder and move the coverage reports from cypress and jest inside it
fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync(
  "coverage/cypress/coverage-final.json",
  `${REPORTS_FOLDER}/from-cypress.json`
);
fs.copyFileSync(
  "coverage/jest/coverage-final.json",
  `${REPORTS_FOLDER}/from-jest.json`
);

// Create empty .nyc_output folder for the soon-to-be-generated coverage.json file from 'nyc merge'
fs.emptyDirSync("coverage/.nyc_output");
// Create empty 'coverage/final-report' folder for the full coverage report we'll generate with 'nyc report'
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);

// Run "nyc merge" inside 'coverage/temp' folder, merging the cypress and jest coverage json files into one,
// then generate the final report in the 'coverage/final-report' folder
run([
  // "nyc merge" will create a "coverage.json" file on the root, we move it to coverage/.nyc_output
  `nyc merge ${REPORTS_FOLDER} && mv coverage.json ./coverage/.nyc_output/out.json`,
  `nyc report --reporter=json --report-dir ${FINAL_OUTPUT_FOLDER}`
]);