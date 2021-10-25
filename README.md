# SSACOIN

- SSACOIN은 이더리움 기반 블록체인으로 만들어진 코인입니다.
스마트 컨트렉트를 이용한 안전 P2P거래를 지원합니다.  
- SSAFY활동을 통해 얻은 마일리지는 곧 코인이 되어,
상품으로 받은 쿠폰이외에 내가 사고 싶은 쿠폰을 구매하실 수 있습니다!  

- URL

 [SSA COIN](http://j5c202.p.ssafy.io)


-- 프로젝트 산출물

[포팅메뉴얼](./exec/포팅_메뉴얼.pdf)

<br>

## 🚩 프로젝트 기간


**2021년 8월 30일 ~ 2021년 10월 8일**


<br>

## 🎙️ 프로젝트 설명


**블록체인 스마트 컨트랙트 활용한 기프티콘 거래 플랫폼**

```markdown
블록체인 적용 부분

- 싸피 마일리지를 블록체인 기반 가상 화폐로 사용
- 스마트 컨트랙트로 안전한 기프티콘 구매
- 스마트 컨트랜트로 기프티콘 중고거래
```

<br>

### 사용자

- 사용하지 않거나 마감기간 안에 쓸 수 없는 기프티콘을 안전하게 거래하고 싶다면?
    
    → Market에서 P2P 중고거래
    
- 나의 마일리지로 내가 원하는 기프티콘을 사고 싶다면? → Shop에서 기프티콘 구매
- 나의 소중한 기프티콘을 안전하게 관리하고 싶다면? → MyCoupon에서 기프티콘 관리


<br>

### 관리자

- 기프티콘 승인 요청 처리와 승인 완료 관리를 한번에 !


<br>

## 👩‍💻 제공 서비스


- 중고 거래 등록
- 중고 거래 구매
- 쿠폰샵에서 기프티콘 구매
- 마이 쿠폰 보관
- 나의 정보
- 관리자 구매 요청 관리
- 관리자 마일리지 전송


<br>

## 🛠️ 사용된 기술 스택 (프론트엔드)


- **React**
- Redux
- ESLint (Airbnb) + Prettier
- Javascript, HTML, SCSS
- Bootstrap


<br>

## 🛠️ 사용된 기술 스택 (백엔드)


- **Spring boot**
- Spring Security
- JWT Token
- Redis
- JPA
- QueryDSL


<br>

## 🛠️ 사용된 기술 스택 (배포)


- 가상머신 - docker
- 블록체인 - geth, Web3j
- CI/CD - Jenkins
- Database - MariaDB
- 웹 서버 - Nginx


<br>

### ESLint

---

`문법이나 코딩 스타일을 규정에 맞게 작성`될 수 있도록 도와주는 역할

- The pluggable lining utility for javaScript and JSX

[ESLint - Pluggable JavaScript linter](https://eslint.org/)


<br>

### Prettier

---

`코드 포맷터가 주관을 가지고 의도적으로 바꾸는` 역할

> 쓰는 이유는?
> 
- JSX 코드들을 작성하다보면 코드가 길어지기도 하는데, 코드를 잘라서 예쁘게 밑으로 내려주는 등의 수정을 해주어서 리액트 이후에 인기가 많아짐.
- An opinionated code formatter

[Prettier · Opinionated Code Formatter](https://prettier.io/)


<br>

### Redux

---

state를 이용해 웹 사이트 혹은 애플리케이션의 `상태 관리`를 해주는 역할

- LocalStorage와 SessionStorage의 storage를 redux에서 사용하게 해주는 `Redux-Persist 라이브러리` 추가
- 해당 프로젝트에서는 로그인 여부와 사용자 정보를 관리해주고 있음.


<br>

### Web3j

---

Java에서 블록체인 네트워크에 접속할 수 있는 라이브러리 

[Web3j](https://docs.web3j.io/4.8.7/)


<br>

### Spring Security

---

[Spring Security](https://spring.io/projects/spring-security)


<br>

### Redis

---

[Redis](https://redis.io/)


<br>

## 🛠️ 협업툴


- Gitlab → 코드 형상 관리
- Notion → API 문서
- JIRA → 프로젝트 관리
- Slack & Metamost → 프로젝트 관련 파일
- Figma → 와이어 프레임
- Whimsical wireframe → 컴포넌트


<br>

## 메인 컬러


![11](/uploads/68881eea5a31b3af54a6f4be57cdfa51/11.png)

싸피 홈페이지([edu.ssafy.com](http://edu.ssafy.com/))를 바탕으로 메인 컬러 지정.

- Blue - 3396F4
- yellow - FFE651
- green - 9ADA94


<br>

## 와이어 프레임

> Figma - WireFrame
> 

![12](/uploads/cbcf24ccc581889efc18f6a411a93cc2/12.png)


[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F3HQdkeSSiXptyXSsBoVh6Q%2F%ED%8A%B9%ED%99%94-PJT-Front%3Fnode-id%3D0%253A1](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F3HQdkeSSiXptyXSsBoVh6Q%2F%ED%8A%B9%ED%99%94-PJT-Front%3Fnode-id%3D0%253A1)


<br>

## 📚 React 파일구조

- 다양한 컴포넌트들을 만들어서 사용하는 React인 만큼, 개발 시작 전에 전체적인 구조를 잡고 개발 중 혼란이 없도록 하였습니다.
- 웹사이트의 통일성과 컴포넌트 재사용을 위해 Common 컴포넌트들을 미리 기획하고 한 폴더 내에서 관리 할 수 있도록 하였습니다.

> API
> 

![13](/uploads/f6102daceb8c5e12b994b2d964f7eed1/13.png)


> Component
> 

![17](/uploads/400d2e66bedffc478cdced8d8f24f888/17.png)

> Redux
> 

![20](/uploads/05a15e73e28993456174d2ec0c69d132/20.png)

## 📚 배포 구조

![19](/uploads/d6b7ab00c9d1d5b77b8f885baeb5f5f4/19.png)
