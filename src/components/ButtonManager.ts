import { mixMenu, addMenu, resetMenu, handleSpin, categoryButtons, situationButtons } from './MenuManager';
import { WeatherFoodRecommender } from './WeatherFoodRecommender';

const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_URL;
const weatherRecommender = new WeatherFoodRecommender(OPENWEATHER_API_KEY);

export function menuButtons() {
  const mixBtn = document.querySelector('#mixMenu');
  const addBtn = document.querySelector('#addMenu');
  const resetBtn = document.querySelector('#resetMenu');
  const weatherBtn = document.querySelector('#weather');
  const spinBtn = document.querySelector('#spin') as HTMLButtonElement;
  const canvas = document.querySelector('#roulette-canvas') as HTMLCanvasElement;
  const categories = ['all', 'korean', 'chinese', 'japanese', 'western', 'snack', 'dessert'];
  const situations = ['all', 'solo', 'date', 'company', 'party', 'healthy', 'night'];

  mixBtn?.addEventListener('click', () => mixMenu());
  addBtn?.addEventListener('click', () => addMenu());
  resetBtn?.addEventListener('click', () => resetMenu());
  weatherBtn?.addEventListener('click', () => weatherRecommender.recommendFoodByCurrentLocation());
  spinBtn?.addEventListener('click', () => handleSpin(canvas, spinBtn));

  categoryButtons(categories);
  situationButtons(situations);

  // defualt 값 all로 설정
  document.getElementById('category-all')?.classList.add('active');
  document.getElementById('situation-all')?.classList.add('active');
}
