"use strict";
const https = require("https");
const utils = require("@uoa/utilities");
const { v4: uuidv4 } = require("uuid");

module.exports.main = async (event) => {
  console.log(`Received event: \n ${JSON.stringify(event, null, 2)}`);

  // POST Request Handler (search query)
  if (event.httpMethod === "POST" && event.body) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Welcome to hub-search-proxy",
        your_request: event.body,
        aws_message: process.env.EXAMPLE_KEY,
      }),
    };
  }

};
