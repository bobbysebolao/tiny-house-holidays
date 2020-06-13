const { execSync } = require("child_process");
require('dotenv').config()

const run = commands => {
    commands.forEach(command => execSync(command, { stdio: "inherit" }));
  };

const CODECOV_TOKEN = process.env.REACT_APP_CODECOV_TOKEN;

run([
// Running codecov uploads the final code coverage report from coverage/final-report
// to codecov.io
`codecov --token=${CODECOV_TOKEN}`,
]);