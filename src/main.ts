import './styles/global.css';
import { menuButtons } from './components/buttonManager';
import { setCanvas, loadAllCategory } from './components/menuManager';

// DOM 생성
document.querySelector<HTMLDivElement>('#roulette')!.innerHTML = `
  <div id="roulette-container" class="roulette-container">
    <button class="btn-pointer"></button>
    <canvas id="roulette-canvas" width="500" height="500"></canvas>
  </div>
`;

const canvas = document.getElementById('roulette-canvas') as HTMLCanvasElement;
setCanvas(canvas);

// 카카오 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
}

console.log(window.Kakao.isInitialized());

// 버튼 바인딩
menuButtons();

// 메뉴 초기 로딩
loadAllCategory(); // 추가해줘야 첫 메뉴가 바로 보임
