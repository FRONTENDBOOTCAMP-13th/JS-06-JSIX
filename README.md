<h1 align= "center">
  JSIX - 룰렛돌리기 "오늘의 메뉴추천 룰렛"
</h1>

## 프로젝트 개요

오늘의 메뉴 추천 룰렛은 점심 메뉴 선택을 쉽고 재미있게 도와주는 웹 애플리케이션입니다.
카테고리별와 상황별로 다양한 메뉴를 룰렛으로 돌려 추천받을 수 있으며, 날씨와 계절에 따라 어울리는 음식도 추천해줍니다.

## 프로젝트 플로우차트

  <img src="./public/assets/img/JSIX-workflow.png">

## 프로젝트 구조

```
JS-06-JSIX/
├── public/
│ └── assets/
│ ├── icon/
│ └── img/

├── src/ # 소스 코드
│ ├── components/
│ │ ├── buttonManager.ts
│ │ ├── LinkShare.ts
│ │ ├── menuHistory.ts
│ │ ├── menuManager.ts
│ │ ├── Modal.ts
│ │ ├── RouletteWheel.ts
│ │ └── weatherFoodRecommender.ts

│ ├── data/
│ │ └── menuList.ts

│ ├── pages/
│ │ ├── homePage.html
│ │ └── modal.html

│ ├── styles/
│ │ ├── custom.css
│ │ ├── global.css
│ │ ├── homePage.css
│ │ └── reset.css

│ └── main.ts

├── README.md
├── index.html
├── .env #
├── .gitignore
├── vite.config.js
├── tsconfig.json
├── package.json
├── package-lock.json
└── 기타 설정 파일들 (.prettier, .eslintrc 등)
```

## 주요기능 미리보기

### 1. 카테고리별 메뉴 불러오기 🍱

- **종류**: 한식, 중식, 일식 등 미리 정의된 음식 종류에서 선택할 수 있습니다.
- **상황**: 혼밥, 데이트, 회식 등 다양한 식사 상황에 맞춰 메뉴를 필터링할 수 있습니다.
- 선택된 종류와 상황 조합에 따라 해당 카테고리에서 무작위로 8개의 메뉴를 자동으로 추천합니다.
- 사용자가 원하는 메뉴를 임의로 정할 수도 있습니다.

<details>
<summary><b>카테고리, 상황별 필터 UI</b></summary>

  <img src="./public/assets/img/screenshots/categoryImg.png"/>
  <img src="./public/assets/img/screenshots/listImg.png"/>

</details>

### 2. 룰렛 돌리기 🎯

- 룰렛 돌리기 버튼을 누르면 미리정해진 리스트 중 메뉴 하나를 선택합니다.
- 선택된 메뉴는 모달로 결과와 함께 이미지로 출력

<details>
<summary><b>룰렛돌리기, 모달 UI </b></summary>
  <img src="./public/assets/img/screenshots/rouletteImg.png"/>
  <img src="./public/assets/img/screenshots/modalImg.png"/>
</details>

### 3. 메뉴 섞기 / 메뉴 추가 / 초기화 🔄➕🧹

- 메뉴 섞기 버튼을 누르면 메뉴리스트가 랜덤으로 새롭게 짜여집니다 .
- 메뉴 추가로 최대 20개의 메뉴추가 가능.
- 초기화 버튼으로 현재 메뉴의 입력값을 비울 수 있습니다.

<details>
<summary><b>메뉴 섞기, 추가, 초기화 UI</b></summary>
  <img src="./public/assets/img/screenshots/addImg.png"/>
  <img src="./public/assets/img/screenshots/buttonImg.png"/>
</details>

### 4. 날씨 기반 추천 🌦️

- 위치 기반 날씨 데이터를 받아, 현재 지역의 날씨와 맞는 음식메뉴를 추천합니다.

<details>
<summary><b>날씨 기반 추천 UI</b></summary>
    <img src="./public/assets/img/screenshots/weatherImg.png"/>
</details>

### 5. 최근 뽑힌 메뉴 기록 🕘

- 최근 선택된 메뉴 5개를 저장 및 표시합니다.
<details>
<summary><b>최근 뽑힌 메뉴 기록 UI</b></summary>
  <img src="./public/assets/img/screenshots/recentMenuImg.png"/>
</details>

## ⚙️ 사용 기술 및 협업 도구 ⚙️

  <table>
    <tr>
      <th>분류</th>
      <th>툴</th>
    </tr>
    <tr>
      <td><strong>언어 / 스타일</strong></td>
      <td>
        <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
        <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td><strong>개발 환경</strong></td>
      <td>
        <img src="https://img.shields.io/badge/VISUAL%20STUDIO%20CODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
        <img src="https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
        <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td><strong>API</strong></td>
      <td>
        <img src="https://img.shields.io/badge/kakaoMap%20API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black"/>
        <img src="https://img.shields.io/badge/OpenWeather%20API-0096C7?style=for-the-badge&logo=OpenWeather&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td><strong>협업 / 배포</strong></td>
      <td>
        <img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=git&logoColor=white"/>
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
        <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
        <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>
        <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"/>
      </td>
    </tr>
  </table>

## JSIX 구성원

<table>
  <tr>
    <td align="center"><img src="" width="200"></td>
    <td align="center"><img src="" width="200"></td>
    <td align="center"><img src="" width="200"></td>
    <td align="center"><img src="" width="200"></td>
  </tr>
  <tr>
    <td align="center"><strong>조장</strong></td>
    <td align="center"><strong>조원</strong></td>
    <td align="center"><strong>조원</strong></td>
    <td align="center"><strong>조원</strong></td>
  </tr>
  <tr>
    <td align="center">배희정</td>
    <td align="center">엄현욱</td>
    <td align="center">조한솔</td>
    <td align="center">차형주</td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/hjb0304"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"></a>
    </td>
    <td align="center">
      <a href="https://github.com/noognoog"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"></a>
    </td>
    <td align="center">
      <a href="https://github.com/hansol65"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"></a>
    </td>
    <td align="center">
       <a href="https://github.com/HyungJuCha"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"></a>
    </td>
  </tr>
</table>

## 💭 프로젝트 소감

  <table>
    <tr>
      <th>팀원</th>
      <th>소감</th>
    </tr>
    <tr>
      <td > 희정</td>
      <td></td>
    </tr>
    <tr>
      <td > 현욱</td>
      <td></td>
    </tr>
    <tr>
      <td > 한솔</td>
      <td></td>
    </tr>
    <tr>
      <td > 형주</td></td>
    </tr>
  </table>
