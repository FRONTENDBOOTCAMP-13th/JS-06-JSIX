//빌드 타임에 이미지를 해시가 붙은 url로 변환해서 번들에 포함시키기 위한 이미지 import 영역(이거 경로로 쓰면 배포 폴더에 경로 없어서 에러 뜰 확률 높음 )
//비오는날 이미지 asset import
import rain_1 from '../assets/foods/kr/kr_05_김치찌개.jpg';
import rain_2 from '../assets/foods/kr/kr_39_해물파전.jpg';
import rain_3 from '../assets/foods/kr/kr_25_수제비.jpg';
import rain_4 from '../assets/foods/kr/kr_36_칼국수.jpg';
import rain_5 from '../assets/foods/kr/kr_40_부대찌개.jpg';
import rain_6 from '../assets/foods/kr/kr_41_감자전.jpg';
import rain_7 from '../assets/foods/kr/kr_11_닭볶음탕.jpg';
import rain_8 from '../assets/foods/kr/kr_21_뼈해장국.jpg';
import rain_9 from '../assets/foods/kr/kr_27_순두부찌개.jpg';
import rain_10 from '../assets/foods/kr/kr_42_잔치국수.jpg';
//무더위 이미지 asset import
import hot_1 from '../assets/foods/kr/kr_09_냉면.jpg';
import hot_2 from '../assets/foods/jp/jp_30_물회.jpg';
import hot_3 from '../assets/foods/kr/kr_43_콩국수.jpg';
import hot_4 from '../assets/foods/kr/kr_44_오이냉국.jpg';
import hot_5 from '../assets/foods/kr/kr_45_열무김치국수.jpg';
import hot_6 from '../assets/foods/kr/kr_46_비빔냉면.jpg';
import hot_7 from '../assets/foods/kr/kr_47_묵사발.jpg';
import hot_8 from '../assets/foods/kr/kr_48_화채.jpg';
import hot_9 from '../assets/foods/kr/kr_49_팥빙수.jpg';
import hot_10 from '../assets/foods/kr/kr_50_수박주스.jpg';
//쌀쌀한 날 이미지 asset import
import cold_1 from '../assets/foods/kr/kr_13_된장찌개.jpg';
import cold_2 from '../assets/foods/kr/kr_01_갈비탕.jpg';
import cold_3 from '../assets/foods/kr/kr_23_삼계탕.jpg';
import cold_4 from '../assets/foods/kr/kr_51_어묵탕.jpg';
import cold_5 from '../assets/foods/kr/kr_52_만두국.jpg';
import cold_6 from '../assets/foods/kr/kr_26_순대국.jpg';
import cold_7 from '../assets/foods/kr/kr_06_꼬리곰탕.jpg';
import cold_8 from '../assets/foods/kr/kr_35_추어탕.jpg';
import cold_9 from '../assets/foods/kr/kr_53_해물탕.jpg';
import cold_10 from '../assets/foods/kr/kr_54_샤브샤브.jpg';
//눈오는 날 이미지 asset import
import snow_1 from '../assets/foods/kr/kr_03_곱창전골.jpg';
import snow_2 from '../assets/foods/kr/kr_12_닭한마리.jpg';
import snow_3 from '../assets/foods/jp/jp_13_오뎅.jpg';
import snow_4 from '../assets/foods/kr/kr_55_군고구마.jpg';
import snow_5 from '../assets/foods/kr/kr_56_호빵.jpg';
import snow_6 from '../assets/foods/kr/kr_57_떡볶이.jpg';
import snow_7 from '../assets/foods/kr/kr_58_라면.jpg';
import snow_8 from '../assets/foods/kr/kr_59_팥죽.jpg';
import snow_9 from '../assets/foods/kr/kr_60_어묵국수.jpg';
import snow_10 from '../assets/foods/kr/kr_61_뱅쇼.jpg';
//맑은 날 이미지 asset import
import sunny_1 from '../assets/foods/kr/kr_62_김밥.jpg';
import sunny_2 from '../assets/foods/kr/kr_63_주먹밥.jpg';
import sunny_3 from '../assets/foods/kr/kr_64_샌드위치.jpg';
import sunny_4 from '../assets/foods/kr/kr_65_샐러드.jpg';
import sunny_5 from '../assets/foods/jp/jp_31_유부초밥.jpg';
import sunny_6 from '../assets/foods/kr/kr_66_닭강정.jpg';
import sunny_7 from '../assets/foods/kr/kr_67_과일.jpg';
import sunny_8 from '../assets/foods/kr/kr_68_또띠아롤.jpg';
import sunny_9 from '../assets/foods/kr/kr_69_치킨.jpg';
import sunny_10 from '../assets/foods/kr/kr_70_컵밥.jpg';
//봄 이미지 asset import
import spring_1 from '../assets/foods/kr/kr_71_달래비빔밥.jpg';
import spring_2 from '../assets/foods/kr/kr_72_냉이된장국.jpg';
import spring_3 from '../assets/foods/kr/kr_36_칼국수.jpg';
import spring_4 from '../assets/foods/kr/kr_73_쭈꾸미볶음.jpg';
import spring_5 from '../assets/foods/kr/kr_74_도다리회.jpg';
import spring_6 from '../assets/foods/kr/kr_75_미나리비빔국수.jpg';
import spring_7 from '../assets/foods/kr/kr_76_취나물밥.jpg';
//가을 이미지 asset import
import autumn_1 from '../assets/foods/kr/kr_77_전어구이.jpg';
import autumn_2 from '../assets/foods/kr/kr_78_새우튀김.jpg';
import autumn_3 from '../assets/foods/kr/kr_79_꽃게탕.jpg';
import autumn_4 from '../assets/foods/kr/kr_80_고구마맛탕.jpg';
import autumn_5 from '../assets/foods/kr/kr_81_대하구이.jpg';

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
    return `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`;
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
  imageMap?: Record<string, string>; // food 이름에 따른 이미지 URL
}

