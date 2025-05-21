// ✅ 리팩토링된 menuManager.ts
import { menuList } from '../data/menuList';
import { drawRoulette, spinRoulette } from './RouletteWheel.ts';
import { openModal } from './Modal.ts';
import { updateMenuHistory } from './menuHistory.ts';
import { createElement, X } from 'lucide';

let canvas: HTMLCanvasElement;
let currentMenu: string[] = [];
let currentTypes: string[] = [];
let currentCategory: keyof typeof menuList;
let selectedType: string = 'all';
let selectedSituation: string = 'all';

export function setSelectedType(type: string) {
  selectedType = type;
}
export function setSelectedSituation(situation: string) {
  selectedSituation = situation;
}
export function setCanvas(el: HTMLCanvasElement) {
  canvas = el;
}

export function setCurrentMenu(menu: string[]) {
  currentMenu = menu;
}
export function setCurrentCategory(category: keyof typeof menuList) {
  currentCategory = category;
}
export { currentCategory };

export function renderMenu() {
  const ul = document.getElementById('menu-entries');
  if (!ul) return;
  ul.innerHTML = '';

  currentMenu.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'menu-item';

    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'menu-input';
    input.placeholder = '메뉴 입력';
    input.value = item;

    const clearBtn = document.createElement('button');
    const closeIcon = createElement(X, { class: 'icon' });
    clearBtn.className = 'btn btn-icon';
    clearBtn.type = 'button';
    clearBtn.appendChild(closeIcon);
    clearBtn.setAttribute('aria-label', '입력 지우기');

    input.addEventListener('input', e => {
      const target = e.target as HTMLInputElement;
      currentMenu[index] = target.value;
      drawRoulette(canvas, currentMenu);
    });

    clearBtn.addEventListener('click', () => {
      if (currentMenu.length <= 2) {
        alert('메뉴는 최소 2개 이상이어야 합니다.');
        return;
      }
      currentMenu.splice(index, 1);
      currentTypes.splice(index, 1);
      renderMenu();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(clearBtn);
    li.appendChild(wrapper);
    ul.appendChild(li);
  });

  drawRoulette(canvas, currentMenu);
  setCurrentMenu(currentMenu);
}

export function loadCategory(category: keyof typeof menuList) {
  const list = menuList[category];
  if (!list) return;

  currentCategory = category;

  const count = Math.min(list.length, 8);
  currentMenu = shuffle(list).slice(0, count);
  currentTypes = currentMenu.map(() => category.split('_')[0]);

  renderMenu();
}

export function shuffle<T>(array: T[]): T[] {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

export function mixMenu() {
  const combinedKey = `${selectedType}_${selectedSituation}` as keyof typeof menuList;

  // 둘 다 전체면 전체 목록 섞기
  if (selectedType === 'all' && selectedSituation === 'all') {
    loadAllCategory();
    return;
  }

  // 종류만 선택된 경우
  if (selectedType !== 'all' && selectedSituation === 'all') {
    loadTypeMenus(selectedType);
    return;
  }

  // 상황만 선택된 경우
  if (selectedType === 'all' && selectedSituation !== 'all') {
    loadSituationMenus(selectedSituation);
    return;
  }

  // 종류 + 상황 조합
  if (combinedKey in menuList) {
    loadCategory(combinedKey);
  } else {
    alert('해당 조합의 메뉴가 없습니다.');
  }
}

export function addMenu() {
  currentMenu.push('');
  currentTypes.push('kr');
  if (currentMenu.length >= 20) {
    alert('메뉴는 최대 20개까지 추가할 수 있습니다.');
    return;
  }
  renderMenu();
}

export function resetMenu() {
  currentMenu = currentMenu.map(() => '');
  currentTypes = currentTypes.map(() => '');
  renderMenu();
}

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
    const type = currentTypes[selectedIndex] || 'kr';
    openModal(selectedMenu, `${type}_any`);
    canvas.removeEventListener('transitionend', handler);
    spinBtn.disabled = false;
    updateMenuHistory(selectedMenu);
  });
}

export function loadFilteredMenu() {
  if (selectedType === 'all' && selectedSituation === 'all') {
    loadAllCategory();
    return;
  }
  if (selectedType !== 'all' && selectedSituation === 'all') {
    loadTypeMenus(selectedType);
    return;
  }
  if (selectedType === 'all' && selectedSituation !== 'all') {
    loadSituationMenus(selectedSituation);
    return;
  }
  const combinedKey = `${selectedType}_${selectedSituation}` as keyof typeof menuList;
  if (combinedKey in menuList) {
    loadCategory(combinedKey);
  } else {
    alert('해당 조합의 메뉴가 없습니다.');
    loadTypeMenus(selectedType);
  }
}

export function loadTypeMenus(type: string) {
  let typeMenus: string[] = [];
  for (const key in menuList) {
    if (key.startsWith(`${type}_`)) {
      const menus = menuList[key as keyof typeof menuList];
      if (menus?.length) {
        typeMenus = [...typeMenus, ...menus];
      }
    }
  }
  const uniqueMenus = [...new Set(typeMenus)];
  currentMenu = shuffle(uniqueMenus).slice(0, 8);
  currentTypes = currentMenu.map(() => type);
  const matchingKey = Object.keys(menuList).find(key => key.startsWith(`${type}_`));
  if (matchingKey) {
    currentCategory = matchingKey as keyof typeof menuList;
  }
  renderMenu();
}

export function loadSituationMenus(situation: string) {
  const allMenus: { name: string; type: string }[] = [];
  for (const key in menuList) {
    if (key.endsWith(`_${situation}`)) {
      const menus = menuList[key as keyof typeof menuList];
      const type = key.split('_')[0];
      if (menus?.length) {
        for (const name of menus) {
          allMenus.push({ name, type });
        }
      }
    }
  }
  const selected = shuffle(allMenus).slice(0, 8);
  currentMenu = selected.map(item => item.name);
  currentTypes = selected.map(item => item.type);
  const situationKeys = Object.keys(menuList).find(key => key.endsWith(`_${situation}`));
  if (situationKeys) {
    currentCategory = situationKeys as keyof typeof menuList;
  }
  renderMenu();
}

export function loadAllCategory() {
  let allMenus: { name: string; type: string }[] = [];
  for (const key in menuList) {
    const menus = menuList[key as keyof typeof menuList];
    const type = key.split('_')[0];
    if (menus?.length) {
      for (const name of menus) {
        allMenus.push({ name, type });
      }
    }
  }
  const selected = shuffle(allMenus).slice(0, 8);
  currentMenu = selected.map(item => item.name);
  currentTypes = selected.map(item => item.type);
  currentCategory = Object.keys(menuList)[0] as keyof typeof menuList;
  renderMenu();
}

export function categoryButtons(categories: string[]) {
  categories.forEach(category => {
    const btn = document.getElementById(`category-${category}`);
    btn?.addEventListener('click', function (this: HTMLElement) {
      document.querySelectorAll('#cat-type .btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      setSelectedType(category);
      loadFilteredMenu();
    });
  });
}

export function situationButtons(situations: string[]) {
  situations.forEach(situation => {
    const btn = document.getElementById(`situation-${situation}`);
    btn?.addEventListener('click', function (this: HTMLElement) {
      document.querySelectorAll('#cat-situation .btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      setSelectedSituation(situation);
      loadFilteredMenu();
    });
  });
}
