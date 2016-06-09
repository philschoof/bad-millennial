'use strict';


const app = require('../app-data');
const api = require('./api');
// const wordApi = require('../word/api');
// const wordUi = require('../word/ui');

const hideShow = function(arr1, arr2) {
  arr1.forEach(function(element){
    $(element).addClass('hidden')
  })
  if (arr2){
    arr2.forEach(function(element){
      $(element).removeClass('hidden')
    })
  }
};


//Random word function

let randWord = [
  "Phubbing",
  "Hundo P",
  "JOMO",
  "I can't even",
  "The struggle is real",
  "Dipset",
  "Bae",
  "V",
  "P"
];

const randomWordFunk = function(randWord){
  let randomIndex = Math.floor(Math.random() * (randWord.length - 1))
  $('.random-word').text(randWord[randomIndex]);
}

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
  console.log(words)
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
  $('.word-error').removeClass('hidden');
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
      word = word.charAt(0).toUpperCase() + word.slice(1);
      event.preventDefault();
      addWord(addWordSuccess, addWordFailure, definition, word)
    })

      };





const searchSuccess = (data) => {
  let returnList = data.list;
  console.log(returnList)
  console.log(returnList.length)
  hideShow(['.word-error', '.word-search-error'])
  let defArr = [];
  if(returnList.length === 0){
    $('.word-search-error').removeClass('hidden');
    console.log('list length 0')
  }else if (returnList.length <= 3){
    console.log('list length less than 3')
    for (let i = 0; i < returnList.length; i++){
      defArr.push(returnList[i].definition)
    }
  }else {
    console.log('list length greater than 3')
    for (let i = 0; i < 3; i++){
      defArr.push(returnList[i].definition)
    }
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
  $('.sign-up-error').addClass('hidden');
};

const signInSuccess = (data) => {
  $('.search-result-display').html('')
  $('.search-word-display').html('');
  $('.sign-in-error').addClass('hidden');
  app.currentUser.token = data.user.token;
  app.currentUser.id = data.user.id;
  console.log(app.currentUser);
  $('body').removeClass('landing-background');
  $('body').addClass('home-background');
  hideShow(['.landing-div', '.navbar-brand', '.landing-buttons'], ['.dropdown-toggle', '.search-word-div', '.dictionary-row']);
  randomWordFunk(randWord);
  getWords();

};

const changePasswordSuccess = () => {
  $('.sign-in-error').addClass('hidden');
  console.log('changed password');
};

const signOutSuccess = () => {
  app.currentUser.token = '';
  app.currentUser.id = undefined;
  $('body').addClass('landing-background')
  $('body').removeClass('home-background')
  hideShow(['.dropdown-toggle', '.search-word-div', '.dictionary-row'], ['.landing-div', '.navbar-brand' , '.landing-buttons']);
  console.log('signed out');
};

const success = () => {
  console.log('success');

}

const signUpFailure = () => {
  $('.sign-up-error').removeClass('hidden');
}

const signInFailure = () => {
  $('.sign-in-error').removeClass('hidden');
}

const changePasswordFailure = () => {
  $('.change-password-error').removeClass('hidden');
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
  signUpFailure,
  signInFailure,
  changePasswordFailure,
  failure
};
