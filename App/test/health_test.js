import assert from "assert";
import http from "http";
import app from "../app.js"; 

let server;

before((done) => {
  // Ensuring the server starts on port 3000 for the tests
  server = app.listen(3000, done);
});

after((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  
  // Your existing Health Check test
  describe("GET /health", () => {
    it("200 OK: Server is up", (done) => {
      http.get("http://localhost:3000/health", (res) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      });
    });
  });

  // New Metrics Endpoint test
  describe("GET /metrics", () => {
    it("200 OK: Returns Prometheus metrics", (done) => {
      http.get("http://localhost:3000/metrics", (res) => {
        // Verify status code
        assert.strictEqual(res.statusCode, 200);
        
        // Verify the Content-Type header is set correctly for Prometheus
        // Note: prom-client version 15+ uses 'text/plain; version=0.0.4; charset=utf-8'
        assert.ok(res.headers["content-type"].includes("text/plain"));

        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          // Verify that the body actually contains some metrics data
          // Usually, default metrics include 'process_cpu_user_seconds_total'
          assert.ok(data.length > 0);
          done();
        });
      });
    });
  });

});