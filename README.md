# Purrfect creation takehome

## Getting Started

### Prerequisites

Before running the environment you will need to ensure you have the proper api key. The api key will be provided in email, and needs to be plugged into purrfect-creations-api/configs/key.js for the app to work.

### Running the environment

#### Before running Project:
*   npm install inside both build-your-own-api and build-your-own-app folders

#### NOTES ON API
* To run the API use the dev or start script in api package.json
* The api runs on port 5000
* Some api's require a pagination variable, and have the option of passing in the offset key provided by the api to get the next set of orders.
* The endpoints for the backend are as follows:
*   Get all orders by order id: "/api/get-orders/:pagination/:offset?/" 
*   Get all in progress orders: "/api/get-in-progress-orders/:pagination/:offset?/"
*   Get all orders by date: "/api/get-orders-by-date/:pagination/:offset?/"
*   Get total number of in progress orders: "/api/get-total-num-in-progress-orders/"
*   Get a number of recent orders via number parameter: "/api/get-recent-orders/:num"
*   Get total revenue: "/api/get-revenue/"
*   Get total number this month: "/api/orders-this-month/"

#### NOTES ON APP
* To run the APP, make sure the API is running properly then use the start script in api package.json
* App will be running on localhost port 3000
* App does not have pagination implimented, as time was a little short with work and other commitments.
* App also would need test cases implimented using a library like hest and the react testing library.
* Also I feel I could have structured the app a little better. Perhaps loading some of the data from the API's on load to minimize server calls as well as better enhancing the metrics section to include all metrics in one place.
* I wish I could have made better use of the backend API routes's as I was rather ambitious in the ones I built in hope I could make use of them all in the front end.

#### GENERAL NOTES
* Docker ontainer wrapping was left out due to interest of time. 

That should be mostly it, thank you for the opportunity to complete this challenge!