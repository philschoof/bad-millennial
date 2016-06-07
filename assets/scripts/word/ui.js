'use strict';

const wordApi = require('./api');
const app = require('../app-data');
const authUi = require('.././auth/ui');
const index = require('../index');


const addWord = (success, failure, definition, word) => {
  $.ajax({
    method: "POST",
    url: app.api + "users/" + authUi.currentUser.id +'/words/',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + authUi.currentUser.token
    },
    data: {
      "word": {
        "entry": word,
        "definition": definition
      },
    }
  }).done(success)
    .fail(failure);
};


const displaySearch = (defArr) => {
  let searchDisplayTemplate = require('../templates/search-results.handlebars');
    $('.search-result-display').html(searchDisplayTemplate({
      defArr: defArr
    }));
    //click handler to add word and definition
    $('.word-div').on('click', function(event){
      console.log('word clicked')
      let definition = $(this).text();
      definition = definition.trim();
      console.log(definition)
      let word = $('.search-word-display').text();
      event.preventDefault();
      addWord(addWordSuccess, failure, definition, word)
    });
  };





const searchSuccess = (data) => {
  let returnList = data.list;
  console.log(returnList)
  let defArr = [];
  //build case for less than three words
  for (let i = 0; i < 3; i++){
    defArr.push(returnList[i].definition)
  }
  console.log(defArr);
  displaySearch(defArr)
};

const addWordSuccess = (data) => {
  console.log(data);
  console.log('add word success')
  $('.search-result-display').html('Added to you dyslexicon')
  authUi.getWords();

}

const failure = () => {
  console.log('failure');
};

module.exports = {
  searchSuccess,
  addWordSuccess,
  displaySearch,

  failure
}
