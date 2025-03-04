import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName!: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.apiKey = process.env.API_KEY || '';

    if (!this.apiKey) {
      console.warn('Warning: API_KEY is not set in the environment variables.');
    }
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`Failed to fetch location data. Status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error('Could not fetch location data:', err);
      return null;
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(this.cityName)}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates | null> {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    if (Array.isArray(locationData) && locationData.length > 0) {
      return this.destructureLocationData(locationData[0]);
    } else {
      console.error('Location data is not available.');
      return null;
    }
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error('Error fetching weather data:', err);
      throw new Error('Failed to retrieve weather data.');
    }
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const city = this.cityName;
    const date = new Date(response.list[0].dt * 1000).toLocaleDateString();
    const icon = response.list[0].weather[0].icon;
    const iconDescription = response.list[0].weather[0].description;
    const tempF = (response.list[0].main.temp * 9) / 5 + 32;
    const windSpeed = response.list[0].wind.speed;
    const humidity = response.list[0].main.humidity;

    return new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity);
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = [currentWeather];

    for (let i = 1; i < weatherData.length; i++) {
      forecastArray.push(
        new Weather(
          this.cityName,
          new Date(weatherData[i].dt * 1000).toLocaleDateString(),
          weatherData[i].weather[0].icon,
          weatherData[i].weather[0].description,
          (weatherData[i].main.temp * 9) / 5 + 32,
          weatherData[i].wind.speed,
          weatherData[i].main.humidity
        )
      );
    }
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<{ currentWeather: Weather; forecastArray: Weather[] }> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    if (!coordinates) {
      throw new Error('Coordinates not available.');
    }

    const weatherData = await this.fetchWeatherData(coordinates);
    return {
      currentWeather: this.parseCurrentWeather(weatherData),
      forecastArray: this.buildForecastArray(this.parseCurrentWeather(weatherData), weatherData.list),
    };
  }
}

export default new WeatherService();
