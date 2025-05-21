import { createElement, Share2, Link2, Utensils, CookingPot, RotateCw, X } from 'lucide';
import { copyLink, shareKakaoTalk } from './LinkShare';

// 아이콘 생성
const shareIcon = createElement(Share2, { class: 'icon' });
const linkIcon = createElement(Link2, { class: 'icon' });
const mapIcon = createElement(Utensils, { class: 'icon' });
const recipeIcon = createElement(CookingPot, { class: 'icon' });
const reSpinIcon = createElement(RotateCw, { class: 'icon' });
const closeIcon = createElement(X, { class: 'icon' });

// 비오는 날 이미지 목록
export const rainFoods = ['김치찌개', '해물파전', '수제비', '칼국수', '부대찌개', '감자전', '닭볶음탕', '뼈해장국', '순두부찌개', '잔치국수'];

// 무더운 날 이미지 목록
export const hotFoods = ['냉면', '물회', '콩국수', '오이냉국', '열무김치국수', '비빔냉면', '묵사발', '화채', '팥빙수', '수박주스'];

// 쌀쌀한 날 이미지 목록
export const coldFoods = ['된장찌개', '갈비탕', '삼계탕', '어묵탕', '만두국', '순대국', '꼬리곰탕', '추어탕', '해물탕', '샤브샤브'];

// 눈 오는 날 이미지 목록
export const snowFoods = ['곱창전골', '닭한마리', '오뎅', '군고구마', '호빵', '떡볶이', '라면', '팥죽', '어묵국수', '뱅쇼'];

// 맑은 날 이미지 목록
export const sunnyFoods = ['김밥', '주먹밥', '샌드위치', '샐러드', '유부초밥', '닭강정', '과일', '또띠아롤', '치킨', '컵밥'];

// 봄 이미지 목록
export const springFoods = ['달래비빔밥', '냉이된장국', '칼국수', '쭈꾸미볶음', '도다리회', '미나리비빔국수', '취나물밥'];

// 가을 이미지 목록
export const autumnFoods = ['전어구이', '새우튀김', '꽃게탕', '고구마맛탕', '대하구이'];

// 이미지 경로를 반환하는 함수 (공통적으로 사용)
export function getFoodImagePath(category: string, food: string): string {
  return `/assets/img/food/${category}/${category}_${encodeURIComponent(food)}.jpg`;
}

//kakao 역 지오코딩 코드
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;
// 환경 변수가 제대로 로드되었는지 확인
console.log('API Key:', KAKAO_REST_API_KEY);

