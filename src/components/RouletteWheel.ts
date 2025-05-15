const color: string[] = ['#FFA86B', '#FF867C', '#FFE28A', '#A7F3D0', '#90CDF4', '#D0BFFF', '#FFB1B1', '#D9F99D', '#FBB6CE', '#C3DAFE', '#B2F5EA', '#FBD38D', '#FEEBCB', '#C6F6D5', '#E9D8FD', '#FED7E2', '#A0AEC0', '#CBD5E0', '#EDF2F7', '#E2E8F0'];

// 룰렛 그리기
export function drawRoulette(canvas: HTMLCanvasElement, food: string[]) {
  const ctx = canvas.getContext('2d');

  const [cx, cy] = [canvas.width / 2, canvas.height / 2];
  const arc = (2 * Math.PI) / food.length;

  for (let i = 0; i < food.length; i++) {
    ctx?.beginPath();
    ctx?.moveTo(cx, cy);
    ctx?.arc(cx, cy, cx, arc * i, arc * (i + 1));
    if (ctx) {
      ctx.fillStyle = color[i];
    }
    ctx?.fill();

    ctx?.save();
    ctx?.translate(cx, cy);
    ctx?.rotate(arc * (i + 0.5));
    if (ctx) {
      ctx.fillStyle = '#2e2e2e';
      ctx.font = '16px Pretendard';
      ctx.textAlign = 'center';
    }
    ctx?.fillText(food[i], cx * 0.6, 0);
    ctx?.restore();
  }
}

// 룰렛 돌리기
export function spinRoulette(canvas: HTMLCanvasElement, food: string[]): number {
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
