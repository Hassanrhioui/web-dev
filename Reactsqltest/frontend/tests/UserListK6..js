import http from "k6/http"; // Import the HTTP module for making API requests
import { check, sleep } from "k6"; // Import utilities for assertions and pauses

// Define the load test options
export let options = {
    stages: [
        { duration: "30s", target: 50 }, // Ramp up to 50 virtual users over 30 seconds
        { duration: "1m", target: 50 },  // Keep 50 virtual users active for 1 minute
        { duration: "10s", target: 0 },  // Gradually scale down to 0 users over 10 seconds
    ],
};

/**
 * Default function executed by each virtual user (VU).
  * Each VU runs this function repeatedly during the test.
  */
export default function () {
    // Send a GET request to fetch the list of users
    let res = http.get("http://localhost:3000/users");

    // Validate the response with assertions
    check(res, {
        "status is 200": (r) => r.status === 200, // Ensure the response status is 200 OK
        "response time is < 500ms": (r) => r.timings.duration < 500, // Ensure the request completes in under 500ms
    });

    // Pause for 1 second before the next iteration to simulate real user behavior
    sleep(1);
  }