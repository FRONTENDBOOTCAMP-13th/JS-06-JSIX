import { menuList } from '../data/menuList';
import { drawRoulette } from './RouletteWheel.ts';
import { spinRoulette } from './RouletteWheel.ts';
import { openModal } from './Modal.ts';

let canvas: HTMLCanvasElement;
let currentMenu: string[] = [];
let currentCategory: keyof typeof menuList;
let selectedType: string = 'all'; //종류 버튼
let selectedSituation: string = 'all'; // 상황 버튼

export function setCurrentMenu(menu: string[]) {
  // currentMenu 저장소
  currentMenu = menu;
}
export function setCurrentCategory(category: keyof typeof menuList) {
  // 음식 카테고리 저장소
  currentCategory = category;
}
export { currentCategory };

// 동적으로 메뉴 리스트 출력하는 함수
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
export function loadCategory(category: keyof typeof menuList) {
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

// 메뉴 추가 버튼
export function addMenu() {
  currentMenu.push('');
  if (currentMenu.length >= 20) {
    alert('메뉴는 최대 20개까지 추가할 수 있습니다.');
    return;
  }
  renderMenu();
}

// 메뉴 초기화 버튼
export function resetMenu() {
  // currentMenu 내부의 텍스트만 모두 빈 문자열로 바꿈
  currentMenu = currentMenu.map(() => '');
  renderMenu();
}

// 룰렛 돌리기 버튼
export function handleSpin(canvas: HTMLCanvasElement, spinBtn: HTMLButtonElement) {
  if (currentMenu.length < 2 || currentMenu.every(item => item.trim() === '')) {
    alert('메뉴를 입력해주세요.');
    return;
  }
  if (currentMenu.some(item => item.trim() === '')) {
    alert('메뉴를 모두 입력해주세요.');
    return;
  }

  const selectedIndex = spinRoulette(canvas, currentMenu);
  spinBtn.disabled = true;

  canvas.addEventListener('transitionend', function handler() {
    const selectedMenu = currentMenu[selectedIndex];
    const menuIndex = menuList[currentCategory]?.indexOf(selectedMenu) ?? -1;

    openModal(selectedMenu, menuIndex + 1, currentCategory);

    canvas.removeEventListener('transitionend', handler);
    spinBtn.disabled = false;
  });
}

// 현재 선택된 종류와 상황에 맞는 메뉴 로드
export function loadFilteredMenu() {
  // 둘 다 전체인 경우
  if (selectedType === 'all' && selectedSituation === 'all') {
    loadAllCategory();
    return;
  }

  // 종류만 선택된 경우 (예: 한식/전체)
  if (selectedType !== 'all' && selectedSituation === 'all') {
    loadTypeMenus(selectedType);
    return;
  }

  // 상황만 선택된 경우 (예: 전체/데이트)
  if (selectedType === 'all' && selectedSituation !== 'all') {
    loadSituationMenus(selectedSituation);
    return;
  }

  // 둘 다 선택된 경우 (예: 한식/파티)
  const combinedKey = `${selectedType}_${selectedSituation}` as keyof typeof menuList;
  if (combinedKey in menuList) {
    loadCategory(combinedKey);
  } else {
    // 해당 조합이 없는 경우 알림
    alert('해당 조합의 메뉴가 없습니다.');
    // 종류에 맞는 메뉴 로드
    loadTypeMenus(selectedType);
  }
}

// 특정 종류의 모든 메뉴 로드 (예: 한식 전체)
export function loadTypeMenus(type: string) {
  // 해당 종류의 모든 메뉴를 합치기
  let typeMenus: string[] = [];

  // 해당 종류로 시작하는 모든 카테고리의 메뉴 합치기
  for (const key in menuList) {
    if (key.startsWith(`${type}_`)) {
      typeMenus = typeMenus.concat(menuList[key as keyof typeof menuList]);
    }
  }

  // 중복 제거
  const uniqueMenus: string[] = [];
  for (let i = 0; i < typeMenus.length; i++) {
    if (uniqueMenus.indexOf(typeMenus[i]) === -1) {
      uniqueMenus.push(typeMenus[i]);
    }
  }

  // 섞고 8개 선택
  currentMenu = shuffle(uniqueMenus).slice(0, 8);

  // 카테고리 설정 (첫 번째 발견된 카테고리로)
  for (const key in menuList) {
    if (key.startsWith(`${type}_`)) {
      currentCategory = key as keyof typeof menuList;
      break;
    }
  }

  renderMenu();
}

// 특정 상황의 모든 메뉴 로드 (예: 데이트 전체)
export function loadSituationMenus(situation: string) {
  // 해당 상황의 모든 메뉴를 합치기
  let situationMenus: string[] = [];

  // 해당 상황으로 끝나는 모든 카테고리의 메뉴 합치기
  for (const key in menuList) {
    if (key.endsWith(`_${situation}`)) {
      situationMenus = situationMenus.concat(menuList[key as keyof typeof menuList]);
    }
  }

  // 중복 제거
  const uniqueMenus: string[] = [];
  for (let i = 0; i < situationMenus.length; i++) {
    if (uniqueMenus.indexOf(situationMenus[i]) === -1) {
      uniqueMenus.push(situationMenus[i]);
    }
  }

  // 섞고 8개 선택
  currentMenu = shuffle(uniqueMenus).slice(0, 8);

  // 카테고리 설정 (첫 번째 발견된 카테고리로)
  for (const key in menuList) {
    if (key.endsWith(`_${situation}`)) {
      currentCategory = key as keyof typeof menuList;
      break;
    }
  }

  renderMenu();
}

// 전체 카테고리 메뉴 로드
export function loadAllCategory() {
  // 빈 배열 생성
  let allMenus: string[] = [];

  // 모든 카테고리의 메뉴 합치기
  for (const key in menuList) {
    if (Object.prototype.hasOwnProperty.call(menuList, key)) {
      allMenus = allMenus.concat(menuList[key as keyof typeof menuList]);
    }
  }

  // 중복 제거
  const uniqueMenus: string[] = [];
  for (let i = 0; i < allMenus.length; i++) {
    if (uniqueMenus.indexOf(allMenus[i]) === -1) {
      uniqueMenus.push(allMenus[i]);
    }
  }

  // 섞고 8개 선택
  currentMenu = shuffle(uniqueMenus).slice(0, 8);

  // 카테고리 설정 (첫 번째 카테고리로)
  currentCategory = Object.keys(menuList)[0] as keyof typeof menuList;

  renderMenu();
}

// 룰렛 초기화
window.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('roulette-canvas') as HTMLCanvasElement;

  if (currentMenu.length === 0) {
    currentMenu = Array(8).fill('');
    renderMenu();
  }

  // 카테고리(종류) 버튼 이벤트 리스너
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

      // 선택된 종류 저장
      selectedType = this.id.replace('category-', '');

      // 필터링된 메뉴 로드
      loadFilteredMenu();
    });
  }

  // 상황 버튼 이벤트 리스너
  const situationButtons = document.querySelectorAll('.situation-button');
  for (let i = 0; i < situationButtons.length; i++) {
    const btn = situationButtons[i] as HTMLElement;
    btn.addEventListener('click', function (this: HTMLElement) {
      // 버튼 클릭 해제
      for (let j = 0; j < situationButtons.length; j++) {
        (situationButtons[j] as HTMLElement).classList.remove('active');
      }
      // active 추가
      this.classList.add('active');

      // 선택된 상황 저장
      selectedSituation = this.id.replace('situation-', '');

      // 필터링된 메뉴 로드
      loadFilteredMenu();
    });
  }

  // 초기 상태 설정 - 전체 버튼에 active 클래스 추가
  document.getElementById('category-all')?.classList.add('active');
  document.getElementById('situation-all')?.classList.add('active');

  // 초기 메뉴 로드
  loadAllCategory();
});
