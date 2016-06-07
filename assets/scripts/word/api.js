// 'use strict';
//
// const app = require('../app-data');
// const ui = require('./ui');
// const authUi = require('../auth/ui');
// const authApi = require('../auth/api');
//
//
//
// const searchWord = (success, failure, word) => {
//   console.log('search word ' + word)
//   $.ajax({
//     method: "GET",
//     url: app.api.urbanDictionary + word,
//
//   headers: {
//     'X-Mashape-Key': 'DYCnJzm8P0mshSkYdIPXX1kBHZiyp1yEsykjsnkkOg1bcnZnc8'
//   },
// }).done(success)
//   .fail(failure);
// };
//
// const addWord = (success, failure, definition, word) => {
//   $.ajax({
//     method: "POST",
//     url: app.api.api + "users/" + app.currentUser.id +'/words/',
//     dataType: 'json',
//     headers: {
//       Authorization: "Token token=" + app.currentUser.token
//     },
//     data: {
//       "word": {
//         "entry": word,
//         "definition": definition
//       },
//     }
//   }).done(success)
//     .fail(failure);
// };
//
// //deleteWord is in authApi
//
//
// module.exports = {
//   searchWord,
//   addWord
// }
