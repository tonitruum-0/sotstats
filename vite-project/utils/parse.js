import '../style.css';

import { Commendation } from './commendation.js';
import { data } from './data.js';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let all = [];
let sortedAll = [];
let fishing = {
  splashtail: {
    ruby: { delivered: 0, required: 50 },
    sunny: { delivered: 0, required: 50 },
    indigo: { delivered: 0, required: 50 },
    umber: { delivered: 0, required: 10 },
    seafoam: { delivered: 0, required: 50 },
  },
  plentifin: {
    olive: { delivered: 0, required: 50 },
    amber: { delivered: 0, required: 50 },
    cloudy: { delivered: 0, required: 50 },
    bonedust: { delivered: 0, required: 10 },
    watery: { delivered: 0, required: 50 },
  },
  ancientscale: {
    almond: { delivered: 0, required: 50 },
    sapphire: { delivered: 0, required: 50 },
    smoke: { delivered: 0, required: 50 },
    bone: { delivered: 0, required: 10 },
    starshine: { delivered: 0, required: 50 },
  },
  wildsplash: {
    russet: { delivered: 0, required: 50 },
    sandy: { delivered: 0, required: 50 },
    ocean: { delivered: 0, required: 50 },
    muddy: { delivered: 0, required: 10 },
    coral: { delivered: 0, required: 50 },
  },
  devilfish: {
    ashen: { delivered: 0, required: 50 },
    seashell: { delivered: 0, required: 50 },
    lava: { delivered: 0, required: 50 },
    forsaken: { delivered: 0, required: 10 },
    firelight: { delivered: 0, required: 50 },
  },
  islehopper: {
    stone: { delivered: 0, required: 50 },
    moss: { delivered: 0, required: 50 },
    raven: { delivered: 0, required: 10 },
    honey: { delivered: 0, required: 50 },
    amethyst: { delivered: 0, required: 50 },
  },
  pondie: {
    charcoal: { delivered: 0, required: 50 },
    orchid: { delivered: 0, required: 50 },
    bronze: { delivered: 0, required: 50 },
    bright: { delivered: 0, required: 10 },
    moonsky: { delivered: 0, required: 50 },
  },
  battlegill: {
    jade: { delivered: 0, required: 50 },
    sky: { delivered: 0, required: 50 },
    rum: { delivered: 0, required: 50 },
    sand: { delivered: 0, required: 10 },
    bittersweet: { delivered: 0, required: 50 },
  },
  stormfish: {
    ancient: { delivered: 0, required: 50 },
    shores: { delivered: 0, required: 50 },
    wild: { delivered: 0, required: 50 },
    shadow: { delivered: 0, required: 10 },
    twilight: { delivered: 0, required: 50 },
  },
  wrecker: {
    rose: { delivered: 0, required: 50 },
    sun: { delivered: 0, required: 50 },
    blackcloud: { delivered: 0, required: 50 },
    snow: { delivered: 0, required: 10 },
    moon: { delivered: 0, required: 50 },
  },
  cooking: {
    chicken: { delivered: 0, required: 50 },
    pork: { delivered: 0, required: 50 },
    snake: { delivered: 0, required: 50 },
    shark: { delivered: 0, required: 50 },
    megalodon: { delivered: 0, required: 50 },
    kraken: { delivered: 0, required: 50 },
  },
};

let allCategories = {
  AthenasFortune: 'AF',
  HuntersCall: 'HC',
  SeaDogs: 'SD',
  GoldHoarders: 'GH',
  OrderOfSouls: 'OS',
  MerchantAlliance: 'MA',
  CreatorCrew: 'CC',
  BilgeRats: 'BR',
  TallTales: 'TT',
  ReapersBones: 'RB',
  PirateLord: 'PL',
  Flameheart: 'FH',
};

let hardCategories = {
  HuntersCall: 'HC',
  BilgeRats: 'BR',
  TallTales: 'TT',
};

