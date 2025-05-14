import { menuList } from '../data/menuList';

let currentMenu: string[] = [];
// 현재 카테고리 저장용
let currentCategory: keyof typeof menuList | null = null;

// 메뉴 리스트 출력하는 함수
function renderMenu() {
  const ul = document.getElementById('menu-entries');
  if (!ul) return;
  ul.innerHTML = '';

  currentMenu.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'menu-item';

    li.innerHTML = `
      <input class="menu-input" type="text" placeholder="메뉴 입력" value="${item}" />
      <button class="deleteBtn">✕</button>
    `;

    // 삭제 버튼
    li.querySelector('.deleteBtn')?.addEventListener('click', () => {
      currentMenu.splice(index, 1);
      renderMenu();
    });

    // input 수정 시 currentMenu 값 동기화
    li.querySelector('.menu-input')?.addEventListener('input', e => {
      const target = e.target as HTMLInputElement;
      currentMenu[index] = target.value;
    });

    ul.appendChild(li);
  });
}

// 카테고리 메뉴를 랜덤으로 8개선택
function loadCategory(category: keyof typeof menuList) {
  const list = menuList[category];
  if (!list) return;

  currentCategory = category;

  // currentMenu가 비어 있다면  8개 기본 생성
  if (currentMenu.length === 0) {
    currentMenu = Array(8).fill('');
  }

  // 2. currentMenu 길이만큼 메뉴를 채움
  const newMenu = shuffle(list).slice(0, currentMenu.length);

  // 3. 각 줄에 메뉴 채워넣기
  for (let i = 0; i < currentMenu.length; i++) {
    currentMenu[i] = newMenu[i] || ''; // 혹시 모자라면 빈칸
  }

  renderMenu();
}

// 배열 무작위로 섞는 함수
function shuffle<T>(array: T[]): T[] {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

window.addEventListener('DOMContentLoaded', () => {
  if (currentMenu.length === 0) {
    currentMenu = Array(8).fill('');
    renderMenu();
  }

  document.getElementById('category-korean')?.addEventListener('click', () => loadCategory('korean'));
  document.getElementById('category-chinese')?.addEventListener('click', () => loadCategory('chinese'));
  document.getElementById('category-japanese')?.addEventListener('click', () => loadCategory('japanese'));
  document.getElementById('category-western')?.addEventListener('click', () => loadCategory('western'));
  document.getElementById('category-snack')?.addEventListener('click', () => loadCategory('snack'));
  document.getElementById('category-dessert')?.addEventListener('click', () => loadCategory('dessert'));

  document.getElementById('mix')?.addEventListener('click', () => {
    if (!currentCategory) return; // 아무 카테고리도 선택 안 된 상태라면 무시

    const list = menuList[currentCategory];
    const newMenu = shuffle(list).slice(0, currentMenu.length);

    for (let i = 0; i < currentMenu.length; i++) {
      currentMenu[i] = newMenu[i] || '';
    }

    renderMenu();
  });

  document.getElementById('addMenu')?.addEventListener('click', () => {
    // 빈 문자열로 새로운 메뉴 추가
    currentMenu.push('');
    renderMenu();
  });

  document.getElementById('resetMenu')?.addEventListener('click', () => {
    // currentMenu 내부의 텍스트만 모두 빈 문자열로 바꿈
    currentMenu = currentMenu.map(() => '');
    renderMenu();
  });
});
