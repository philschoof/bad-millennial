'use strict';

const app = require('../app-data');
const ui = require('./ui');



//User CRUD
const signUp = (success, failure, data) => {
  console.log("API", data);
  $.ajax({
    method: "POST",
    url: app.api.api + 'sign-up',
    data,
  })
  .done(success, data)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  console.log("API", data);
  $.ajax({
    method: "POST",
    url: app.api.api + 'sign-in',
    data,
  })
  .done(success, data)
  .fail(failure);
};

const changePassword = (success, failure, data) => {
  $.ajax({
    method: "PATCH",
    url: app.api.api + 'change-password/' + app.currentUser.id,
    data: {
      'passwords': {
        'old': data.pw_creds.old,
        'new': data.pw_creds.new
      }
    },
    headers: {
      contentType: "application.json",
      Authorization: "Token token=" + app.currentUser.token
    },
  }).done(success)
  .fail(failure);
};

const signOut = (success, failure) => {
  $.ajax({
    method: "DELETE",
    url: app.api.api + 'sign-out/' + app.currentUser.id,
    headers: {
      Authorization: 'Token token=' + app.currentUser.token
    },
  }).done(success)
  .fail(failure);
};


//word crud

const searchWord = (success, failure, word) => {
  console.log('search word ' + word)
  $.ajax({
    method: "GET",
    url: app.api.urbanDictionary + word,

  headers: {
    'X-Mashape-Key': 'DYCnJzm8P0mshSkYdIPXX1kBHZiyp1yEsykjsnkkOg1bcnZnc8'
  },
}).done(success)
  .fail(failure);
};



//deleteWord is in authApi





module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  searchWord
};
