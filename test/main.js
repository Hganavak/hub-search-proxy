"use strict";
const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("main", "/handler.js", "main");
const fetch = require('node-fetch');
const aws = require('aws-sdk');
const aws4 = require('aws4');
const TIMEOUT_PERIOD = 20000;

let getResBody = async (req) =>
  await wrapped.run(req).then((res) => JSON.parse(res.body));

describe("hub-search-proxy", () => {
  it("POST request returns a response", async function () {
    this.timeout(TIMEOUT_PERIOD);
    const resBody = await getResBody({
      httpMethod: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        comment: "Tread softly because you tread on my dreams",
      },
    });
    expect(resBody).to.contain('hub-search-proxy');
  });
});