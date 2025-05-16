import { menuList } from '../data/menuList';
import { drawRoulette } from './RouletteWheel.ts';
import { spinRoulette } from './RouletteWheel.ts';
import { openModal } from './Modal.ts';
import { menuButtons } from './buttonManager.ts';

let canvas: HTMLCanvasElement;

let currentMenu: string[] = [];
// 현재 카테고리 저장용
let currentCategory: keyof typeof menuList;

const spinButton = document.querySelector('#spin') as HTMLButtonElement;

export function setCurrentMenu(menu: string[]) {
  currentMenu = menu;
}

// 메뉴 리스트 출력하는 함수
export function renderMenu() {
  const ul = document.getElementById('menu-entries');
  if (!ul) return;
  ul.innerHTML = '';

  currentMenu.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'menu-item';

    // li 안에 .input-wrapper 구조를 넣음
    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'menu-input';
    input.placeholder = '메뉴 입력';
    input.value = item;

    const clearBtn = document.createElement('button');
    clearBtn.className = 'input-remove';
    clearBtn.type = 'button';
    clearBtn.innerText = 'x';
    clearBtn.setAttribute('aria-label', '입력 지우기');

    // input 수정 동기화
    input.addEventListener('input', e => {
      const target = e.target as HTMLInputElement;
      currentMenu[index] = target.value;
      drawRoulette(canvas, currentMenu);
    });

    // x 버튼 클릭 해당 input삭제
    clearBtn.addEventListener('click', () => {
      if (currentMenu.length <= 2) {
        alert('메뉴는 최소 2개 이상이어야 합니다.');
        return;
      }
      currentMenu.splice(index, 1);
      renderMenu();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(clearBtn);
    li.appendChild(wrapper);
    ul.appendChild(li);
  });

  // 룰렛 그리기
  drawRoulette(canvas, currentMenu);
  setCurrentMenu(currentMenu);
}

// 카테고리 메뉴를 랜덤으로 8개선택
function loadCategory(category: keyof typeof menuList) {
  const list = menuList[category];
  if (!list) return;

  currentCategory = category;

  currentMenu = shuffle(list).slice(0, 8);

  renderMenu();
}

// 배열 무작위로 섞는 함수
export function shuffle<T>(array: T[]): T[] {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

// 메뉴섞기 버튼
export function mixMenu() {
  if (!currentCategory) return; // 아무 카테고리도 선택 안 된 상태라면 무시

  const list = menuList[currentCategory];
  const newMenu = shuffle(list).slice(0, currentMenu.length);

  for (let i = 0; i < currentMenu.length; i++) {
    currentMenu[i] = newMenu[i] || '';
  }

  renderMenu();
}

// 추가 버튼
export function addMenu() {
  currentMenu.push('');
  if (currentMenu.length >= 20) {
    alert('메뉴는 최대 20개까지 추가할 수 있습니다.');
    return;
  }
  renderMenu();
}

// 초기화 버튼
export function resetMenu() {
  // currentMenu 내부의 텍스트만 모두 빈 문자열로 바꿈
  currentMenu = currentMenu.map(() => '');
  renderMenu();
}

window.addEventListener('DOMContentLoaded', () => {
  // 룰렛
  canvas = document.getElementById('roulette-canvas') as HTMLCanvasElement;

  if (currentMenu.length === 0) {
    currentMenu = Array(8).fill('');
    renderMenu();
  }

  const categoryButtons = document.querySelectorAll('.category-button');

  for (let i = 0; i < categoryButtons.length; i++) {
    const btn = categoryButtons[i] as HTMLElement;
    btn.addEventListener('click', function (this: HTMLElement) {
      // 버튼 클릭 해제
      for (let j = 0; j < categoryButtons.length; j++) {
        (categoryButtons[j] as HTMLElement).classList.remove('active');
      }
      // active 추가
      this.classList.add('active');
    });
  }

  document.getElementById('category-korean')?.addEventListener('click', () => {
    loadCategory('korean');
    currentCategory = 'korean';
  });

  document.getElementById('category-chinese')?.addEventListener('click', () => {
    loadCategory('chinese');
    currentCategory = 'chinese';
  });

  document.getElementById('category-japanese')?.addEventListener('click', () => {
    loadCategory('japanese');
    currentCategory = 'japanese';
  });

  document.getElementById('category-western')?.addEventListener('click', () => {
    loadCategory('western');
    currentCategory = 'western';
  });

  document.getElementById('category-snack')?.addEventListener('click', () => {
    loadCategory('snack');
    currentCategory = 'snack';
  });

  document.getElementById('category-dessert')?.addEventListener('click', () => {
    loadCategory('dessert');
    currentCategory = 'dessert';
  });

  // 룰렛 돌리기 버튼
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
      const selectedMenu = currentMenu[selectedIndex];
      openModal(selectedMenu, menuList[currentCategory].indexOf(selectedMenu) + 1, currentCategory);
      canvas.removeEventListener('transitionend', handler);
      spinButton.disabled = false;
    });
  });
});

menuButtons();
