const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

var express = require('express');
var router = express.Router();


router.get('/gpt/', async (req, res, next) => {
  let input = "";
  let output = "";
  res.render('gpt', {input,output});
});

router.post('/gpt', async (req, res, next) => {
  const input = "Create an acronym from the word " + req.body.acronym;
  const val = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    temperature: 0,
    max_tokens: 1000,
  });
  let output = val.data.choices[0].text;
  res.render('gpt', {input,output});
});


module.exports = router;