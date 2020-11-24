"use strict";
const https = require("https");
const utils = require("@uoa/utilities");
const { v4: uuidv4 } = require("uuid");

module.exports.main = async (event) => {
  // console.log(`Received event: \n ${JSON.stringify(event, null, 2)}`);

  // POST Request Handler (search query)
  if (event.httpMethod === "POST" && event.body) {

    try {
      console.log('Making request to Elastic');
      let req = {
        _source: {
          includes: [
            "fields.slug",
            "fields.title",
            "fields.summary",
            "fields.ssoProtected"
          ]
        },
          query: { 
            simple_query_string: {
              query: 'weapon~2'
            }
          }
        };
      await getRes(req)
        .then(res => res.hits.hits)
        .then(x => console.log(JSON.stringify(x, null, 2)))

    } catch(e){console.error(e) }


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

  /******************* */
  async function getRes(data = null) {
    const options = {
      method: data ? "POST" : "GET",
      hostname: '6436fa2b0fdd4163bbfd2ea48a8bfd4d.ap-southeast-2.aws.found.io',
      port: 9243,
      path: '/_search/',
      headers: {
        "Authorization": "Basic " + process.env.ELASTICSEARCH_API_KEY,
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      let request = https.request(options, (res) => {
        res.setEncoding("utf8");
        let body = "";

        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
        res.on("error", (e) => reject(e));
      });
      request.write(JSON.stringify(data));
      request.end();
    });
  }
};