// 키가 비어있는지 확인
if (!KAKAO_REST_API_KEY) {
  console.error('Kakao API Key is missing!');
}
async function fetchKakaoAddress(lat: number, lon: number): Promise<string> {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`;
  const response = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) throw new Error('Kakao 주소 정보를 가져오지 못했습니다.');

  const data = await response.json();
  // 행정동, 도로명, 지번 등에서 원하는 정보 추출
  const address = data.documents?.[0]?.address;
  if (address) {
    // 예: '서울특별시 마포구 상암동'
    return `${address.region_1depth_name} ${address.region_2depth_name}`;
  } else {
    return '주소 정보 없음';
  }
}

//openweather currentweather API로 받아오는 값 interface
export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  //rain과 snow는 없을 수도 있어서 ? 추가
  rain?: {
    '1h'?: number;
  };
  snow?: {
    '1h'?: number;
  };
  dt: number; // UNIX timestamp임
  name: string;
}

//음식 분류를 위한 interface
interface FoodCategory {
  name: string; //카테고리명
  condition: (data: WeatherData) => boolean;
  foods: string[]; //카테고리별로 음식 들어갈 array
  message?: (food: string) => string; // 카테고리별로 띄워줄 멘트 커스텀
  getImageSrc: (food: string) => string;
}

export class WeatherFoodRecommender {
  private apiKey: string;
  public categories: FoodCategory[];
  private modalElement: HTMLDivElement | null = null;

  constructor(apiKey: string) {
    //생성자로 openweather api 키 받고
    this.apiKey = apiKey;
    //날씨 조건에 따른 음식 정보 정의하고 초기화, 범주 추가할거면 여기다 추가하면 됨
    this.categories = [
      {
        name: '비오는 날 생각나는 음식',
        condition: (data: WeatherData) => data.weather[0].main === 'Rain' && (data.rain?.['1h'] ?? 0) >= 0.5,
        foods: rainFoods,
        message: food => `비도 오고 그래서.... ${food} 어떠세요?`,
        getImageSrc: food => getFoodImagePath('kr', food),
      },
      {
        name: '무더위에 시원하게 즐기는 음식',
        condition: (data: WeatherData) => data.main.temp >= 30 || data.main.feels_like >= 35,
        foods: hotFoods,
        message: food => `오늘 같은 더운 날엔 시원한 ${food} 최고!`,
        getImageSrc: food => getFoodImagePath(food === '물회' ? 'jp' : 'kr', food),
      },
      {
        name: '쌀쌀한 날 따뜻하게 먹는 음식',
        condition: (data: WeatherData) => data.main.temp <= 15 && (data.wind.speed >= 4 || data.main.temp - data.main.feels_like >= 3),
        foods: coldFoods,
        message: food => `오늘처럼 으슬으슬 추운 날씨엔 뜨끈한 ${food}만 한 게 없죠!`,
        getImageSrc: food => getFoodImagePath('kr', food),
      },
      {
        name: '눈 오는 날 어울리는 음식',
        condition: (data: WeatherData) => data.weather[0].main === 'Snow' && (data.snow?.['1h'] ?? 0) >= 1 && data.main.temp <= 5,
        foods: snowFoods,
        message: food => `함박눈이 소복소복 내리는 날엔 따뜻하고 얼큰한 ${food} 못참지!`,
        getImageSrc: food => getFoodImagePath(food === '오뎅' ? 'jp' : 'kr', food),
      },
      {
        name: '맑은 날 야외에서 먹기 좋은 음식',
        condition: (data: WeatherData) => data.weather[0].main === 'Clear' && data.clouds.all <= 20,
        foods: sunnyFoods,
        message: food => `살랑이는 바람 맞으며 즐기는 ${food}! 돗자리 펴고 앉아서 드셔보세요!`,
        getImageSrc: food => getFoodImagePath(food === '유부초밥' ? 'jp' : 'kr', food),
      },
      {
        name: '봄 제철 음식',
        condition: (data: WeatherData) => {
          const date = new Date(data.dt * 1000);
          const month = date.getMonth() + 1;
          return month >= 3 && month <= 5;
        },
        foods: springFoods,
        message: food => `봄기운 가득 담은 ${food} 어때요?`,
        getImageSrc: food => getFoodImagePath('kr', food),
      },
      {
        name: '가을 제철 음식',
        condition: (data: WeatherData) => {
          const date = new Date(data.dt * 1000);
          const month = date.getMonth() + 1;
          return month >= 9 && month <= 11;
        },
        foods: autumnFoods,
        message: food => `가을 제철 맞아 더욱 깊어진 풍미의 ${food} 어때요?`,
        getImageSrc: food => getFoodImagePath('kr', food),
      },
    ];
    //바로 밑에 있는 createModalElement 메서드 호출
    // this.createModalElement();
  }

  private showModalWithImageLoaded(recommendation: { food: string; message: string; image: string }, weatherData: WeatherData, regionName: string): void {
    // 기존 모달 제거
    // 기존 모달 제거 (id 대신 클래스 기반으로)
    const existingModal = document.querySelector('.background');
    if (existingModal) existingModal.remove();

    // 모달 배경
    const background = document.createElement('div');
    background.className = 'background';

    // 모달 박스
    const modal = document.createElement('div');
    modal.className = 'modal';

    // weather-area
    const weatherArea = document.createElement('div');
    weatherArea.className = 'weather-area';

    // weather-header (아이콘 + 위치 + 닫기)
    const weatherHeader = document.createElement('div');
    weatherHeader.className = 'weather-header';

    // 날씨 아이콘
    const weatherIcon = document.createElement('span');
    weatherIcon.className = 'weather-icon';
    let weatherIconImg: HTMLImageElement | null = null;
    const weatherIconCode = weatherData.weather[0]?.icon;

    // openweathermap 아이콘 사용
    if (weatherIconCode) {
      weatherIconImg = document.createElement('img');
      weatherIconImg.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
      weatherIconImg.alt = weatherData.weather[0]?.description || '';
      weatherIcon.appendChild(weatherIconImg);
    } else {
      weatherIcon.textContent = '🌤️'; // fallback
    }

    // 위치 정보
    const location = document.createElement('span');
    location.className = 'location';
    location.textContent = regionName;

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn');
    closeBtn.classList.add('btn-close');
    closeBtn.setAttribute('aria-label', '닫기');
    closeBtn.onclick = () => background.remove();
    closeBtn.appendChild(closeIcon);

    weatherHeader.appendChild(weatherIcon);
    weatherHeader.appendChild(location);

    // weather-info
    const weatherInfo = document.createElement('div');
    const ul = document.createElement('ul');
    weatherInfo.className = 'weather-info';

    const weatherInfoTemp = document.createElement('li');
    const weatherInfoAppTemp = document.createElement('li');
    const weatherInfohum = document.createElement('li');

    weatherInfoTemp.textContent = `현재 기온`;
    weatherInfoAppTemp.textContent = `체감 온도`;
    weatherInfohum.textContent = `습도`;

    const tempSpan = document.createElement('span');
    const appTempSpan = document.createElement('span');
    const humSpan = document.createElement('span');

    tempSpan.textContent = `${weatherData.main.temp.toFixed(1)}°C`;
    appTempSpan.textContent = `${weatherData.main.feels_like.toFixed(1)}°C`;
    humSpan.textContent = `${weatherData.main.humidity}%`;

    weatherInfoTemp.appendChild(tempSpan);
    weatherInfoAppTemp.appendChild(appTempSpan);
    weatherInfohum.appendChild(humSpan);

    ul.appendChild(weatherInfoTemp);
    ul.appendChild(weatherInfoAppTemp);
    ul.appendChild(weatherInfohum);

    weatherInfo.appendChild(ul);

    weatherArea.appendChild(weatherHeader);
    weatherArea.appendChild(weatherInfo);

    // message
    const message = document.createElement('div');
    message.className = 'rec';
    message.textContent = recommendation.message;

    // food-image
    const foodImage = document.createElement('div');
    foodImage.className = 'food-img';
    let foodImg: HTMLImageElement | null = null;
    if (recommendation.image) {
      foodImg = document.createElement('img');
      foodImg.src = recommendation.image;
      foodImg.alt = recommendation.food;
      foodImage.appendChild(foodImg);
    }

    // 음식 이름
    const foodName = document.createElement('div');
    foodName.className = 'food-name';

    foodName.textContent = recommendation.food;

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

    const foodCategory = recommendation.image.split('/')[4];

    // 링크 복사 버튼 아이콘
    linkBtn.addEventListener('click', () => {
      copyLink(recommendation.food, foodCategory);
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
      shareKakaoTalk(recommendation.food, foodCategory);
    });

    // 카카오톡 공유 버튼 아이콘
    const katalkBtnIcon = document.createElement('img');
    katalkBtnIcon.src = '/assets/icon/icon_kakaotalk.svg';
    katalkBtnIcon.alt = '카카오톡';

    // 카카오톡 공유 버튼 텍스트
    const katalkBtnText = document.createTextNode('카카오톡 공유');

    foodName.appendChild(toolBtn);
    toolBtn.appendChild(shareIcon);
    linkBtn.appendChild(linkIcon);
    linkBtn.appendChild(linkBtnText);
    toolBtnArea.appendChild(linkBtn);
    katalkBtn.appendChild(katalkBtnIcon);
    katalkBtn.appendChild(katalkBtnText);
    toolBtnArea.appendChild(katalkBtn);

    // 버튼 영역 flex container
    const buttonArea = document.createElement('div');
    buttonArea.className = 'btn-area';

    // 맛집 찾기 버튼
    const mapBtn = document.createElement('a');
    mapBtn.className = 'btn';

    // 맛집 찾기 버튼 텍스트
    const mapBtnText = document.createTextNode('맛집 찾기');
    mapBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(recommendation.food)}`;
    mapBtn.target = '_blank';

    mapBtn.appendChild(mapIcon);
    mapBtn.appendChild(mapBtnText);

    // 레시피 보기 버튼
    const recipeBtn = document.createElement('a');
    recipeBtn.classList.add('btn');
    recipeBtn.classList.add('btn-outlined');
    recipeBtn.href = `https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(recommendation.food)}`;
    recipeBtn.target = '_blank';

    // 레시피 보기 버튼 텍스트
    const recipeBtnText = document.createTextNode('레시피 보기');

    recipeBtn.appendChild(recipeIcon);
    recipeBtn.appendChild(recipeBtnText);

    // 다시 추천 받기 버튼
    const reSpinBtn = document.createElement('button');
    reSpinBtn.classList.add('btn');
    reSpinBtn.classList.add('btn-outlined');
    reSpinBtn.classList.add('btn-basic');
    reSpinBtn.onclick = () => {
      this.recommendFoodByCurrentLocation();
      background.remove();
    };

    // 다시 추천 받기 버튼 텍스트
    const reSpinBtnText = document.createTextNode('다시 추천 받기');

    reSpinBtn.appendChild(reSpinIcon);
    reSpinBtn.appendChild(reSpinBtnText);

    buttonArea.appendChild(mapBtn);
    buttonArea.appendChild(recipeBtn);
    buttonArea.appendChild(reSpinBtn);

    // 로딩 애니메이션 요소
    const loader = document.createElement('div');
    loader.className = 'loader';

    // 이미지 로딩 후 모달 띄우기
    foodImg?.addEventListener('load', () => {
      background.appendChild(modal);
      loader?.remove();
    });

    // 모달 구조 조립
    modal.appendChild(closeBtn);
    modal.appendChild(weatherArea);
    modal.appendChild(message);
    modal.appendChild(foodImage);
    modal.appendChild(foodName);
    modal.appendChild(buttonArea);

    background.appendChild(modal);
    background.appendChild(loader);

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
      if (e.target === e.currentTarget) background.remove();
      document.body.style.overflow = 'initial';
      document.body.style.paddingRight = '0';
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

    // 이미지 로딩 대기
    const imagesToLoad: HTMLImageElement[] = [];
    if (weatherIconImg) imagesToLoad.push(weatherIconImg);
    if (foodImg) imagesToLoad.push(foodImg);
    //모달에 띄울 이미지가 없는 경우(추천 음식에 이미지가 없는 경우, 날씨 데이터에 아이콘 정보가 없는 경우, 에러/예외 상황)
    if (imagesToLoad.length === 0) {
      document.body.appendChild(background);
      return;
    }

    let loadedCount = 0;
    imagesToLoad.forEach(img => {
      // onload, onerror 모두 카운트 증가 (캐시 대응)
      img.onload = img.onerror = () => {
        loadedCount++; //로드 성공하면 아이콘, 이미지 별로 +1
        if (loadedCount === imagesToLoad.length) {
          //둘다 로딩되면
          document.body.appendChild(background);
        }
      };
      // 캐시된 이미지도 onload가 바로 발생하지 않을 수 있어서, 이미 complete면 바로 처리
      if (img.complete) {
        img.onload!(null as any); //캐시된것도 count 하나 늘려주는 로직
      }
    });
  }

  // 위치 가져오기 함수
  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('이 브라우저에서는 위치 정보를 지원하지 않습니다.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });
  }

  // 현재 위치의 날씨 데이터 가져오기
  private async fetchWeatherDataByCoords(lat: number, lon: number): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=kr`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`날씨 정보를 가져오는데 실패했습니다. 상태 코드: ${response.status}`);
      }

      return (await response.json()) as WeatherData;
    } catch (error) {
      console.error('날씨 데이터 요청 중 오류 발생:', error);
      throw error;
    }
  }

  private getRandomFood(foods: string[]): string {
    const randomIndex = Math.floor(Math.random() * foods.length);
    return foods[randomIndex];
  }

  private getFoodRecommendation(weatherData: WeatherData): {
    category: string;
    food: string;
    message?: (food: string) => string;
    image: string;
  } | null {
    // 조건에 맞는 모든 카테고리 찾기
    const matchingCategories = this.categories.filter(category => category.condition(weatherData));

    if (matchingCategories.length === 0) {
      return null;
    }

    // 일치하는 카테고리 중 하나를 무작위로 선택
    const randomCategory = matchingCategories[Math.floor(Math.random() * matchingCategories.length)];

    // 선택된 카테고리에서 무작위 음식 선택
    const randomFood = this.getRandomFood(randomCategory.foods);

    return {
      category: randomCategory.name,
      food: randomFood,
      message: randomCategory.message, // ✅ 여기 추가!
      image: randomCategory.getImageSrc(randomFood),
    };
  }

  // 로딩 표시 함수
  private showLoading(): void {
    if (!this.modalElement) return;

    const modalContentEl = this.modalElement.querySelector('#modal-content') as HTMLDivElement;
    if (!modalContentEl) return;

    modalContentEl.innerHTML = '';

    const loadingEl = document.createElement('p');
    loadingEl.textContent = '위치 정보와 날씨를 확인하는 중...';
    loadingEl.style.fontSize = '18px';

    modalContentEl.appendChild(loadingEl);
    this.modalElement.style.display = 'flex';
  }

  // 위치 오류 표시 함수
  private showLocationError(error: GeolocationPositionError | Error): void {
    let errorMessage = '위치 정보를 가져오는데 실패했습니다.';

    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = '위치 정보 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = '현재 위치 정보를 사용할 수 없습니다.';
          break;
        case error.TIMEOUT:
          errorMessage = '위치 정보 요청 시간이 초과되었습니다.';
          break;
      }
    } else {
      errorMessage = `오류: ${error.message}`;
    }

    this.showModalWithImageLoaded(
      {
        food: '위치 정보 오류',
        message: errorMessage,
        image: '',
      },
      {
        name: '알 수 없음',
        main: {
          temp: 0,
          feels_like: 0,
          humidity: 0,
        },
        weather: [
          {
            main: 'Unknown',
            description: '정보 없음',
            icon: '날씨 아이콘 정보 없음',
          },
        ],
        wind: {
          speed: 0,
        },
        clouds: {
          all: 0,
        },
        dt: 0,
      },
      '위치 정보 오류',
    );
  }

  // 현재 위치 기반 음식 추천 함수
  public async recommendFoodByCurrentLocation(): Promise<void> {
    this.showLoading();

    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const weatherData = await this.fetchWeatherDataByCoords(latitude, longitude);
      // 2. Kakao 주소 정보 요청
      let regionName = '';
      try {
        regionName = await fetchKakaoAddress(latitude, longitude);
      } catch (e) {
        regionName = weatherData.name; // 실패 시 기존 도시명 fallback
      }
      const recommendation = this.getFoodRecommendation(weatherData);

      if (recommendation) {
        const message = recommendation.message ? recommendation.message(recommendation.food) : `${recommendation.category}으로 ${recommendation.food}을(를) 추천합니다!`;

        this.showModalWithImageLoaded(
          {
            food: recommendation.food,
            message,
            image: recommendation.image,
          },
          weatherData,
          regionName,
        );
      } else {
        this.showModalWithImageLoaded(
          {
            food: '음식 추천',
            message: '현재 날씨에 맞는 추천 음식이 없습니다.',
            image: '',
          },
          weatherData,
          regionName,
        );
      }
    } catch (error) {
      this.showLocationError(error as GeolocationPositionError | Error);
    }
  }

  // 버튼에 이벤트 리스너 추가하는 메서드
  public attachToButton(buttonId: string): void {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', () => this.recommendFoodByCurrentLocation());
    } else {
      console.error(`ID가 '${buttonId}'인 버튼을 찾을 수 없습니다.`);
    }
  }
}

//main.ts에서 호출할 내용
// import { WeatherFoodRecommender } from './components/weatherFoodRecommender';

// // OpenWeather API 키를 여기에 입력하세요
// const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_URL;
// // 페이지가 로드되면 실행
// document.addEventListener('DOMContentLoaded', () => {
//   // 추천 서비스 인스턴스 생성
//   const foodRecommender = new WeatherFoodRecommender(OPENWEATHER_API_KEY);

//   // 버튼 ID를 전달하여 이벤트 리스너 연결
//   foodRecommender.attachToButton('weather-food-btn');

//   console.log('현재 위치 기반 날씨 음식 추천 서비스가 초기화되었습니다.');
// });

//index.html에서 만들 버튼
//  <button id="weather-food-btn">오늘의 음식 추천받기</button>
