'use strict';


const app = require('../app-data');
const api = require('./api');
const wordApi = require('../word/api');
const wordUi = require('../word/ui');

//currentUser object set on successful sign-in
let currentUser = {
  token:'',
  id: undefined
};

const deleteWord = (success, failure, id) => {
  $.ajax({
    method: "DELETE",
    url: app.api + 'words/' + id,
    headers: {
      Authorization: 'Token token=' + currentUser.token
    },
  }).done(success)
  .fail(failure)
}

const displayDictionary = (words) => {
  let dictionaryDisplayTemplate = require('../templates/dictionary.handlebars');
  $('.dictionary-display').html(dictionaryDisplayTemplate({
    words:words.words
  }))
  // $('.edit-word').on('click', function(event){
  //   event.preventDefault();
  // })
  $('.delete-word').on('click', function(event){
    event.preventDefault()
    let wordId = $(this).data('id');
    deleteWord(wordUi.deleteWordSucces, wordUi.failure, wordId);
  })
}

const getWords = () => {
  $.ajax({
    method: "GET",
    url:app.api + 'users/' + currentUser.id + '/words',
    dataType: 'json',
    headers: {
      Authorization: "Token token=" + currentUser.token
    }
  }).done(function(words){
    console.log('get words success');
    console.log(words);
    displayDictionary(words);

  });
};



const signUpSuccess = () => {
  console.log('signed-up');
};

const signInSuccess = (data) => {
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  console.log(currentUser);
  getWords();

};

const changePasswordSuccess = () => {
  console.log('changed password');
};

const signOutSuccess = () => {
  currentUser.token = '';
  currentUser.id = undefined;
  console.log('signed out');
};


const failure = () => {
  console.log('failure');
};

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  getWords,
  currentUser,
  failure
};
