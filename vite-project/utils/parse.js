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
    let width;
    if (item.MaxGrade === 1 && item.Value / item.Threshold === 1) {
      width = 71;
    } else {
      width = (item.Value / item.Threshold) * 71;
    }
    document.getElementById('comms').innerHTML += `<div class="item">
    <div class="img-container">
      <button class="button"type="button" value="x">
        <svg id="surround">
          <image class="profile-grid__item-background" xlink:href="https://athwsue2-prd-webscript-cdn-endpoint.azureedge.net/98ff6959413c46a6e7cb99d37d4e80aa/assets/profilev2/emblem-no-bg.png" height="98%" width="98%" x="1%" y="1%"></image>
          <image class="profile-grid__item-image" clip-path="url(#item-mask)" height="121" width="120" x="11" y="11" xlink:href="${item.image}"></image>
          <use class="surround" xlink:href="#border" height="100%" width="100%"></use>
        </svg>
      </button>
    </div>
    <div class="info-container">
      <div class="title">${item.DisplayName}</div>
      <div class="progress">
        <svg class="progress-bar" width="73" height="12" viewBox="0 0 73 12" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="71" height="10" fill="#323335"></rect>
          <rect x="1" y="1" width="${width}" height="10" fill="#578C85"></rect>
          <rect class="indicator" x="0" y="0" width="73" height="12" fill="#0F0D09" clip-path="url(#progress-short)"></rect>
        </svg>
        <div class="progress-text">${item.Value}/${item.Threshold}</div>
      </div>
      <div class="description">
        <p class="desc-text">Grade ${item.Grade} - ${item.Description}</p>
      </div>
    </div>
  </div>`;
  });
}

function display(e) {
  let completeArr = [];
  let incompleteArr = [];
  let closestArr = [];
  //sort all currently displayed cards by closest progress to 1
  if (used === false) {
    progress = document.querySelectorAll('.progress-text');
    used = true;
  }
  let usedProgress = progress;
  usedProgress.forEach((item) => {
    if (eval(item.outerText) === 1) {
      completeArr.push(item.parentElement.parentElement.parentElement);
    } else {
      incompleteArr.push(item.parentElement.parentElement.parentElement);
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
      document.getElementById('comms').appendChild(item.parentElement.parentElement.parentElement);
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
      console.log(item.element.parentElement.parentElement.parentElement);
      document.getElementById('comms').appendChild(item.element.parentElement.parentElement.parentElement);
    });
  }
}

class closest {
  constructor(value, element) {
    this.value = value;
    this.element = element;
  }
}
