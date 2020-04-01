let Knex = require('knex');
let { Model } = require('objection');
let dbConfig = require('./knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);
let getData = require('./research/getData');
let Covid = require('./models/covid');

let covidInfo = getData('./data/states.json');

// SELECT id, superhero_id FROM heroes;
// superhero_id => id

async function importData(data) {
  return await Covid.query().insertGraph(data.map((covidData) => {
    console.log(covidData.states);
    return {
      state: covidData.state,
      postiive: covidData.postive,
      negative: covidData.negative,
    };
  }));
}

(async () => {
  await importData(covidInfo);
})();
