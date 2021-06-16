const assert = require("chai").assert;
import "./main.js";

describe("btnAdd", function() {
    it("if no Price input then it should return a correct warning message", function() {
        assert.equal(btnAdd("",volume), "Price required!");
    });
});