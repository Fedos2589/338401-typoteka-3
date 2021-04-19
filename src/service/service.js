"use strict";

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode, MAX_COUNT_ERROR_TEXT, CountRestrict} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, count] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
} else if (count > CountRestrict.MAX) {
  console.log(MAX_COUNT_ERROR_TEXT);
  process.exit(ExitCode.success);
} else {
  Cli[userCommand].run(userArguments.slice(1));
}
