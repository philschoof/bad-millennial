'use strict';


const app = require('../app-data');

//currentUser object set on successful sign-in
let currentUser = {
  token:'',
  id: undefined
};

const displayDictionary = (words) => {
  let dictionaryDisplayTemplate = require('../templates/dictionary.handlebars');
  $('.dictionary-display').html(dictionaryDisplayTemplate({
    words:words.words
  }));
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
