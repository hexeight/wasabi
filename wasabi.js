#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
  .command('init', 'Initialize wasabi project')
  .command('build', 'Build the contracts')
  .command('deploy', 'Publish contracts to network')
  .command('serve', 'Run app')
  .parse(process.argv);