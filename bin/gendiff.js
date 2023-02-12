#!/usr/bin/env node

import makeDiffString from '../src/index.js';
import { Command } from 'commander';

const program = new Command();

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0')
	.arguments('<filepath1> <filepath2>')
	.option('-f, --format <type>', 'output format', 'json')
	.action((file1, file2, options) => console.log(makeDiffString(file1, file2, options)));
 	program.parse();