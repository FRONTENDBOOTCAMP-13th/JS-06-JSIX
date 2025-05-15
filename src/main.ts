import './styles/global.css';
import { drawRoulette, spinRoulette } from './components/RouletteWheel.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div id="roulette-container" class="roulette-container">
      <button class="btn-pointer"></button>
      <canvas id="roulette-canvas" width="500" height="500"></canvas>
      </div>
      <button id="spin" class="btn-spin">spin</button>
`;

const canvas = document.querySelector('#roulette-canvas') as HTMLCanvasElement;
const spinButton = document.querySelector('#spin') as HTMLButtonElement;
const food: string[] = ['떡볶이', '돈가스', '초밥', '피자', '냉면', '치킨', '족발', '피자'];

drawRoulette(canvas);
spinButton?.addEventListener('click', function () {
  const selectedIndex = spinRoulette(canvas);

  // 룰렛이 돌아가는 동안에 버튼 비활성화
  spinButton.disabled = true;

  // 회전이 끝나면 결과를 보여줌
  canvas.addEventListener('transitionend', function handler() {
    alert(food[selectedIndex]);
    // transitionend 이벤트 중복 방지
    canvas.removeEventListener('transitionend', handler);
    spinButton.disabled = false;
  });
});
