import { mixMenu, addMenu, resetMenu, handleSpin, loadCategory, setCurrentCategory } from './menuManager';
import { WeatherFoodRecommender } from './weatherFoodRecommender';

const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const weatherRecommender = new WeatherFoodRecommender(OPENWEATHER_API_KEY);

export function menuButtons() {
  const categories = ['korean', 'chinese', 'japanese', 'western', 'snack', 'dessert']; // 카테고리 목록
  const mixBtn = document.querySelector('#mixMenu'); // 메뉴 섞기 버튼
  const addBtn = document.querySelector('#addMenu'); // 메뉴 추가 버튼
  const resetBtn = document.querySelector('#resetMenu'); // 메뉴 초기화 버튼
  const weatherBtn = document.querySelector('#weather'); // 날씨별 추천 버튼
  const spinBtn = document.querySelector('#spin') as HTMLButtonElement; // 룰렛 돌리기 버튼
  const canvas = document.querySelector('#roulette-canvas') as HTMLCanvasElement; // 룰렛 캔버스

  mixBtn?.addEventListener('click', () => mixMenu());
  addBtn?.addEventListener('click', () => addMenu());
  resetBtn?.addEventListener('click', () => resetMenu());
  weatherBtn?.addEventListener('click', () => weatherRecommender.recommendFoodByCurrentLocation());
  spinBtn?.addEventListener('click', () => handleSpin(canvas, spinBtn));
  categories.forEach(category => {
    document.getElementById(`category-${category}`)?.addEventListener('click', () => {
      loadCategory(category);
      setCurrentCategory(category);
    });
  });
}
