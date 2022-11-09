#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const rootPath = process.cwd();

console.log('Running in rootPath:', rootPath);

const gitPath = path.resolve(rootPath, '.git');

let myLibAsDep = !fs.existsSync(gitPath);

const scripts = process.argv.slice(2).join(' ');

if (!scripts) {
  throw new Error('No script was provided.');
}

function main() {
  if (myLibAsDep) {
    console.log('Ignored script:', scripts);
    return;
  }

  const cmdProcess = exec(scripts);

  cmdProcess.stdout.pipe(process.stdout);
  cmdProcess.stderr.pipe(process.stdout);

  cmdProcess.on('exit', function (code) {
    process.exit(code);
  });
}

main();
