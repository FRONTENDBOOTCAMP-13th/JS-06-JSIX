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

  // 오늘의 메뉴는
  const rec = document.createElement('p');
  rec.className = 'rec';
  rec.textContent = '오늘의 메뉴는';

  // 음식 이미지
  const foodImgBox = document.createElement('div');
  foodImgBox.className = 'food-img';

  const foodImg = document.createElement('img');
  const category = categoryNaming(foodCategory);
  foodImg.src = `../assets/foods/${category}/${category}_${indexChange(foodIndex)}_${food}.jpg`;
  foodImg.alt = food;

  // 음식 이름
  const foodName = document.createElement('p');
  foodName.className = 'food-name';
  foodName.textContent = food;

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

  background.appendChild(modal);
  modal.appendChild(closeBtn);
  modal.appendChild(rec);
  modal.appendChild(foodImgBox);
  foodImgBox.appendChild(foodImg);
  modal.appendChild(foodName);
  modal.appendChild(btnArea);
  btnArea.appendChild(mapBtn);
  btnArea.appendChild(recipeBtn);
  btnArea.appendChild(reSpinBtn);

  document.body.appendChild(background);

  // 모달 닫기
  closeBtn.addEventListener('click', () => {
    background.remove();
  });
}
