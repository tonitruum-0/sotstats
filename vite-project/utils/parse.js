import { data } from './data.js';

let progress;
let used = false;

//document.getElementById('testBtn').addEventListener('click', parse);
document.getElementById('categoryFilter').addEventListener('change', parse);
document.getElementById('displayFilter').addEventListener('change', display);

export function parse(e) {
  progress = [];
  used = false;
  document.getElementById('displayFilter').selectedIndex = 0;
  document.getElementById('comms').innerHTML = '';
  let current = e.target.value;
  let titles = Object.keys(data);

  if (e.target.value === 'All') {
    titles.forEach((title) => {
      //if not campaign
      if (!data[title].Campaigns) {
        parseEmblems(data[title].Emblems.Emblems);
        //if campaign
      } else if (data[title].Campaigns) {
        let campaigns = Object.keys(data[title].Campaigns);
        campaigns.forEach((campaign) => {
          let x = data[title].Campaigns[campaign].Emblems;

          parseEmblems(x);
        });
      }
    });
  } else {
    if (!data[current].Campaigns) {
      parseEmblems(data[current].Emblems.Emblems);
    } else if (data[current].Campaigns) {
      let campaigns = Object.keys(data[current].Campaigns);
      campaigns.forEach((campaign) => {
        parseEmblems(data[current].Campaigns[campaign].Emblems);
      });
    }
  }
}

function parseEmblems(emblemData) {
  emblemData.forEach((item) => {
    if (item.locked === true && item.Threshold === 0) {
      document.getElementById('comms').innerHTML += `<div class="card locked">${item.Description} <span class="grade ">Locked</span></div>`;
    } else if (item.Threshold === 0) {
      document.getElementById('comms').innerHTML += `<div class="card completed">${item.Description} <span class="grade ">Completed</span></div>`;
    } else if (item.MaxGrade === 1) {
      document.getElementById('comms').innerHTML += `<div class="card single-grade">${item.Description} <span class="progress">${item.Value}/${item.Threshold}</span></div>`;
    } else if (eval(item.Grade / item.MaxGrade) === 1) {
      document.getElementById('comms').innerHTML += `<div class="card max-grade">${item.Description} <span class="grade">Grade ${item.Grade}/${item.MaxGrade}</span> <span class="progress">${item.Value}/${item.Threshold}</span></div>`;
    } else {
      //prettier-ignore
      document.getElementById('comms').innerHTML +=`<div class="card">${item.Description} <span class="grade">Grade ${item.Grade}/${item.MaxGrade}</span> <span class="progress">${item.Value}/${item.Threshold}</span></div>`;
    }
  });
}

function display(e) {
  let completeArr = [];
  let incompleteArr = [];
  let closestArr = [];
  //sort all currently displayed cards by closest progress to 1
  if (used === false) {
    progress = document.querySelectorAll('.progress');
    used = true;
  }
  let usedProgress = progress;
  usedProgress.forEach((item) => {
    if (eval(item.outerText) === 1) {
      completeArr.push(item.parentElement);
    } else {
      incompleteArr.push(item.parentElement);
    }
  });
  if (e.target.value === 'complete') {
    document.getElementById('comms').innerHTML = '';
    completeArr.forEach((item) => {
      document.getElementById('comms').appendChild(item);
    });
  } else if (e.target.value === 'incomplete') {
    document.getElementById('comms').innerHTML = '';
    incompleteArr.forEach((item) => {
      document.getElementById('comms').appendChild(item);
    });
  } else if (e.target.value === 'all') {
    document.getElementById('comms').innerHTML = '';
    progress.forEach((item) => {
      document.getElementById('comms').appendChild(item.parentElement);
    });
  } else if (e.target.value === 'closest') {
    //display all cards by closest progress to 1
    document.getElementById('comms').innerHTML = '';
    progress.forEach((item) => {
      //sort progress by closest to 1
      if (eval(item.outerText) < 1) {
        closestArr.push(new closest(eval(item.outerText), item));
      }
    });
    closestArr.sort((a, b) => {
      return b.value - a.value;
    });
    closestArr.forEach((item) => {
      document.getElementById('comms').appendChild(item.element.parentElement);
    });
  }
}

class closest {
  constructor(value, element) {
    this.value = value;
    this.element = element;
  }
}
