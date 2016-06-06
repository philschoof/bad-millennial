'use strict';

const searchSuccess = (data) => {
  console.log(data.list);
};

const failure = () => {
  console.log('failure');
};

module.exports = {
  searchSuccess,
  failure
}
