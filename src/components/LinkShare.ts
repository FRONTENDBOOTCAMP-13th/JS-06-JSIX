const HOME_URL = 'https://menuroulett6.netlify.app/';

// 공유 url 생성
function createShareUrl(food: string, category: string) {
  const url = new URL(window.location.href);
  url.searchParams.set('food', food);
  url.searchParams.set('category', category);
  return url.toString();
}

// url 파라미터와 일치하는 모달 띄우기
// function openParamsModal() {
//   const params = new URLSearchParams(window.location.search);
//   const sharedFood = params.get('food');
//   const sharedCategory = params.get('category');

//   if (sharedFood && sharedCategory) {
//     openModal(sharedFood, sharedCategory);
//   }
//   console.log(sharedFood, currentCategory);
// }

// openParamsModal();

// 링크 복사
export function copyLink(food: string, category: string) {
  navigator.clipboard.writeText(`오늘 메뉴는 ${food} 어때요?
👉 ${createShareUrl(food, category)}`);
  alert('복사 완료');
}

// 카카오톡 공유
export function shareKakaoTalk(food: string) {
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `오늘 메뉴는 ${food} 어때요?`,
      description: '',
      imageUrl: `${URL}/src/assets/thumbnail.jpg`,
      link: {
        mobileWebUrl: HOME_URL,
        webUrl: HOME_URL,
      },
    },
    buttons: [
      {
        title: '룰렛 돌리러 가기',
        link: {
          mobileWebUrl: HOME_URL,
          webUrl: HOME_URL,
        },
      },
    ],
  });
}
