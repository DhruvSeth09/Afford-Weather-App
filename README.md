# Weather App Server
Deployment link (https://weather-frontend-pearl.vercel.app/)
## Overview
The Weather App Server is a Node.js application that provides weather data and search history functionality. It utilizes Express for routing, Mongoose for MongoDB interactions, and Axios for making API requests to external weather services.

## Features
- Fetch current weather data for a specified city.
- Get weather forecasts for the next five days.
- Suggest cities based on user input.
- Store and retrieve search history.

## Technologies Used
- Node.js
- Express
- Mongoose
- Axios
- dotenv
- CORS

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and API keys:
   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   OPENWEATHER_API_KEY=<your-openweather-api-key>
   GEODB_API_KEY=<your-geodb-api-key>
   ```

## Running the Server
To start the server, use the following command:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

## API Endpoints
### Weather
- **GET /weather**: Fetch current weather data for a city.
  - Query parameter: `city` (required)
  
- **GET /weather/suggestions**: Get city suggestions based on a query.
  - Query parameter: `q` (required)

### History
- **GET /history**: Retrieve the last 10 searched cities.

## Database
The application uses MongoDB to store search history. Each search entry includes the city name and a timestamp.
