const { shell } = require('electron');

let child;

function start() {
  const spawn = require('child_process').spawn;
  child = spawn('node', ['index.js'], { cwd: '../puppeteer' });

  console.log('Puppeteer is running!');
}

function restart() {
  if (child) {
    child.kill('SIGINT');
    child.on('exit', () => {
      start();
    });
  }
}

window.onload = function () {
  document.getElementById('start').addEventListener('click', start);
  document.getElementById('restart').addEventListener('click', restart);
  document.getElementById('link').addEventListener('click', function (event) {
    event.preventDefault();
    shell.openExternal('http://127.0.0.1:5173');
  });
};
