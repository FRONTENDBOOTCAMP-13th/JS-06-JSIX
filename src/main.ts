import './styles/global.css';
import { spinRoulette } from './components/RouletteWheel';

// DOM 생성
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="roulette-container" class="roulette-container">
    <button class="btn-pointer"></button>
    <canvas id="roulette-canvas" width="500" height="500"></canvas>
  </div>
  <button id="spin" class="btn-spin">spin</button>
`;

const canvas = document.querySelector('#roulette-canvas') as HTMLCanvasElement;
const spinButton = document.querySelector('#spin') as HTMLButtonElement;
let currentMenu: string[] = []; // 음식 리스트 저장소

//
export function setCurrentMenu(menu: string[]) {
  currentMenu = menu;
}

spinButton?.addEventListener('click', () => {
  // 메뉴가 2개 미만이거나 모두 비어있을 경우
  if (currentMenu.length < 2 || currentMenu.every(item => item.trim() === '')) {
    alert('메뉴를 입력해주세요.');
    return;
  }
  // currentMenu에 하나라도 빈 칸이 있는 경우
  if (currentMenu.some(item => item.trim() === '')) {
    alert('메뉴를 모두 입력해주세요.');
    return;
  }

  const selectedIndex = spinRoulette(canvas, currentMenu);
  spinButton.disabled = true;

  canvas.addEventListener('transitionend', function handler() {
    alert(currentMenu[selectedIndex]);
    canvas.removeEventListener('transitionend', handler);
    spinButton.disabled = false;
  });
});