function reloadCommendations() {
  // Make array of all commendations
  Object.keys(allCategories).forEach((category) => {
    // Easy categories that dont have campaigns
    if (!(category in hardCategories)) {
      data[category].Emblems.Emblems.forEach((commendation) => {
        if (commendation.Completed) {
          // all completed commendations have this tag
          // Just fix the grade, value and threshold
          all.push(new Commendation(allCategories[category], commendation.title, commendation.subtitle, commendation.MaxGrade, commendation.MaxGrade, commendation.Threshold == 0 ? 1 : commendation.Value, commendation.Threshold == 0 ? 1 : commendation.Threshold, commendation.image));
          return;
        }
        all.push(new Commendation(allCategories[category], commendation.title, commendation.subtitle, commendation.Grade, commendation.MaxGrade, commendation.Value, commendation.Threshold, commendation.image));
      });
    } else {
      // "Hard" categories that have campaigns (bilge rats, tall tales, hunters call)
      Object.keys(data[category].Campaigns).forEach((campaign) => {
        data[category].Campaigns[campaign].Emblems.forEach((commendation) => {
          if (commendation.Completed) {
            // all completed commendations have this tag
            // Just fix the grade, value and threshold
            all.push(new Commendation(allCategories[category], commendation.title, commendation.subtitle, commendation.MaxGrade, commendation.MaxGrade, commendation.Threshold == 0 ? 1 : commendation.Value, commendation.Threshold == 0 ? 1 : commendation.Threshold, commendation.image));
            return;
          }
          // Otherwise its not completed, so add it normally
          all.push(new Commendation(allCategories[category], commendation.title, commendation.subtitle, commendation.Grade, commendation.MaxGrade, commendation.Value, commendation.Threshold, commendation.image));
        });
      });
    }
  });
  console.log(all);
  /// Do fishing commendations separately

  // Make array of valid fish names
  let fishTypes = [];

  Object.keys(fishing).forEach((type) => {
    Object.keys(fishing[type]).forEach((fish) => {
      fishTypes.push(fish);
    });
  });

  // Check if commendation is a fish and add to fishing array
  Object.keys(data.HuntersCall.Campaigns).forEach((campaign) => {
    data.HuntersCall.Campaigns[campaign].Emblems.forEach((emblem) => {
      let fishFlavor = emblem.title.split(' ')[3];
      if (fishFlavor == undefined) {
        return;
      }

      fishFlavor = fishFlavor.toLowerCase().replace(/[^A-Za-z]/g, '');

      if (!fishTypes.includes(fishFlavor)) {
        return;
      }

      let fishCategory = emblem.title
        .split(' ')[4]
        .toLowerCase()
        .replace(/[^A-Za-z]/g, '');

      if (fishCategory == 'hog') {
        // single value that matches the conditions but doesnt belong
        return;
      }

      // Must be valid fish, so add to correct array
      fishing[fishCategory][fishFlavor].delivered = emblem.Value;
    });
  });

  // Add in the cooking commendations (Not sure if we should keep this)
  fishing['cooking']['chicken'].delivered = data.HuntersCall.Campaigns.cooking.Emblems[0].Value;
  fishing['cooking']['pork'].delivered = data.HuntersCall.Campaigns.cooking.Emblems[1].Value;
  fishing['cooking']['snake'].delivered = data.HuntersCall.Campaigns.cooking.Emblems[2].Value;
  fishing['cooking']['shark'].delivered = data.HuntersCall.Campaigns.cooking.Emblems[3].Value;
  fishing['cooking']['megalodon'].delivered = data.HuntersCall.Campaigns.cooking.Emblems[4].Value;
  fishing['cooking']['kraken'].delivered = data.HuntersCall.Campaigns.cooking.Emblems[5].Value;

  // Create sorted array
  sortedAll = [...all].sort((a, b) => (b.percent > a.percent ? 1 : b.percent < a.percent ? -1 : 0));
}

