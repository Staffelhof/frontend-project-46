import path from "node:path";
import fs from "node:fs";
import _ from "lodash";

const diff = {};

function isFilenameWithDirectory(filename) {
	const separator = path.sep;
	return filename.includes(separator);
}

function readFile(file) {
	const pathToFile =  isFilenameWithDirectory(file) ? file : path.resolve(process.cwd(), file);
	return fs.readFileSync(pathToFile, "utf8");
}

function findDiffToJson(json1, json2) {
	for (const key of _.sortBy(Object.keys(json1))) {
		if (!json2.hasOwnProperty(key) || json2[key] !== json1[key]) {
			diff[`- ${key}`] = json1[key];
		} else {
			diff[`  ${key}`] = json1[key];
		}
	}
	for (const key of _.sortBy(Object.keys(json2))) {
		if (!json1.hasOwnProperty(key) || json1[key] !== json2[key]) {
			diff[`+ ${key}`] = json2[key];
		} else {
			diff[`  ${key}`] = json2[key];
		}
	}
}

const readFiles = (file1, file2, options) => {
	const f1 = readFile(file1);
	const f2 = readFile(file2);

	const parsed1 = file1.split('.').pop() === 'json' ? JSON.parse(f1) : undefined;
	const parsed2 = file2.split('.').pop() === 'json' ? JSON.parse(f2) : undefined;
	if (options.format === 'json') {
		findDiffToJson(parsed1, parsed2);
	}
}

const genDiff = (filepath1, filepath2, f = 'json') => {
	readFiles(filepath1, filepath2, f)
	return JSON.stringify(diff, null, 2).replaceAll('"', '');
}

export default genDiff;