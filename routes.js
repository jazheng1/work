let Router = require('express-promise-router');
let getData = require('./research/getData');
let Covid = require('./models/covid');
let { ValidationError } = require('objection');
let info = require('./research/getData')
let router = new Router();
let raw = require('./data/states.json')
// GET /
router.get('/', async(request, response) => {
  // let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
  let messages = raw;
  response.render('index', { messages });
});

// POST /messages
router.post('/messages', async(request, response) => {
  let message = raw;
  response.render('index', { message});
  let messageBody = request.body.body;
  let messageTime = new Date();

  try {
    await Message.query().insert({
      body: messageBody,
      createdAt: messageTime,
    });

    response.redirect('/');
  } catch(error) {
    if (error instanceof ValidationError) {
      let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
      let errors = error.data;

      response.render('index', { messages, errors });
    } else {
      throw error;
    }
  }
});

module.exports = router;
