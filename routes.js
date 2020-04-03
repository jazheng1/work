let Router = require('express-promise-router');
let router = new Router();

let getData = require('./research/getData');
let Covid = require('./models/covid');

let { Client } = require('pg');
const client  = new Client({
  port:3000,
  database: 'covid_development',
});

router.get('/', async(request, response) => {
  let data = getData('./data/state.json')

  console.log(data);

  response.render('index', {data});
});

router.get('/', async(request, response) => {
  let searchTerm = $('#state-selector').change(function() {
  let selectedState = $(this).val();
  let dataId = `state-data-${selectedState.toLowerCase()}`;
  })

  let data = await client.query()
    .where('state', searchTerm);

  response.render('state', { data });
});

module.exports = router;
