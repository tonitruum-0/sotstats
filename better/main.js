import './style.css';

import { Commendation } from './commendation';
import { data } from './commendations';

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
          all.push(
            new Commendation(
              allCategories[category],
              commendation.title,
              commendation.subtitle,
              commendation.MaxGrade,
              commendation.MaxGrade,
              commendation.Threshold == 0 ? 1 : commendation.Value,
              commendation.Threshold == 0 ? 1 : commendation.Threshold,
              commendation.image
            )
          );
          return;
        }
        all.push(
          new Commendation(
            allCategories[category],
            commendation.title,
            commendation.subtitle,
            commendation.Grade,
            commendation.MaxGrade,
            commendation.Value,
            commendation.Threshold,
            commendation.image
          )
        );
      });
    } else {
      // "Hard" categories that have campaigns (bilge rats, tall tales, hunters call)
      Object.keys(data[category].Campaigns).forEach((campaign) => {
        data[category].Campaigns[campaign].Emblems.forEach((commendation) => {
          if (commendation.Completed) {
            // all completed commendations have this tag
            // Just fix the grade, value and threshold
            all.push(
              new Commendation(
                allCategories[category],
                commendation.title,
                commendation.subtitle,
                commendation.MaxGrade,
                commendation.MaxGrade,
                commendation.Threshold == 0 ? 1 : commendation.Value,
                commendation.Threshold == 0 ? 1 : commendation.Threshold,
                commendation.image
              )
            );
            return;
          }
          // Otherwise its not completed, so add it normally
          all.push(
            new Commendation(
              allCategories[category],
              commendation.title,
              commendation.subtitle,
              commendation.Grade,
              commendation.MaxGrade,
              commendation.Value,
              commendation.Threshold,
              commendation.image
            )
          );
        });
      });
    }
  });

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
  fishing['cooking']['chicken'].delivered =
    data.HuntersCall.Campaigns.cooking.Emblems[0].Value;
  fishing['cooking']['pork'].delivered =
    data.HuntersCall.Campaigns.cooking.Emblems[1].Value;
  fishing['cooking']['snake'].delivered =
    data.HuntersCall.Campaigns.cooking.Emblems[2].Value;
  fishing['cooking']['shark'].delivered =
    data.HuntersCall.Campaigns.cooking.Emblems[3].Value;
  fishing['cooking']['megalodon'].delivered =
    data.HuntersCall.Campaigns.cooking.Emblems[4].Value;
  fishing['cooking']['kraken'].delivered =
    data.HuntersCall.Campaigns.cooking.Emblems[5].Value;

  // Create sorted array
  sortedAll = [...all].sort((a, b) =>
    b.percent > a.percent ? 1 : b.percent < a.percent ? -1 : 0
  );
}

// Depends on how you are loading the data using pupeteer, call function as needed
reloadCommendations();

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

///////////////////////////////////////////////////
// DISPLAY STUFF - PROBABLY MOVE TO ANOTHER FILE //
///////////////////////////////////////////////////
createDOM(false);
function createDOM(boolDisplaySorted) {
  console.log(sortedAll);
  console.log(all);
  arrayToDisplay = boolDisplaySorted == true ? sortedAll : all;

  arrayToDisplay.forEach((commendation) => {
    console.log(commendation);
    // Do stuff
    // Also make sure to add css classes to the elements using both their tags and the category
    // For example, if the commendation has the tags "Single Grade" and "Complete", and is in the category "Gold Hoarders", the element should have the classes "single-grade complete gold-hoarders"
    // That prev line is made by ai, thats cool af lmao
  });
}

// Add event listener to dropdown
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
