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
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string
  private APIKey?: string
  constructor() {
    this.baseURL = process.env.API_BASE_URL || ''
    this.APIKey = process.env.APIKey || ''
  }
  private cityName!: string;

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query)
      const dataLocation = await response.json()
      console.log('Location:', dataLocation)
      return dataLocation
    } catch (err) {
      console.error('Could not fetch location data:', err)
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    }
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.APIKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forcast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.APIKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery())
    if (Array.isArray(locationData) && locationData.length > 0) {
      return this.destructureLocationData(locationData[0])
    } else {
      console.error('Location data is not available')
      return null
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates))
    const data = await response.json()
    return data
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const city = this.cityName;
    const date = new Date(response.list[0].dt * 1000).toLocaleDateString()
    const icon = response.list[0].weather[0].icon
    const iconDescription = response.list[0].weather[0].iconDescription
    const tempF = ((response.list[0].main.tempF - 273.15) * 9) / 5 + 32
    const windSpeed = response.list[0].main.windSpeed
    const humidity = response.list[0].main.humidity
    return new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity)
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forcastArray = []
    forcastArray.push(currentWeather);

    for (let i = 1; i < weatherData.length; i++) {
      const city = this.cityName;
      const date = new Date(weatherData[i].dt * 1000).toLocaleDateString()
      const icon = weatherData[i].weather[0].icon
      const iconDescription = weatherData[i].weather[0].iconDescription
      const tempF = ((weatherData[i].main.tempF - 273.15) * 9) / 5 + 32
      const windSpeed = weatherData[i].main.windSpeed
      const humidity = weatherData[i].main.humidity
      forcastArray.push(new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity))
    } return forcastArray
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city
    const coordinates = await this.fetchAndDestructureLocationData()
    if (!coordinates) {
      throw new Error('Coordinates not available')
    }
    const weatherData = await this.fetchWeatherData(coordinates)
    const currentWeather = this.parseCurrentWeather(weatherData)
    const forcastArray = this.buildForecastArray(currentWeather, weatherData.list)
    console.log({ currentWeather, forcastArray })
    return { currentWeather, forcastArray }
  }
}

export default new WeatherService();
