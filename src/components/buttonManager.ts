import { mixMenu, addMenu, resetMenu } from './menuManager';
import { WeatherFoodRecommender } from './weatherFoodRecommender';

const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_URL;
const weatherRecommender = new WeatherFoodRecommender(OPENWEATHER_API_KEY);

export function menuButtons() {
  const mixBtn = document.querySelector('#mixMenu');
  const addBtn = document.querySelector('#addMenu');
  const resetBtn = document.querySelector('#resetMenu');
  const weatherBtn = document.querySelector('#weather');

  mixBtn?.addEventListener('click', () => mixMenu());
  addBtn?.addEventListener('click', () => addMenu());
  resetBtn?.addEventListener('click', () => resetMenu());
  weatherBtn?.addEventListener('click', () => {
    weatherRecommender.recommendFoodByCurrentLocation();
  });
}
