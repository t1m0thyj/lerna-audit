const core = require("@actions/core");
const exec = require("@actions/exec");

async function execAndReturnOutput(command) {
  let capturedOutput = "";
  const options = {
    listeners: {
      stdout: (data) => {
        capturedOutput += data.toString();
      }
    }
  }
  await exec.exec(command, undefined, options);
  return capturedOutput;
}

(async () => {
  const lernaPkgNames = (await execAndReturnOutput("npx lerna list --loglevel silent")).trim().split("\n");
  const npmAuditArgs = core.getInput("npm-audit-args");
  await exec.exec(`npx lerna exec -- node ${__dirname}/preaudit.js ${lernaPkgNames.join(' ')}`);
  if (core.getInput("include-root") === "true") {
    await exec.exec(`npm audit ${npmAuditArgs}`);
  }
  await exec.exec(`npx lerna exec -- npm audit ${npmAuditArgs}`);
  await exec.exec("git reset --hard");
})().catch((error) => {
  core.setFailed(error.message);
})
