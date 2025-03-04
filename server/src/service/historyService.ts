import fs from 'fs-extra';

class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {
  private path: string = './db/searchHistory.json';

  private async read(): Promise<City[]> {
    try {
      if (!await fs.pathExists(this.path)) {
        return [];
      }
      const data = await fs.readJson(this.path);
      return data as City[];
    } catch (err) {
      console.error('Error reading history file:', err);
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeJson(this.path, cities, { spaces: 2 });
      console.log('History updated successfully');
    } catch (err) {
      console.error('Error writing to history file:', err);
    }
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(cityName: string): Promise<void> {
    try {
      const cities = await this.getCities();
      const newCity = new City(cityName, `${Date.now()}`);
      cities.push(newCity);
      await this.write(cities);
    } catch (err) {
      console.error('Error adding city:', err);
    }
  }

  async removeCity(id: string): Promise<void> {
    try {
      const cities = await this.getCities();
      const updatedCities = cities.filter(city => city.id !== id);

      if (updatedCities.length === cities.length) {
        console.warn('City not found:', id);
      } else {
        await this.write(updatedCities);
        console.log('City removed successfully');
      }
    } catch (err) {
      console.error('Error removing city:', err);
    }
  }
}

<<<<<<< HEAD
export default new HistoryService(
  // process.env.API_BASE_URL
  // process.env.API_KEY
);

=======
export default new HistoryService();
>>>>>>> master
