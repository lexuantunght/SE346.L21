const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');

exports.chatbot = (req, res) => {
    if (req.body.queryResult.parameters.account_information == "contact number"
    && req.body.queryResult.parameters.account_information) {
    var speech = "999999999";
  }
  else if (req.body.queryResult.parameters.account_information == "account number"
    && req.body.queryResult.parameters.account_information) {
    var speech = "9999999999999";
  }
  else if (req.body.queryResult.parameters.account_information == "DOB"
    && req.body.queryResult.parameters.account_information) {
    var speech = "1 Jan 2019";
  }
  else if (req.body.queryResult.parameters.account_information == "address"
    && req.body.queryResult.parameters.account_information) {
    var speech = " floor no 1 , Building no 1 , address";
  }
 
  return res.json({
    fulfillmentText: "fulfillmentText",
    fulfillmentMessages: [{
      simpleResponses: {
        simpleResponses: [{
          "textToSpeech": "textToSpeech",
          "displayText": speech
        }]
      }
    }],
    source: "webhook-sample"
  });
}
