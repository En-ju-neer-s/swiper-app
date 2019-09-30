import axios from 'axios';
import { WEATHER_API_KEY } from '../keys';
import { WEATHER_URL } from '../constants';

export const FETCH_WEATHER = 'FETCH_WEATHER';

const URL = WEATHER_URL + `?appid=${WEATHER_API_KEY}`;

export function fetchWeather(city) {
    const url = URL + `&q=${city},nl`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}