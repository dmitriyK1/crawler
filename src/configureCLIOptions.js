const program = require('commander');

const DEFAULT_URL_DEPTH = 2;

program
  .option('-D, --depth <number>', 'link depth', DEFAULT_URL_DEPTH)
  .parse();
