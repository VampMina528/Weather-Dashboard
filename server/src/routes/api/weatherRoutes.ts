import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const {cityName} = req.body
  console.log('POST route', req.body, cityName)
  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName)
    res.json(weatherData)
  }catch (err) {
    console.error('Weather data fetch error', err)
    res.status(500).send({err: 'Weather data fetch error'})
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history

  try {
    await HistoryService.addCity(cityName)
  } catch (err) {
    console.error('Error", err')
    res.status(500).send({err: 'This city has not been added to History'})
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
try {
  const cities = await HistoryService.getCities()
res.json(cities)
} catch (err) {
console.error('Error', err)
res.status(500).send({ err: 'This city has not been added to History'})
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
const { id } = req.params
try {
  await HistoryService.removeCity(id)
  res.status(204).send('City deleted')
} catch (err){
  console.error ('City not deleted:', err)
  res.status(500).send({ err: 'City not deleted'})
}
});

export default router;
