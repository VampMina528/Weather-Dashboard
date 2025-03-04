# Weather Dashboard

## Description

The Weather Dashboard is a web application that allows users to retrieve and display weather data for multiple cities using the OpenWeather API. The application provides current and future weather conditions, storing search history for quick access to previously searched cities. The backend is built using Node.js and stores search history in a `searchHistory.json` file.

## Features

- Search for a city's weather conditions
- View the current weather details including:
  - City name
  - Date
  - Weather icon and description
  - Temperature
  - Humidity
  - Wind speed
- View a 5-day weather forecast including:
  - Date
  - Weather icon
  - Temperature
  - Wind speed
  - Humidity
- Click on a previously searched city to view its weather conditions again
- Stores search history in a JSON file

## Technologies Used

- Node.js
- Express.js
- OpenWeather API
- File System (`fs` module)
- Render (for deployment)

## Installation

1. Clone the repository:
  
   git clone <repository-url>
  
2. Navigate to the project directory:
  
   cd weather-dashboard

3. Install dependencies:

   npm install
  
4. Create a `.env` file and add your OpenWeather API key:
  
   API_KEY=your_openweather_api_key
   ```
5. Start the server:

   npm start
  

## API Routes

### HTML Route
- `GET *` - Serves the `index.html` file

### API Routes
- `GET /api/weather/history` - Retrieves all saved cities from `searchHistory.json`
- `POST /api/weather` - Saves a new city in `searchHistory.json` and fetches weather data
- `DELETE /api/weather/history/:id` (Bonus) - Deletes a city from search history by its unique ID

## Deployment

You can access it here: [Live Application](http://localhost:3001/)

## Screenshots

![Weather Dashboard Preview](Located in Assets file - Coming soon)

## Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, reach out via GitHub: [GitHub Repository](https://github.com/VampMina528/Weather-Dashboard)

