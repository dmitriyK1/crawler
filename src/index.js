require('./configureCLIOptions');
const program = require('commander');
const chalk = require('chalk');

const { logResults, enforceHttpsUrl } = require('./utils');
const { getMatchesByLink } = require('./parser');

const startLink = enforceHttpsUrl(program.args[0]);

async function init() {
  console.log(chalk.green('Working...'));

  const matchesByLink = await getMatchesByLink(startLink);
  logResults(matchesByLink);
}

init().catch(console.log);