export class WeatherFoodRecommender {
  private apiKey: string;
  private categories: FoodCategory[];
  private modalElement: HTMLDivElement | null = null;

  constructor(apiKey: string) {
    //생성자로 openweather api 키 받고
    this.apiKey = apiKey;
    //날씨 조건에 따른 음식 정보 정의하고 초기화, 범주 추가할거면 여기다 추가하면 됨
    this.categories = [
      {
        name: '비오는 날 생각나는 음식',
        condition: (data: WeatherData) => {
          return data.weather[0].main === 'Rain' && (data.rain?.['1h'] ?? 0) >= 0.5;
        },
        foods: ['김치찌개', '해물파전', '수제비', '칼국수', '부대찌개', '감자전', '닭볶음탕', '뼈해장국', '순두부찌개', '잔치국수'],
        message: food => `비도 오고 그래서.... <br>${food} 어떠세요?`,
        imageMap: {
          김치찌개: rain_1,
          해물파전물회: rain_2,
          수제비: rain_3,
          칼국수: rain_4,
          부대찌개: rain_5,
          감자전: rain_6,
          닭볶음탕: rain_7,
          뼈해장국: rain_8,
          순두부찌개: rain_9,
          잔치국수: rain_10,
        },
      },
      {
        name: '무더위에 시원하게 즐기는 음식',
        condition: (data: WeatherData) => {
          return data.main.temp >= 30 || data.main.feels_like >= 35;
        },
        foods: ['냉면', '물회', '콩국수', '오이냉국', '열무김치국수', '비빔냉면', '묵사발', '화채', '팥빙수', '수박주스'],
        message: food => `오늘 같은 더운 날엔 시원한 ${food} 최고!`,
        imageMap: {
          냉면: hot_1,
          물회: hot_2,
          콩국수: hot_3,
          오이냉국: hot_4,
          열무김치국수: hot_5,
          비빔냉면: hot_6,
          묵사발: hot_7,
          화채: hot_8,
          팥빙수: hot_9,
          수박주스: hot_10,
        },
      },
      {
        name: '쌀쌀한 날 따뜻하게 먹는 음식',
        condition: (data: WeatherData) => {
          return data.main.temp <= 15 && (data.wind.speed >= 4 || data.main.temp - data.main.feels_like >= 3);
        },
        foods: ['된장찌개', '갈비탕', '삼계탕', '어묵탕', '만두국', '순대국', '곰탕', '추어탕', '해물탕', '샤브샤브'],
        message: food => `오늘처럼 으슬으슬 추운 날씨엔 뜨끈한 ${food}만 한 게 없죠!`,
        imageMap: {
          된장찌개: cold_1,
          갈비탕: cold_2,
          삼계탕: cold_3,
          어묵탕: cold_4,
          만두국: cold_5,
          순대국: cold_6,
          곰탕: cold_7,
          추어탕: cold_8,
          해물탕: cold_9,
          샤브샤브: cold_10,
        },
      },
      {
        name: '눈 오는 날 어울리는 음식',
        condition: (data: WeatherData) => {
          return data.weather[0].main === 'Snow' && (data.snow?.['1h'] ?? 0) >= 1 && data.main.temp <= 5;
        },
        foods: ['곱창전골', '닭한마리', '오뎅', '군고구마', '호빵', '떡볶이', '라면', '팥죽', '어묵국수', '뱅쇼'],
        message: food => `함박눈이 소복소복 내리는 날엔<br> 따뜻하고 얼큰한 ${food} 못참지!`,
        imageMap: {
          곱창전골: snow_1,
          닭한마리: snow_2,
          오뎅: snow_3,
          군고구마: snow_4,
          호빵: snow_5,
          떡볶이: snow_6,
          라면: snow_7,
          팥죽: snow_8,
          어묵국수: snow_9,
          뱅쇼: snow_10,
        },
      },
      {
        name: '맑은 날 야외에서 먹기 좋은 음식',
        condition: (data: WeatherData) => {
          return data.weather[0].main === 'Clear' && data.clouds.all <= 20;
        },
        foods: ['김밥', '주먹밥', '샌드위치', '샐러드', '유부초밥', '닭강정', '과일', '또띠아롤', '치킨', '컵밥'],
        message: food => `살랑이는 바람 맞으며 즐기는 ${food}!<br> 돗자리 펴고 앉아서 드셔보세요!`,
        imageMap: {
          김밥: sunny_1,
          주먹밥: sunny_2,
          샌드위치: sunny_3,
          샐러드: sunny_4,
          유부초밥: sunny_5,
          닭강정: sunny_6,
          과일: sunny_7,
          또띠아롤: sunny_8,
          치킨: sunny_9,
          컵밥: sunny_10,
        },
      },
      {
        name: '봄 제철 음식',
        condition: (data: WeatherData) => {
          const date = new Date(data.dt * 1000);
          const month = date.getMonth() + 1; // getMonth()는 0부터 시작
          return month >= 3 && month <= 5;
        },
        foods: ['달래 비빔밥', '냉이 된장국', '바지락 칼국수', '쭈꾸미 볶음', '도다리 회', '미나리 비빔국수', '취나물 밥'],
        message: food => `봄기운 가득 담은 ${food} 어때요?`,
        imageMap: {
          '달래 비빔밥': spring_1,
          '냉이 된장국': spring_2,
          '바지락 칼국수': spring_3,
          '쭈꾸미 볶음': spring_4,
          '도다리 회': spring_5,
          '미나리 비빔국수': spring_6,
          '취나물 밥': spring_7,
        },
      },
      {
        name: '가을 제철 음식',
        condition: (data: WeatherData) => {
          const date = new Date(data.dt * 1000);
          const month = date.getMonth() + 1;
          return month >= 9 && month <= 11;
        },
        foods: ['전어구이', '새우튀김', '꽃게탕', '고구마 맛탕', '대하 구이'],
        message: food => `가을 제철 맞아 더욱 깊어진 풍미의<br> ${food} 어때요?`,
        imageMap: {
          전어구이: autumn_1,
          새우튀김: autumn_2,
          꽃게탕: autumn_3,
          '고구마 맛탕': autumn_4,
          '대하 구이': autumn_5,
        },
      },
    ];
    //바로 밑에 있는 createModalElement 메서드 호출
    // this.createModalElement();
  }

