const food: string[] = ['떡볶이', '돈가스', '초밥', '피자', '냉면', '치킨', '족발', '피자'];
const color: string[] = ['#FFA86B', '#FF867C', '#FFE28A', '#A7F3D0', '#90CDF4', '#D0BFFF', '#FFB1B1', '#D9F99D'];

// 룰렛 그리기
export function drawRoulette(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  // 원의 중심 좌표
  const [cx, cy] = [canvas.width / 2, canvas.height / 2];
  // 각각의 조각이 차지하는 호의 길이
  const arc = (2 * Math.PI) / food.length;
  for (let i = 0; i < food.length; i++) {
    // 그리기 시작
    ctx?.beginPath();
    // 원의 중심으로 이동
    ctx?.moveTo(cx, cy);
    // 원 조각 그리기
    ctx?.arc(cx, cy, cx, arc * i, arc * (i + 1));
    // 원 조각의 배경색 설정
    if (ctx) {
      ctx.fillStyle = color[i];
    }
    // 원 조각 배경색 채우기
    ctx?.fill();

    // 현재 캔버스 설정값 저장
    ctx?.save();
    // 기준 좌표를 원의 중심으로 이동
    ctx?.translate(cx, cy);
    // 각 조각만큼 회전
    ctx?.rotate(arc * (i + 0.5));
    // 텍스트 컬러, 폰트, 정렬 설정
    if (ctx) {
      ctx.fillStyle = '#2e2e2e';
      ctx.font = '16px Pretendard';
      ctx.textAlign = 'center';
    }
    // 음식 이름 텍스트 넣기
    ctx?.fillText(food[i], cx * 0.6, 0);
    // 저장한 설정값으로 되돌리기
    ctx?.restore();
  }
}

// 룰렛 돌리기
export function spinRoulette(canvas: HTMLCanvasElement): number {
  // css 초기화
  canvas.style.transition = 'initial';
  canvas.style.transform = 'rotate(0deg)';

  const arc = 360 / food.length;

  // 음식 배열의 인덱스 중 랜덤한 값 구하기;
  const random = Math.floor(Math.random() * food.length);
  // 회전 각도 계산
  const rotate = 3600 - (arc * random + arc / 2) - 90;

  // css 초기화 후 실행
  setTimeout(() => {
    canvas.style.transition = '2s';
    canvas.style.transform = `rotate(${rotate}deg)`;
  }, 0);

  // 랜덤한 숫자 반환
  return random;
}
