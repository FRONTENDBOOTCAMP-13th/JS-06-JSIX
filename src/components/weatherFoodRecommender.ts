//openweather currentweather API로 받아오는 값 interface
export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
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
          return (
            data.weather[0].main === 'Rain' && (data.rain?.['1h'] ?? 0) >= 0.5
          );
        },
        foods: [
          '김치찌개',
          '해물파전',
          '수제비',
          '칼국수',
          '부대찌개',
          '감자전',
          '닭볶음탕',
          '뼈해장국',
          '순두부찌개',
          '잔치국수',
        ],
        message: food => `비도 오고 그래서.... ${food}은(는) 어떠세요?`,
      },
      {
        name: '무더위에 시원하게 즐기는 음식',
        condition: (data: WeatherData) => {
          return data.main.temp >= 30 || data.main.feels_like >= 35;
        },
        foods: [
          '냉면',
          '물회',
          '콩국수',
          '오이냉국',
          '열무김치국수',
          '비빔냉면',
          '묵사발',
          '화채',
          '팥빙수',
          '수박주스',
        ],
        message: food => `오늘 같은 더운 날엔 시원한 ${food}이(가) 최고!`,
      },
      {
        name: '쌀쌀한 날 따뜻하게 먹는 음식',
        condition: (data: WeatherData) => {
          return (
            data.main.temp <= 15 &&
            (data.wind.speed >= 4 || data.main.temp - data.main.feels_like >= 3)
          );
        },
        foods: [
          '된장찌개',
          '갈비탕',
          '삼계탕',
          '어묵탕',
          '만두국',
          '순대국',
          '곰탕',
          '추어탕',
          '해물탕',
          '샤브샤브',
        ],
        message: food =>
          `오늘처럼 으슬으슬 추운 날씨엔 뜨끈한 ${food} 만 한 게 없죠!`,
      },
      {
        name: '눈 오는 날 어울리는 음식',
        condition: (data: WeatherData) => {
          return (
            data.weather[0].main === 'Snow' &&
            (data.snow?.['1h'] ?? 0) >= 1 &&
            data.main.temp <= 5
          );
        },
        foods: [
          '곱창전골',
          '닭한마리',
          '오뎅',
          '군고구마',
          '호빵',
          '떡볶이',
          '라면',
          '팥죽',
          '어묵국수',
          '뱅쇼',
        ],
        message: food =>
          `함박눈이 소복소복 내리는 날엔 따뜻하고 얼큰한 ${food} 먹으면서 창밖 풍경 감상하는 낭만, 놓칠 수 없죠!`,
      },
      {
        name: '맑은 날 야외에서 먹기 좋은 음식',
        condition: (data: WeatherData) => {
          return data.weather[0].main === 'Clear' && data.clouds.all <= 20;
        },
        foods: [
          '김밥',
          '주먹밥',
          '샌드위치',
          '샐러드',
          '유부초밥',
          '닭강정',
          '과일',
          '또띠아롤',
          '치킨',
          '컵밥',
        ],
        message: food =>
          `햇살 좋은 날, 살랑이는 바람 맞으며 즐기는 ${food}! 돗자리 펴고 앉아서 드셔보세요!`,
      },
      {
        name: '봄 제철 음식',
        condition: (data: WeatherData) => {
          const date = new Date(data.dt * 1000);
          const month = date.getMonth() + 1; // getMonth()는 0부터 시작
          return month >= 3 && month <= 5;
        },
        foods: [
          '달래 비빔밥',
          '냉이 된장국',
          '바지락 칼국수',
          '쭈꾸미 볶음',
          '도다리 회',
          '미나리 비빔국수',
          '취나물 밥',
        ],
        message: food =>
          `싱그러운 봄기운 가득 담은 ${food} 맛보세요! 입안 가득 퍼지는 봄 향기가 기분까지 산뜻하게 만들어 줄 거예요.`,
      },
      {
        name: '가을 제철 음식',
        condition: (data: WeatherData) => {
          const date = new Date(data.dt * 1000);
          const month = date.getMonth() + 1;
          return month >= 9 && month <= 11;
        },
        foods: ['전어구이', '새우튀김', '꽃게탕', '고구마 맛탕', '대하 구이'],
        message: food =>
          `풍요로운 가을, 놓칠 수 없는 맛! 제철 맞아 더욱 깊어진 풍미의 ${food} 맛보시면서 가을의 정취를 느껴보세요.`,
      },
    ];
    //바로 밑에 있는 createModalElement 메서드 호출
    this.createModalElement();
  }

  //html 모달 요소를 동적으로 생성하고 DOM에 추가하는 메서드
  private createModalElement(): void {
    // 모달 컨테이너 생성. 모달 컨테이너 css 수정 필요시 여기 수정하면 됨
    this.modalElement = document.createElement('div');
    this.modalElement.style.display = 'none';
    this.modalElement.style.position = 'fixed';
    this.modalElement.style.zIndex = '1000';
    this.modalElement.style.left = '0';
    this.modalElement.style.top = '0';
    this.modalElement.style.width = '100%';
    this.modalElement.style.height = '100%';
    this.modalElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // this.modalElement.style.display = 'flex';  --> 이거키면 초기 로딩시에도 모달 뜸
    this.modalElement.style.justifyContent = 'center';
    this.modalElement.style.alignItems = 'center';

    // 모달 내용 생성
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '80%';
    modalContent.style.textAlign = 'center';

    // 닫기 버튼 생성
    const closeButton = document.createElement('button');
    closeButton.textContent = '닫기';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '8px 16px';
    closeButton.style.backgroundColor = '#e0e0e0';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
      if (this.modalElement) {
        this.modalElement.style.display = 'none';
      }
    });

    modalContent.appendChild(document.createElement('div')).id =
      'modal-content';
    modalContent.appendChild(closeButton);

    this.modalElement.appendChild(modalContent);
    document.body.appendChild(this.modalElement);
  }

  private showModal(title: string, content: string): void {
    if (!this.modalElement) return;

    const modalContentEl = this.modalElement.querySelector(
      '#modal-content',
    ) as HTMLDivElement;
    if (!modalContentEl) return;

    // 제목 생성
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    titleEl.style.marginBottom = '15px';

    // 내용 생성
    const contentEl = document.createElement('p');
    contentEl.textContent = content;
    contentEl.style.fontSize = '18px';

    // 이전 내용 지우고 새 내용 추가
    modalContentEl.innerHTML = '';
    modalContentEl.appendChild(titleEl);
    modalContentEl.appendChild(contentEl);

    // 모달 표시
    this.modalElement.style.display = 'flex';
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
  private async fetchWeatherDataByCoords(
    lat: number,
    lon: number,
  ): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=kr`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `날씨 정보를 가져오는데 실패했습니다. 상태 코드: ${response.status}`,
        );
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
  } | null {
    // 조건에 맞는 모든 카테고리 찾기
    const matchingCategories = this.categories.filter(category =>
      category.condition(weatherData),
    );

    if (matchingCategories.length === 0) {
      return null;
    }

    // 일치하는 카테고리 중 하나를 무작위로 선택
    const randomCategory =
      matchingCategories[Math.floor(Math.random() * matchingCategories.length)];

    // 선택된 카테고리에서 무작위 음식 선택
    const randomFood = this.getRandomFood(randomCategory.foods);

    return {
      category: randomCategory.name,
      food: randomFood,
      message: randomCategory.message, // ✅ 여기 추가!
    };
  }

  // 로딩 표시 함수
  private showLoading(): void {
    if (!this.modalElement) return;

    const modalContentEl = this.modalElement.querySelector(
      '#modal-content',
    ) as HTMLDivElement;
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
          errorMessage =
            '위치 정보 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
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

    this.showModal('위치 정보 오류', errorMessage);
  }

  // 현재 위치 기반 음식 추천 함수
  public async recommendFoodByCurrentLocation(): Promise<void> {
    this.showLoading();

    try {
      // 1. 현재 위치 가져오기
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // 2. 현재 위치의 날씨 데이터 가져오기
      const weatherData = await this.fetchWeatherDataByCoords(
        latitude,
        longitude,
      );

      // 3. 날씨에 맞는 음식 추천
      const recommendation = this.getFoodRecommendation(weatherData);

      if (recommendation) {
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;

        const message = recommendation.message
          ? recommendation.message(recommendation.food)
          : `${recommendation.category}으로 ${recommendation.food}을(를) 추천합니다!`;

        this.showModal(
          `오늘의 음식 추천: ${recommendation.food}`,
          `지역: ${weatherData.name}\n현재 날씨: ${temp.toFixed(1)}°C, ${weatherDesc}\n${message}`,
        );
      } else {
        this.showModal('음식 추천', '현재 날씨에 맞는 추천 음식이 없습니다.');
      }
    } catch (error) {
      this.showLocationError(error as GeolocationPositionError | Error);
    }
  }

  // 버튼에 이벤트 리스너 추가하는 메서드
  public attachToButton(buttonId: string): void {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', () =>
        this.recommendFoodByCurrentLocation(),
      );
    } else {
      console.error(`ID가 '${buttonId}'인 버튼을 찾을 수 없습니다.`);
    }
  }
}

//main.ts에서 호출할 내용
// import { WeatherFoodRecommender } from './components/weatherFoodRecommender';

// // OpenWeather API 키를 여기에 입력하세요
// const OPENWEATHER_API_KEY = 'f8dfa97021ec854e4286e92c7fe3121a'; // 실제 API 키로 반드시 변경해야 합니다!

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