  private showModalWithImageLoaded(recommendation: { food: string; message: string; image: string }, weatherData: WeatherData, regionName: string): void {
    // 기존 모달 제거
    const existingModal = document.getElementById('food-modal');
    if (existingModal) existingModal.remove();

    // 이미지 객체 준비
    const image = new Image();
    image.src = recommendation.image;
    image.style.width = '150px';
    image.style.height = '150px';
    image.style.objectFit = 'contain';
    image.style.margin = '1rem 0';

    // 이미지가 완전히 로드된 후 모달 생성
    image.onload = () => {
      // 모달 배경
      const modalElement = document.createElement('div');
      modalElement.id = 'food-modal';
      modalElement.style.position = 'fixed';
      modalElement.style.top = '0';
      modalElement.style.left = '0';
      modalElement.style.width = '100%';
      modalElement.style.height = '100%';
      modalElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modalElement.style.display = 'flex';
      modalElement.style.justifyContent = 'center';
      modalElement.style.alignItems = 'center';
      modalElement.style.zIndex = '1000';

      // 모달 컨텐츠 박스
      const innerBox = document.createElement('div');
      innerBox.style.background = 'white';
      innerBox.style.padding = '2rem';
      innerBox.style.borderRadius = '12px';
      innerBox.style.width = '320px';
      innerBox.style.textAlign = 'center';
      innerBox.style.fontFamily = 'sans-serif';
      innerBox.style.position = 'relative';

      // X 닫기 버튼
      const closeX = document.createElement('span');
      closeX.textContent = '✕';
      closeX.style.position = 'absolute';
      closeX.style.top = '18px';
      closeX.style.right = '20px';
      closeX.style.fontSize = '20px';
      closeX.style.color = '#222';
      closeX.style.cursor = 'pointer';
      closeX.setAttribute('aria-label', '닫기');
      closeX.addEventListener('click', () => modalElement.remove());
      innerBox.appendChild(closeX);

      // 상단 날씨/지역 정보
      const regionDiv = document.createElement('div');
      regionDiv.style.fontSize = '1.1rem';
      regionDiv.style.fontWeight = '600';
      regionDiv.style.marginBottom = '0.5rem';

      // 날씨 아이콘과 설명 추가
      const weatherIconCode = weatherData.weather[0].icon;
      const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
      const weatherDesc = weatherData.weather[0].description;
      regionDiv.innerHTML = `<img src="${weatherIconUrl}" alt="${weatherDesc}" style="width: 30px; height: 30px; vertical-align: middle;"> ${regionName} `; //(${weatherDesc}) 요거 넣으면 날씨 묘사된 거 추가됨
      innerBox.appendChild(regionDiv);

      const weatherDiv = document.createElement('div');
      weatherDiv.style.fontSize = '0.9rem';
      weatherDiv.style.marginBottom = '1rem';
      weatherDiv.textContent = `현재 기온 : ${weatherData.main.temp.toFixed(1)}°C / 체감 온도 : ${weatherData.main.feels_like.toFixed(1)}°C / 습도 ${weatherData.main.humidity}%`;
      innerBox.appendChild(weatherDiv);

      // 추천 멘트
      const messageDiv = document.createElement('div');
      messageDiv.style.fontSize = '1rem';
      messageDiv.style.fontWeight = 'bold';
      messageDiv.style.marginBottom = '1rem';
      messageDiv.textContent = recommendation.message;
      innerBox.appendChild(messageDiv);

      // 음식 이미지
      innerBox.appendChild(image);

      // 음식명 + 새로고침 아이콘 한 줄로 배치
      const foodRow = document.createElement('div');
      foodRow.style.display = 'flex';
      foodRow.style.alignItems = 'center';
      foodRow.style.justifyContent = 'center';
      foodRow.style.gap = '8px';
      foodRow.style.margin = '1rem 0';

      const foodName = document.createElement('div');
      foodName.textContent = recommendation.food;
      foodName.style.fontWeight = '600';
      foodName.style.fontSize = '18px';

      const refreshIcon = document.createElement('span');
      refreshIcon.innerHTML = '🔄';
      refreshIcon.style.cursor = 'pointer';
      refreshIcon.title = '다시 추천받기';
      refreshIcon.style.fontSize = '18px';
      refreshIcon.addEventListener('click', () => {
        this.recommendFoodByCurrentLocation();
        modalElement.remove();
      });

      foodRow.appendChild(foodName);
      foodRow.appendChild(refreshIcon);
      innerBox.appendChild(foodRow);

      // 버튼 컨테이너
      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.display = 'flex';
      buttonWrapper.style.justifyContent = 'center';
      buttonWrapper.style.gap = '10px';

      // 맛집 찾기 버튼
      const findBtn = document.createElement('a');
      findBtn.textContent = '맛집 찾기';
      findBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(recommendation.food)}`;
      findBtn.target = '_blank';
      findBtn.style.backgroundColor = '#FF5722';
      findBtn.style.color = 'white';
      findBtn.style.border = 'none';
      findBtn.style.padding = '10px 20px';
      findBtn.style.borderRadius = '8px';
      findBtn.style.textDecoration = 'none';
      findBtn.style.fontWeight = '500';
      buttonWrapper.appendChild(findBtn);

      // 레시피 보기 버튼
      const recipeBtn = document.createElement('a');
      recipeBtn.textContent = '레시피 보기';
      recipeBtn.href = `https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(recommendation.food)}`;
      recipeBtn.target = '_blank';
      recipeBtn.style.backgroundColor = 'white';
      recipeBtn.style.color = '#FF5722';
      recipeBtn.style.border = '1px solid #FF5722';
      recipeBtn.style.padding = '10px 20px';
      recipeBtn.style.borderRadius = '8px';
      recipeBtn.style.textDecoration = 'none';
      recipeBtn.style.fontWeight = '500';
      buttonWrapper.appendChild(recipeBtn);

      innerBox.appendChild(buttonWrapper);

      modalElement.appendChild(innerBox);

      document.body.appendChild(modalElement);
    };
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
      image: randomCategory.imageMap?.[randomFood] ?? '', // 여기 추가
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
