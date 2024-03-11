# Measure Protocol

Measure Protocol is a Node.js library designed to simplify integration with Google Analytics 4 (GA4) through the Measurement Protocol. It enables the straightforward sending of custom event data to GA4, ideal for Node.js applications requiring robust data analysis.

## Installation

To install the library, use npm or yarn by running one of the following commands in your terminal:

```bash
npm install measure-protocol
```

ou

```bash
yarn add measure-protocol
```

## Initial Setup

To start using the Measure Protocol library, first import and configure an instance with your GA4 credentials:

```javascript
const MeasureProtocol = require("measure-protocol"); // Adjust the path as needed

const analytics = new MeasureProtocol({
  debug: true, // Enable debug mode for detailed logs
  measurementId: "YOUR_MEASUREMENT_ID", // Replace with your GA4 Measurement ID
  apiSecret: "YOUR_API_SECRET", // Replace with your GA4 API Secret
});
```

## Basic Usage

Sending a Page View Event
You can send custom events to GA4. Here is an example of how to send a page view event:

```javascript
Copy code
async function sendPageView(clientId, sessionId) {
  const params = {
    page_title: "Homepage",
    page_location: "https://www.example.com",
    page_path: "/",
    engagement_time_msec: 5000, // Engagement time on the page in milliseconds
  };

  try {
    const { clientId, sessionId } = await analytics.fireEvent("page_view", params);
    console.log(clientId, sessionId);
    console.log("Page view event successfully sent.");
  } catch (error) {
    console.error("Error sending page view event:", error);
  }
}

let clientId = null; // Initially null, generate or retrieve as needed
let sessionId = null; // Initially null, generate or retrieve as needed

// Call the function to send an event
sendPageView(clientId, sessionId);
```
