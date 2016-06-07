'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
const authApi = require('./auth/api');
const wordApi = require('./word/api');
const authUi = require('./auth/ui');
const wordUi = require('./word/ui');
const getFormFields = require('../../lib/get-form-fields');

$('#sign-up').on('submit', function (event){
  let data = getFormFields(this);
  console.log(data, 'sign-up submitted');
  event.preventDefault();
  authApi.signUp(authUi.signUpSuccess, authUi.failure, data);
});

$('#sign-in').on('submit', function (event){
  let data = getFormFields(this);
  console.log(data, 'sign-in submitted');
  event.preventDefault();
  authApi.signIn(authUi.signInSuccess, authUi.failure, data);
});

$('#change-password').on('submit', function(event){
  let data = getFormFields(this);
  console.log('change password submitted');
  event.preventDefault();
  authApi.changePassword(authUi.changePasswordSuccess, authUi.failure, data);
});

$('#sign-out').on('click', function(event){
  event.preventDefault();
  authApi.signOut(authUi.signOutSuccess, authUi.failure);
});

let word = '';

$('#search-word').on('submit', function(event, word){
  event.preventDefault();
  word = $('#wordInput').val();
  $('.search-word-display').html(word);
  console.log(word);
  wordApi.searchWord(wordUi.searchSuccess, wordUi.failure, word);
})



module.exports = {
  word
}
