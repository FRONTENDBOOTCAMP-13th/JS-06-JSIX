import './styles/global.css';
import { menuButtons } from './components/buttonManager';

// DOM 생성
document.querySelector<HTMLDivElement>('#roulette')!.innerHTML = `
  <div id="roulette-container" class="roulette-container">
    <button class="btn-pointer"></button>
    <canvas id="roulette-canvas" width="500" height="500"></canvas>
  </div>
`;

// 카카오 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
}

console.log(window.Kakao.isInitialized());

menuButtons();
