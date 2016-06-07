'use strict';


const app = require('../app-data');
const api = require('./api');
// const wordApi = require('../word/api');
// const wordUi = require('../word/ui');


//Word UI

const deleteWord = (success, failure, id) => {
  $.ajax({
    method: "DELETE",
    url: app.api.api + 'words/' + id,
    headers: {
      Authorization: 'Token token=' + app.currentUser.token
    },
  }).done(success)
  .fail(failure)
}


const deleteWordSuccess = () => {
  getWords();
}

const editWord = (success, failure, definition, wordId) => {
  $.ajax({
    method: 'PATCH',
    url: app.api.api + 'words/' + wordId,
    data: {
      "word": {
        "definition": definition.definition
      }
    },
    headers:{
      Authorization: "Token token=" + app.currentUser.token,
    }
  }).done(success)
  .fail(failure);
};




const displayDictionary = (words) => {
  let dictionaryDisplayTemplate = require('../templates/dictionary.handlebars');
  $('.dictionary-display').html(dictionaryDisplayTemplate({
    words:words.words
  }))
  $('.edit-word').on('click', function(event){
    event.preventDefault();
    console.log('edit click')
    $('#editDefinitionModal').modal('show');
    console.log($(this).data('id'));
    let wordId = $(this).data('id');
    $('#edit-definition-form').on('submit', function(event){
      event.preventDefault();
      let definition = getFormFields(this)
      console.log(definition);
      $('#editDefinitionModal').modal('hide');
      editWord(editWordSuccess, failure, definition, wordId);
    })

  })
  $('.delete-word').on('click', function(event){
    event.preventDefault()
    let wordId = $(this).data('id');
    deleteWord(deleteWordSuccess, failure, wordId);
  })
}

const getWords = () => {
  $.ajax({
    method: "GET",
    url:app.api.api + 'users/' + app.currentUser.id + '/words',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + app.currentUser.token
    }
  }).done(function(words){
    console.log('get words success');
    console.log(words);
    displayDictionary(words);

  });
};

const addWord = (success, failure, definition, word) => {
  $.ajax({
    method: "POST",
    url: app.api.api + "users/" + app.currentUser.id +'/words/',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + app.currentUser.token
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

const addWordSuccess = (data) => {
  console.log(data);
  console.log('add word success')
  $('.search-result-display').html('Added to your dyslexicon')
  getWords();
}

const addWordFailure = (data) => {
  $('.search-result-display').html('Cannot add new word')
}


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
      addWord(addWordSuccess, addWordFailure, definition, word)
    })

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

const editWordSuccess = (data) => {
  getWords();
}








//User UI

const signUpSuccess = () => {
  console.log('signed-up');
};

const signInSuccess = (data) => {
  app.currentUser.token = data.user.token;
  app.currentUser.id = data.user.id;
  console.log(app.currentUser);
  getWords();

};

const changePasswordSuccess = () => {
  console.log('changed password');
};

const signOutSuccess = () => {
  app.currentUser.token = '';
  app.currentUser.id = undefined;
  console.log('signed out');
};

const success = () => {
  console.log('success');

}


const failure = () => {
  console.log('failure');
};

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  getWords,
  deleteWord,
  displayDictionary,
  displaySearch,
  searchSuccess,
  addWordSuccess,
  addWordFailure,
  deleteWordSuccess,
  failure
};
