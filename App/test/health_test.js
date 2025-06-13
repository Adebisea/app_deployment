import assert from "assert";
import http from "http";
import app from "../app.js"; 

let server;

before((done) => {
  server = app.listen(3000, done);
});

after((done) => {
  server.close(done);
});

describe("GET /health", () => {
  it("200 OK: Server is up", (done) => {
    http.get("http://localhost:3000/health", (res) => {
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  });
});
