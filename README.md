# YOUTUBE-STUDY
## Objective
Link: https://simple-youtube-study.netlify.app/

유튜브 영상으로 개인 공부를 하기 위해 커리큘럼을 구성하는 당신..!!   
영상에 대해 진도표시와 메모를 추가하고 관리하고 싶은 당신!!
  
이제는 **YouTube-Study** 로 커리큘럼을 구성하세요! 
  
단순히 영상만 모을 수 있는 유튜브 재생목록을 보고

아쉬운 점이 있어서 개발하게 되었습니다!


의견 추가라던지 진도에 대한 내용이라던지 
사설 인강 사이트 처럼 자신만의 **Comment** 를 추가 할 수 있습니다

영상은 유튜브에서 제공합니다
관리는 **YouTube-Study** 여기에서 하시면 됩니다!
  
당신의 독자적인 학습환경을 위해 비밀번호를 설정해서 Private 하게 만들수도 있습니다.  
또한 같은 방이름으로 비밀번호를 달리하여 여러개의 방을 사용 할 수 있습니다
  
---
## 개발 환경
### Core Framework
![React](https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB)

**사용근거** : 영상 카드와 커리큘럼은 반복적인 요소이므로 컴포넌트를 사용하여 재활용하고 

React Hook Form 과 같은 라이브러리를 사용하여 유효성 검사 및 전사적 관리를 하고 싶어서 React를 사용했습니다.

![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**사용근거** : TypeScript를 활용하여 사용자 정보, 영상 정보의 타입을 약속하기 위해서 사용했습니다.

이렇게 타입을 정하면 함수를 사용할 때 인자로 들어갈 정보의 타입이나 값을 누락시키는 실수를 피할 수 있습니다. 

![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

**사용근거** : Firebase와 함께 사용하여 데이터 베이스에 요청해서 받아온 정보를 cashing 하여 동일 요청을 피할 수 있고

필요에 따라 캐시타임을 조절 할 수 있습니다. 

### Design
![MUI](https://img.shields.io/badge/MUI-0081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-007ACC?style=for-the-badge&logo=css3)

**사용근거** : 디자인 라이브러리를 사용하여 CSS만의 의존도를 낮추되

큰 틀에서 필요한 레이아웃 스타일, 커스터 마이징이 필요한 부분은 CSS를 활용했습니다.

### Backend/Hosting
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Netlify Status](https://api.netlify.com/api/v1/badges/f15f03f9-55d8-4adc-97d5-f6e085141610/deploy-status)

**사용근거** : 유저 및 영상정보는 Firebase가 들고 있게하여 요청시 실시간으로 주고 받기 용이하게 하였습니다 (소켓통신)

호스팅은 Netlify를 이용하였는데 커리큘럼을 구상해두면 이후 변동성이 크지 않을것으로 예상되어 정적 웹 호스팅을 하였습니다.

---
## 사용 방법

### 데모 입장

![유튜브 데모](https://user-images.githubusercontent.com/85422934/196579003-fb0426cf-1f28-4534-848d-45eefb4a4669.png)

먼저!! 데모를 통해 유튜브 커리큘럼을 체험해보세요!


### 초기 입장

![첫 화면](https://user-images.githubusercontent.com/85422934/195775710-05aed1d6-0363-4f1e-8d08-7677805ab589.png)

원하는 **방 이름**을 입력해주세요

**private**를 원하거나 같은 방의 **반달**을 방지 하고 싶으면 비밀번호를 입력해주세요

( 비밀번호는 방을 구분하기 위한 용도 입니다. )




### 메인 화면

![메인 화면](https://user-images.githubusercontent.com/85422934/195776904-a6b393c6-96fa-47f6-9fe0-50d114672143.png)

화면 우측 하단의 추가 버튼을 눌러서 강의를 추가 할 수 있습니다.




### 강의 추가

![youtube study form](https://user-images.githubusercontent.com/85422934/195777077-8799be2d-b361-4f53-a82a-9c3709945f44.png)

양식에 영상 정보를 기록 할 수 있습니다.
내용은 언제든지 수정 가능합니다.

영상 번호는 순서를 결정합니다.
카테고리는 커리큘럼 이름 입니다. 




### 학습 페이지

![학습 페이지](https://user-images.githubusercontent.com/85422934/200269029-9fe65600-a292-4737-9d81-eda832c04881.png)


카테고리별로 강의가 배열되고 캐러셀을 이용하여 넘기면서 영상을 찾을 수 있습니다.

카드의 제목을 눌러서 완강을 표시하세요!!

카테고리에서 전체 강의수, 완료한 강의수를 볼 수 있습니다.


![빠른 추가](https://user-images.githubusercontent.com/85422934/200270214-4a7328f9-c891-4fa9-ba94-b16989d66793.png)


빠른 추가를 이용하면 카테고리와 순서가 자동완성 됩니다. 

제목과 영상 링크만 입력해주세요!!



### 영상 시청

![youtube study play](https://user-images.githubusercontent.com/85422934/195777998-d8c34cce-205d-48e1-8d4d-df9056327f46.png)

카드의 유튜브 버튼을 누르면 모달을 통해 영상을 시청하실 수 있습니다.

유튜브 홈페이지에서 영상 시청을 하고 싶은 분들을 위해 링크기능도 지원하였습니다.


---
## 향후 업데이트 계획

1. 유튜브 썸네일을 바로 확인할 수 있게 카드 수정

2. 영상의 순서를 드래그 앤 드롭 기능으로 바로 수정

3. 유튜브 재생목록에서 링크 동기화

4. 본인만의 암호화 확인 방식을 도입하여 비밀번호 찾기 기능 추가







