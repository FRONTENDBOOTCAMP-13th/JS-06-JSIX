import './styles/global.css';
import { menuButtons } from './components/buttonManager';
import { setCanvas, loadAllCategory } from './components/menuManager';
import { createIcons, CloudSun, Shuffle, RotateCw, X } from 'lucide';
import { openParamsModal } from './components/LinkShare';

const canvas = document.getElementById('roulette-canvas') as HTMLCanvasElement;
setCanvas(canvas);

// 카카오 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
}

// 버튼 바인딩
menuButtons();

// 메뉴 초기 로딩
loadAllCategory(); // 추가해줘야 첫 메뉴가 바로 보임

// url 파라미터와 일치하는 모달 띄우기
openParamsModal();

// 아이콘 생성
createIcons({
  icons: {
    CloudSun,
    Shuffle,
    RotateCw,
    X,
  },
  attrs: {
    class: ['icon'],
    stroke: '#fff',
  },
});
