#! /usr/bin/env node
/* eslint-disable no-console */
import { execSync } from 'child_process';
import readline from 'readline';
import { writeFileSync, unlinkSync, rmdirSync } from 'fs';
import path from 'path';

const fireCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('creating amber app');
rl.question("What's the name project? ", (answer) => {
  console.log('create directory ', answer);
  fireCommand(`git clone https://github.com/TirthaAhmadNazuha/my-amber-app.git ${answer}`);
  unlinkSync(`${answer}/package.json`);
  unlinkSync(`${answer}/package-lock.json`);
  rmdirSync(`${answer}/.git`, { recursive: true, force: true });
  writeFileSync(path.resolve(answer, 'package.json'), `{
    "name": "${answer}",
    "version": "0.0.0",
    "description": "",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "keywords": [],
    "author": "",
    "dependencies": {
      "amber": "github:TirthaAhmadNazuha/Amber"
    },
    "devDependencies": {
      "sass": "latest",
      "vite": "latest"
    }
  }`, 'utf-8');
  rl.close();
  console.log(`Done. next command: cd ${answer}\nnpm i && npm run dev`);
  console.log('Thank you!, from Tirtha Ahmad Nazuha.');

  process.exit(1);
});
