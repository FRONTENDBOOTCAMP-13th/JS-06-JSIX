import { copyLink, shareKakaoTalk } from './LinkShare';
import { handleSpin } from './menuManager';

export function openModal(food: string, foodIndex: number, foodCategory: string) {
  const spinBtn = document.querySelector('#spin') as HTMLButtonElement; // 룰렛 돌리기 버튼
  const canvas = document.querySelector('#roulette-canvas') as HTMLCanvasElement; // 룰렛 캔버스

  const categoryNaming = (category: string) => {
    switch (category) {
      case 'korean':
        return 'kr';
        break;
      case 'chinese':
        return 'ch';
        break;
      case 'japanese':
        return 'jp';
        break;
      case 'western':
        return 'ws';
        break;
      case 'snack':
        return 'sn';
        break;
      case 'dessert':
        return 'ds';
        break;

      default:
        return '';
        break;
    }
  };

  const indexChange = (index: number) => (index < 10 ? '0' + index : index);

  // 배경
  const background = document.createElement('div');
  background.className = 'background';

  // 모달
  const modal = document.createElement('div');
  modal.className = 'modal';

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
  const index = indexChange(foodIndex);
  foodImg.src = `/src/assets/foods/${category}/${category}_${index}_${food}.jpg`;
  foodImg.alt = food;

  // 음식 이름
  const foodName = document.createElement('div');
  foodName.className = 'food-name';

  foodName.textContent = food;

  // 기능 버튼
  const toolBtn = document.createElement('button');
  toolBtn.classList.add('btn');
  toolBtn.classList.add('btn-icon');

  // 기능 버튼 아이콘
  const toolBtnIcon = document.createElement('img');
  toolBtnIcon.src = '/src/assets/icon/icon_share.svg';
  toolBtnIcon.alt = '기능';

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
  const linkBtnIcon = document.createElement('img');
  linkBtnIcon.src = '/src/assets/icon/icon_link.svg';
  linkBtnIcon.alt = '링크';
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
    shareKakaoTalk(food);
  });

  // 카카오톡 공유 버튼 아이콘
  const katalkBtnIcon = document.createElement('img');
  katalkBtnIcon.src = '/src/assets/icon/icon_kakaotalk.svg';
  katalkBtnIcon.alt = '카카오톡';

  // 카카오톡 공유 버튼 텍스트
  const katalkBtnText = document.createTextNode('카카오톡 공유');

  const btnArea = document.createElement('div');
  btnArea.className = 'btn-area';

  // 맛집 찾기 버튼
  const mapBtn = document.createElement('a');
  mapBtn.className = 'btn';
  mapBtn.textContent = '맛집 찾기';
  mapBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(food)}`;
  mapBtn.target = '_blank';

  // 레시피 보기 버튼
  const recipeBtn = document.createElement('a');
  recipeBtn.classList.add('btn');
  recipeBtn.classList.add('btn-outlined');
  recipeBtn.textContent = '레시피 보기';
  recipeBtn.href = `https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(food)}`;
  recipeBtn.target = '_blank';

  // 다시 돌리기 버튼
  const reSpinBtn = document.createElement('button');
  reSpinBtn.classList.add('btn');
  reSpinBtn.classList.add('btn-outlined');
  reSpinBtn.classList.add('btn-basic');
  reSpinBtn.textContent = '다시 돌리기';
  reSpinBtn.addEventListener('click', () => {
    background.remove();
    handleSpin(canvas, spinBtn);
  });

  // 요소 조립
  background.appendChild(modal);
  modal.appendChild(closeBtn);
  modal.appendChild(rec);
  modal.appendChild(foodImgBox);
  foodImgBox.appendChild(foodImg);
  modal.appendChild(foodName);
  foodName.appendChild(toolBtn);
  toolBtn.appendChild(toolBtnIcon);
  linkBtn.appendChild(linkBtnIcon);
  linkBtn.appendChild(linkBtnText);
  toolBtnArea.appendChild(linkBtn);
  katalkBtn.appendChild(katalkBtnIcon);
  katalkBtn.appendChild(katalkBtnText);
  toolBtnArea.appendChild(katalkBtn);
  modal.appendChild(btnArea);
  btnArea.appendChild(mapBtn);
  btnArea.appendChild(recipeBtn);
  btnArea.appendChild(reSpinBtn);

  document.body.appendChild(background);

  // 모달 닫기: 버튼 클릭 시
  closeBtn.addEventListener('click', () => {
    background.remove();
  });

  // 모달 닫기: 배경 클릭 시
  background.addEventListener('click', e => {
    if (e.target === e.currentTarget) background.remove();
  });

  let openToolArea = false;

  toolBtn.addEventListener('click', () => {
    if (openToolArea) {
      toolBtnArea.remove();
      openToolArea = false;
      // 기능 버튼 영역 닫기
    } else {
      // 기능 버튼 영역 열기
      foodName.appendChild(toolBtnArea);
      openToolArea = true;
    }
  });

  // 배경 클릭 시 닫기
  modal.addEventListener('click', e => {
    if (openToolArea && e.target === e.currentTarget) {
      toolBtnArea.remove();
      openToolArea = false;
    }
  });
}
