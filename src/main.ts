import './styles/global.css';
import { menuButtons } from './components/buttonManager';
import { setCanvas, loadAllCategory } from './components/menuManager';
import { createIcons, CloudSun, Shuffle, RotateCw } from 'lucide';

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
// Recommended way, to include only the icons you need.

// 아이콘 생성
createIcons({
  icons: {
    CloudSun,
    Shuffle,
    RotateCw,
  },
  attrs: {
    class: ['icon'],
    stroke: '#fff',
  },
});
