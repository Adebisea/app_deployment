import assert from "assert";
import http from "http";
import app from "../app.js";  // adjust path

let server;

before((done) => {
  server = app.listen(3000, done);
});

after((done) => {
  server.close(done);
});

describe("GET /health", () => {
  it("should return 200 OK", (done) => {
    http.get("http://localhost:3000/health", (res) => {
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  });
});
