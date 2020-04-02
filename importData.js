let Knex = require('knex');
let { Model } = require('objection');
let dbConfig = require('./knexfile');

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

let knex = Knex(dbConfig[process.env.NODE_ENV]);

Model.knex(knex);
let getData = require('./research/getData');
let Covid = require('./models/covid');

let covidInfo = getData('./data/states.json');

// SELECT id, superhero_id FROM heroes;
// superhero_id => id

async function importData(data) {
  return await Covid.query().insertGraph(data.map((covidData) => {
    return {
      state: covidData.state,
      positive: covidData.positive,
      negative: covidData.negative,
    };
  }));

  await knex.destroy();
}

importData(covidInfo);
