import './styles/global.css';
import { menuButtons } from './components/buttonManager';

// DOM 생성
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="roulette-container" class="roulette-container">
    <button class="btn-pointer"></button>
    <canvas id="roulette-canvas" width="500" height="500"></canvas>
  </div>
`;

menuButtons();
