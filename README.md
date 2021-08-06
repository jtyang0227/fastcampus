# 학습 정리

### 개발 환경
* nodeJS
* IDE : webstorm
* bundler : parcel
* css library : tailwindcss, font-awesome

---
### 데이터 유형 정의의 중요성
데이터 유형의 설명이 명확하지 않다면, 변경할 데이터를 검증을 위해서 문서, 확인사항이 많습니다.  만약에 확인을 했지만 그 정보가 정확하지 않을 경우도 있습니다.
> 코드 자체의 데이터 유형을 잘 설명할 수 있도록 정의 하는게 중요합니다.

### 해커뉴스 앱 만드는 이유 
입력데이터(input)가 다양하고 많을 수 있고 출력하는 형식(output)이 많일 수 있겠지만,
"입력을 출력으로 바꾸는 것"을 이해 하기 위해 입니다.

### 라우터
사용자가 노출될 화면 전환을 중계해준다.

## 타입스크립트

### 환경 설정 
```json
{
    "compilerOptions": {
      "strict": true,
      "module": "commonjs",
      "target": "es5",
      "sourceMap": true,
      "alwaysStrict": true,
      "noImplicitAny": true
    },
    "exclude": [
      "node_modules"
    ]
}
```

### type alias(타입 별칭)
``` ts
type Store = {
  currentPage: number;
  feeds: NewsFeed[];
} 
```


### type와 interface는 타입결합 하는 방식이 틀리다.
* 교차타입 사용때 유니언 타입(Union Types)을 사용합니다. 이럴때 interface 지원을 안하기 때문에 type을 사용합니다.

```
type NewsComment = News & {
  comments: NewsComment[];
  level: number;
}

interface NewsComment extends News {
  comments: NewsComment[];
  level: number;
}
```

readonly : 사용하면 값을 변경못하고 읽기만 가능하다.

### modules
import/export 이용해서 캡슐화를 진행합니다.

### 안전한 전역상태 관리
> 모두가 가능한 전역상태는 전역 공간은 가능하면 쓰지않는 것이 좋습니다.

### 비동기
>Promise : 실행 코드가 완료될때까지 순차적으로 기달리는게 아니라, 다음 코드를 수행하는 것
* 대기(pending): 이행하거나 거부되지 않은 초기 상태.
* 이행(fulfilled): 연산이 성공적으로 완료됨.
* 거부(rejected): 연산이 실패함.

![img.png](img.png)
출처 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise

async/await : axios를 사용하기 전에 Promise 숙지하고 사용하는걸 권장합니다.