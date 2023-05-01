const { shell } = require('electron');
const { exec } = require('child_process');

let child;

function start() {
  const spawn = require('child_process').spawn;
  child = spawn('node', ['index.js'], { cwd: '../puppeteer' });
  navigate();
  alert('Puppeteer is running!');
}

function navigate() {
  exec('cd .. && cd vite-project && npm run dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  console.log('Page is live! http://127.0.0.1:5173/');
}

function restart() {
  const spawn = require('child_process').spawn;
  child = spawn('node', ['index.js'], { cwd: '../puppeteer' });
  alert('Puppeteer is running!');
}

function quit() {
  //code that will close the local server vite opened
  exec('taskkill /F /IM node.exe', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}

window.onload = function () {
  document.getElementById('start').addEventListener('click', start);
  document.getElementById('restart').addEventListener('click', restart);
  document.getElementById('quit').addEventListener('click', quit);
  document.getElementById('link').addEventListener('click', function (event) {
    event.preventDefault();
    shell.openExternal('http://127.0.0.1:5173');
  });
};
