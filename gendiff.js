#!/usr/bin/env node

import a from './diffUtil.js';
import { Command } from 'commander';
const program = new Command();
let diff = '';

const parser = (file1, file2, options) => {
	program.parse(['node', 'gendiff.js', file1, file2], options)
		// .action((file1, file2, options) => diff = a(file1, file2, options));
	return diff;
}

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0')
	.arguments('<filepath1> <filepath2>')
	.option('-f, --format <type>', 'output format', 'json')
	.action((file1, file2, options) => diff =a(file1, file2, options));
	if (process.argv.length > 2 ) {
		program.parse();
		console.log(diff);
  }

export default parser;

