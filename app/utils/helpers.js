import axios from 'axios';

var helper = {
  runQuery(searchTerm) {
    console.log("Inside helper");

   var queryURL = `/drinks/${searchTerm}`;
   console.log(queryURL);

  return axios.get(queryURL).then(function(response) {
    if (response) {
      return response;
    }
    return "";
  });
},


};

module.exports = helper;