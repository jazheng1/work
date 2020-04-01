let fs = require('fs');

function getData(file) {
  let text = fs.readFileSync(file, 'utf-8');
  let info = JSON.parse(text);
  // let info = JSON.parse(text);
  // let dataArray = info.results;

  // for (let state in dataArray) {

  //   // state.id = Number(state.id);
  //     if (state.hasOwnProperty()) {
  //       if (state === "null") {
  //         state = null;
  //       } else {
  //         state = Number(state);
  //       }
  //     }
  // }
  return info;
}

if (require.main === module) {
  console.log(getData('../data/states.json'));
}

module.exports = getData;
