'use strict';

const app = require('../app-data');
const ui = require('./ui');
const authUi = require('../auth/ui');
const authApi = require('../auth/api');



const searchWord = (success, failure, word) => {
  console.log('search word ' + word)
  $.ajax({
    method: "GET",
    url: app.urbanDictionary + word,

  headers: {
    'X-Mashape-Key': 'DYCnJzm8P0mshSkYdIPXX1kBHZiyp1yEsykjsnkkOg1bcnZnc8'
  },
}).done(success)
  .fail(failure);
};



module.exports = {
  searchWord
}
