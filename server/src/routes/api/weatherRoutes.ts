import { Router, Request, Response } from 'express';
import HistoryService from '../../../src/service/historyService.js';
import WeatherService from '../../../src/service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data and save it to history
router.post('/', async (req: Request, res: Response) => {
    const { cityName } = req.body;

    if (!cityName) {
        return res.status(400).json({ error: 'City name is required.' });
    }

    try {
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        await HistoryService.addCity(cityName);
        return res.json(weatherData);
    } catch (err) {
        console.error('Weather data fetch error', err);
        return res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
<<<<<<< HEAD
try {
  const cities = await HistoryService.getCities()
res.json(cities)
} catch (err) {
console.error('Error', err)
res.status(500).send({ err: 'This city has not been added to History'})
}
=======
    try {
        const cities = await HistoryService.getCities();
        return res.json(cities);
    } catch (err) {
        console.error('Error fetching history', err);
        return res.status(500).json({ error: 'Failed to retrieve search history.' });
    }
>>>>>>> master
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
<<<<<<< HEAD
const { id } = req.params
try {
  await HistoryService.removeCity(id)
  res.status(204).send('City deleted')
} catch (err){
  console.error ('City not deleted:', err)
  res.status(500).send({ err: 'City not deleted'})
}
=======
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'City ID is required.' });
    }

    try {
        await HistoryService.removeCity(id);
        return res.status(200).json({ message: 'City deleted successfully.' });
    } catch (err) {
        console.error('City not deleted:', err);
        return res.status(500).json({ error: 'Failed to delete city from history.' });
    }
>>>>>>> master
});

export default router;