// Depends on how you are loading the data using pupeteer, call function as needed
reloadCommendations();
console.log(sortedAll);
// Example usage
/*
Object.keys(fishing).forEach((type) => {
	Object.keys(fishing[type]).forEach((fish) => {
		console.log(
			fish +
				": " +
				fishing[type][fish].delivered +
				"/" +
				fishing[type][fish].required
		);
	});
});

sortedAll.forEach((e) => {
	e.print();
});

all.forEach((e) => {
	e.print();
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DISPLAY STUFF - PROBABLY MOVE TO ANOTHER FILE ////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let paginationArr = [];
createArr(false);
function createArr(boolDisplaySorted) {
  let arrayToDisplay = boolDisplaySorted == true ? sortedAll : all;
  paginationArr = arrayToDisplay;
  pagination(paginationArr);
}

let ran = false;
let offset;

window.onscroll = function () {
  if (!ran) {
    offset = document.body.offsetHeight * 0.3;
    ran = true;
  } else {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - document.body.offsetHeight * 0.1) {
      pagination(paginationArr);
    }
  }
};

function pagination(arr) {
  let len;
  if (arr.length < 15) {
    len = arr.length;
  } else {
    len = 15;
  }
  for (let i = 0; i < len; i++) {
    createDOM(arr[i]);
  }
  for (let i = 0; i < len; i++) {
    arr.shift();
  }
}

function createDOM(commendation) {
  let width;
  if (commendation.maxGrade === 1 && commendation.value / commendation.threshold === 1) {
    width = 71;
  } else if (commendation.threshold === 0) {
    width = 0;
  } else {
    width = (commendation.value / commendation.threshold) * 71;
  }

  if (isNaN(width)) {
    console.log(commendation.threshold);
    console.log(commendation);
  }
  document.getElementById('comms').innerHTML += `<div class="item">
       <div class="img-container">
         <button class="button"type="button" value="x">
           <svg id="surround">
             <image class="profile-grid__item-image" clip-path="url(#item-mask)" height="98%" width="98%" x="1%" y="1%" xlink:href="${commendation.image}"></image>
             <use class="surround" xlink:href="#border" height="100%" width="100%"></use>
           </svg>
         </button>
       </div>
       <div class="info-container">
         <div class="title">${commendation.title}</div>
         <div class="progress">
           <svg class="progress-bar" width="73" height="12" viewBox="0 0 73 12" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
             <rect x="1" y="1" width="71" height="10" fill="#323335"></rect>
             <rect x="1" y="1" width="${width}" height="10" fill="#578C85"></rect>
             
           <div class="progress-text">${commendation.value}/${commendation.threshold}</div>
         </div>
         <div class="description">
           <p class="desc-text">Grade ${commendation.grade} - ${commendation.subtitle}</p>
         </div>
       </div>
     </div>`;
}

// Add event listener to dropdown
document.getElementById('displayFilter').addEventListener('change', () => {
  if (document.getElementById('displayFilter').value == 'complete') {
    createDOM(true);
  } else {
    createDOM(false);
  }
});
// if dropdown changed to sort by completion, call createDOM(true)
// else call createDOM(false)

// Also add event listener to the other dropdown, and call onDropdownChange()

function display(filters) {
  // Hide all commendations
  // change each class to display none

  // Show commendations that match the filters
  if (filters.contains('All')) {
    // change all classes to display block/display flex/whatever
  }

  if (filters.contains('Incomplete')) {
    // change "incomplete" class to display block/display flex/whatever
  }

  // etc
}

function onDropdownChange() {
  let filters = [];
  // Add all selected filters to the array
  if (selected == 'All') {
    filters.push('All');
  } else if (selected == 'Incomplete') {
    filters.push('Incomplete');
  }
  // etc
  // Call display function with the required filters
  display(filters);
}
