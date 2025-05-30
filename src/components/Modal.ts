import { copyLink, shareKakaoTalk } from './LinkShare';
import { handleSpin } from './MenuManager';
import { createElement, Share2, Link2, Utensils, CookingPot, RotateCw, X } from 'lucide';

export function openModal(food: string, foodCategory: string) {
  const spinBtn = document.querySelector('#spin') as HTMLButtonElement; // 룰렛 돌리기 버튼
  const canvas = document.querySelector('#roulette-canvas') as HTMLCanvasElement; // 룰렛 캔버스

  const categoryNaming = (categoryKey: string) => {
    const base = categoryKey.split('_')[0]; // 'korean_solo' → 'korean'
    const map: Record<string, string> = {
      korean: 'kr',
      chinese: 'ch',
      japanese: 'jp',
      western: 'ws',
      snack: 'sn',
      dessert: 'ds',
    };
    return map[base] || base;
  };

  // 아이콘 생성
  const shareIcon = createElement(Share2, { class: 'icon' });
  const linkIcon = createElement(Link2, { class: 'icon' });
  const mapIcon = createElement(Utensils, { class: 'icon' });
  const recipeIcon = createElement(CookingPot, { class: 'icon' });
  const reSpinIcon = createElement(RotateCw, { class: 'icon' });
  const closeIcon = createElement(X, { class: 'icon' });

  // 배경
  const background = document.createElement('div');
  background.className = 'background';

  // 모달
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'modal';

  // 닫기 버튼
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('btn');
  closeBtn.classList.add('btn-close');
  closeBtn.setAttribute('aria-label', '닫기');

  // 오늘의 메뉴는
  const rec = document.createElement('p');
  rec.className = 'rec';
  rec.textContent = '오늘의 메뉴는';

  // 음식 이미지
  const foodImgBox = document.createElement('div');
  foodImgBox.className = 'food-img';

  const foodImg = document.createElement('img');
  const category = categoryNaming(foodCategory);
  foodImg.onerror = () => {
    console.log(`이미지를 찾을 수 없음: ${food}`);
    foodImg.src = '/assets/img/food/default.jpg';
    foodImg.alt = '이미지를 찾을 수 없음';
  };
  foodImg.src = `/assets/img/food/${category}/${category}_${encodeURIComponent(food)}.jpg`;
  foodImg.alt = food;

  // 음식 이름
  const foodName = document.createElement('div');
  foodName.className = 'food-name';
  foodName.textContent = food;

  // 기능 버튼
  const toolBtn = document.createElement('button');
  toolBtn.classList.add('btn');
  toolBtn.classList.add('btn-icon');
  toolBtn.ariaLabel = '기능';

  // 기능 버튼 영역
  const toolBtnArea = document.createElement('div');
  toolBtnArea.className = 'btn-area';

  // 링크 복사 버튼
  const linkBtn = document.createElement('button');
  linkBtn.classList.add('btn');
  linkBtn.classList.add('btn-sm');
  linkBtn.classList.add('btn-text');
  linkBtn.classList.add('btn-basic');

  // 링크 복사 버튼 아이콘
  linkBtn.addEventListener('click', () => {
    copyLink(food, foodCategory);
  });

  // 링크 복사 버튼 텍스트
  const linkBtnText = document.createTextNode('링크 복사');

  // 카카오톡 공유 버튼
  const katalkBtn = document.createElement('button');
  katalkBtn.classList.add('btn');
  katalkBtn.classList.add('btn-sm');
  katalkBtn.classList.add('btn-text');
  katalkBtn.classList.add('btn-basic');
  katalkBtn.addEventListener('click', () => {
    shareKakaoTalk(food, category);
  });

  // 카카오톡 공유 버튼 아이콘
  const katalkBtnIcon = document.createElement('img');
  katalkBtnIcon.src = '/assets/icon/icon_kakaotalk.svg';
  katalkBtnIcon.alt = '카카오톡';

  // 카카오톡 공유 버튼 텍스트
  const katalkBtnText = document.createTextNode('카카오톡 공유');

  const btnArea = document.createElement('div');
  btnArea.className = 'btn-area';

  // 맛집 찾기 버튼
  const mapBtn = document.createElement('a');
  mapBtn.className = 'btn';

  // 맛집 찾기 버튼 텍스트
  const mapBtnText = document.createTextNode('맛집 찾기');
  mapBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(food)}`;
  mapBtn.target = '_blank';

  // 레시피 보기 버튼
  const recipeBtn = document.createElement('a');
  recipeBtn.classList.add('btn');
  recipeBtn.classList.add('btn-outlined');
  recipeBtn.href = `https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(food)}`;
  recipeBtn.target = '_blank';

  // 레시피 보기 버튼 텍스트
  const recipeBtnText = document.createTextNode('레시피 보기');

  // 다시 돌리기 버튼
  const reSpinBtn = document.createElement('button');
  reSpinBtn.classList.add('btn');
  reSpinBtn.classList.add('btn-outlined');
  reSpinBtn.classList.add('btn-basic');
  reSpinBtn.addEventListener('click', () => {
    background.remove();
    handleSpin(canvas, spinBtn);
  });

  // 다시 돌리기 버튼 텍스트
  const reSpinBtnText = document.createTextNode('다시 돌리기');

  // 로딩 애니메이션 요소
  const loader = document.createElement('div');
  loader.className = 'loader';

  // 이미지 로딩 후 모달 띄우기
  foodImg.addEventListener('load', () => {
    background.appendChild(modal);
    loader?.remove();
  });

  document.body.appendChild(background);
  background.appendChild(loader);

  // 요소 조립
  closeBtn.appendChild(closeIcon);
  modal.appendChild(closeBtn);
  modal.appendChild(rec);
  modal.appendChild(foodImgBox);
  modal.appendChild(foodName);
  modal.appendChild(btnArea);
  foodImgBox.appendChild(foodImg);
  foodName.appendChild(toolBtn);
  toolBtn.appendChild(shareIcon);
  linkBtn.appendChild(linkIcon);
  linkBtn.appendChild(linkBtnText);
  toolBtnArea.appendChild(linkBtn);
  katalkBtn.appendChild(katalkBtnIcon);
  katalkBtn.appendChild(katalkBtnText);
  toolBtnArea.appendChild(katalkBtn);
  mapBtn.appendChild(mapIcon);
  mapBtn.appendChild(mapBtnText);
  btnArea.appendChild(mapBtn);
  recipeBtn.appendChild(recipeIcon);
  recipeBtn.appendChild(recipeBtnText);
  btnArea.appendChild(recipeBtn);
  reSpinBtn.appendChild(reSpinIcon);
  reSpinBtn.appendChild(reSpinBtnText);
  btnArea.appendChild(reSpinBtn);

  // 모달 열 때 스크롤바 너비 빼기
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
  document.body.style.paddingRight = scrollbarWidth + 'px';

  // 모달 열려있을 시 배경 스크롤 방지
  document.body.style.overflow = 'hidden';

  // 모달: 버튼 클릭 시 닫기
  closeBtn.addEventListener('click', () => {
    background.remove();
    document.body.style.overflow = 'initial';
    document.body.style.paddingRight = '0';
  });

  // 모달: 배경 클릭 시 닫기
  background.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      background.remove();
      document.body.style.overflow = 'initial';
      document.body.style.paddingRight = '0';
    }
  });

  // 기능 버튼 영역: 모달 배경 클릭 시 닫기
  modal.addEventListener('click', e => {
    if (openToolArea && e.target === e.currentTarget) {
      toolBtnArea.remove();
      openToolArea = false;
    }
  });

  // 기능 버튼 영역: 버튼 클릭 시 열기/닫기
  let openToolArea = false;

  toolBtn.addEventListener('click', () => {
    if (openToolArea) {
      toolBtnArea.remove();
      openToolArea = false;
    } else {
      foodName.appendChild(toolBtnArea);
      openToolArea = true;
    }
  });
}
