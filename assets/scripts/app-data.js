'use strict';

const api = {
  api:'http://localhost:3000/',
  // api:'https://bad-millennial.herokuapp.com/'
  urbanDictionary:'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' //+term
  };

  //currentUser object set on successful sign-in
  let currentUser = {
    token:'',
    id: undefined
  };

module.exports = {
  api,
  currentUser
};
