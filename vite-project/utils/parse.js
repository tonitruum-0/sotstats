import { data } from './data.js';

//document.getElementById('testBtn').addEventListener('click', parse);
document.getElementById('categoryFilter').addEventListener('change', parse);

export function parse(e) {
  let current = e.target.value;
  let titles = Object.keys(data);
  if (e.target.value === 'All') {
    titles.forEach((title) => {
      if (!data[title].Campaigns) {
        parseEmblems(title, data[title].Emblems.Emblems, true);
      } else if (data[title].Campaigns) {
        //parseCampaigns(title, data[title].Campaigns, true);
      }
    });
  } else {
    if (!data[current].Campaigns) {
      parseEmblems(current, data[current].Emblems.Emblems, false);
    } else if (data[current].Campaigns) {
      console.log(data[current].Campaigns);

      //parseCampaigns(current, data[current].Emblems.Emblems, false);
    }
  }
}

function parseEmblems(title, emblemData, isAll) {
  if (isAll === true) {
    //emblem data = all commendations in the category - array
    //each item is a separate commendation
    emblemData.forEach((item) => {
      //prettier-ignore
      console.log(`${title}${item.Description}: Grade ${item.Grade}/${item.MaxGrade}, ${item.Value}/${item.Threshold}`);
    });
  } else {
    emblemData.forEach((item) => {
      //prettier-ignore
      console.log(`${title}${item.Description}: Grade ${item.Grade}/${item.MaxGrade}, ${item.Value}/${item.Threshold}`);
    });
  }
}

function parseCampaigns() {
  if (isAll === true) {
    //emblem data = all commendations in the category - array
    //each item is a separate commendation
    emblemData.forEach((item) => {
      //prettier-ignore
      console.log(`${title}${item.Description}: Grade ${item.Grade}/${item.MaxGrade}, ${item.Value}/${item.Threshold}`);
    });
  } else {
    emblemData.forEach((item) => {
      //prettier-ignore
      console.log(`${title}${item.Description}: Grade ${item.Grade}/${item.MaxGrade}, ${item.Value}/${item.Threshold}`);
    });
  }
}
