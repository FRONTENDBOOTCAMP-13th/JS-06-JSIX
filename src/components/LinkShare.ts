import { openModal } from './Modal';

const HOME_URL = 'https://menuroulett6.netlify.app/';

// 공유 url 생성
function createShareUrl(food: string, category: string) {
  const url = new URL(window.location.href);
  url.searchParams.set('food', food);
  url.searchParams.set('category', category);
  return url.toString();
}

// url 파라미터와 일치하는 모달 띄우기
export function openParamsModal() {
  const params = new URLSearchParams(window.location.search);
  const sharedFood = params.get('food');
  const sharedCategory = params.get('category');

  if (sharedFood && sharedCategory) {
    openModal(sharedFood, sharedCategory);
  }
}

// 링크 복사
export function copyLink(food: string, category: string) {
  navigator.clipboard.writeText(`오늘 메뉴는 ${food} 어때요?
👉 ${createShareUrl(food, category)}`);
  alert('주소가 복사되었습니다.');
}

// 카카오톡 공유
export function shareKakaoTalk(food: string, category: string) {
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `오늘 메뉴는 ${food} 어때요?`,
      description: '',
      imageUrl: `${HOME_URL}/assets/img/thumbnail.jpg?v=2`,
      imageWidth: 400,
      imageHeight: 300,
      link: {
        mobileWebUrl: createShareUrl(food, category),
        webUrl: createShareUrl(food, category),
      },
    },
    buttons: [
      {
        title: '룰렛 돌리러 가기',
        link: {
          mobileWebUrl: createShareUrl(food, category),
          webUrl: createShareUrl(food, category),
        },
      },
    ],
  });
}
