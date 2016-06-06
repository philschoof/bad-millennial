'use strict';


//currentUser object set on successful sign-in
let currentUser = {
  token:'',
  id: undefined,
  username: undefined
};

const signUpSuccess = () => {
  console.log('signed-up');
};

const signInSuccess = (data) => {
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  currentUser.username = data.user.username;
  console.log('signed-in');
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
  currentUser,
  failure
};
