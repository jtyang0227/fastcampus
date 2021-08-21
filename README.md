# 학습 정리

#### 개발 환경
* nodeJS
* IDE : webstorm
* bundler : parcel
* css library : tailwindcss, font-awesome

---
#### 데이터 유형 정의의 중요성
데이터 유형의 설명이 명확하지 않다면, 변경할 데이터를 검증을 위해서 문서, 확인사항이 많습니다.  만약에 확인을 했지만 그 정보가 정확하지 않을 경우도 있습니다.
> 코드 자체의 데이터 유형을 잘 설명할 수 있도록 정의 하는게 중요합니다.

#### 해커뉴스 앱 만드는 이유 
입력데이터(input)가 다양하고 많을 수 있고 출력하는 형식(output)이 많일 수 있겠지만,
"입력을 출력으로 바꾸는 것"을 이해 하기 위해 입니다.

#### 라우터
> 사용자가 노출될 화면 전환을 중계해준다.

## 타입스크립트

#### 환경 설정 
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

#### type alias(타입 별칭)
``` ts
type Store = {
  currentPage: number;
  feeds: NewsFeed[];
} 
```


#### type, interface 타입결합 하는 방식이 틀리다.
* 교차타입 사용때 유니언 타입(Union Types)을 사용합니다. 이럴때 interface 지원을 안하기 때문에 type 사용합니다.

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

#### modules
import/export 이용해서 캡슐화를 진행합니다.

#### 안전한 전역상태 관리
> 모두가 가능한 전역상태는 전역 공간은 가능하면 쓰지않는 것이 좋습니다.

#### 비동기
>Promise : 실행 코드가 완료될때까지 순차적으로 기달리는게 아니라, 다음 코드를 수행하는 것
* 대기(pending): 이행하거나 거부되지 않은 초기 상태.
* 이행(fulfilled): 연산이 성공적으로 완료됨.
* 거부(rejected): 연산이 실패함.

![img.png](img.png)
출처 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise

async/await : axios 사용하기 전에 Promise 숙지하고 사용하는걸 권장합니다.

---
# Basics
#### TypeScript 자료형
* Boolean (불리언)
* Number
* String
* Array
* Tuple (튜플)
* Enum (열거)
* Any
* Void
* Null and Undefined
* Never
* Object (객체)

#### javascript, typescript 비교
> 사용자가 사용하는 "런타임"아닌 개발자가 "컴파일 타임"시점에 타입을 확인하는 것, 타입스크립트의 장점입니다.

```javascript
// javascript
function addAge(age) {
  return age + 1;
}

let age = addAge('30');

console.log(age); // 301
```
```typescript
// typescript
function addAge(age: number): number {
  return age + 1;
}

let age: number = addAge('30'); // type error

console.log(age);
```


#### 비교연산자
```javascript
if(a == b) {}; // 동등연산자, 추상적(abstract)
if(a === b) {}; // 일치연산자, 엄격한(strict)
```
#### ES6 문법
```javascript
// 구조분해 할당
const colors = ['red', 'yellow', 'black'];
const colorsObj = {
  blue: 'blue',
  green: 'green',
  white: 'white'
}
const [red, yellow, black] = colors;
const { green, blue } = colorsObj;
```
---
### _6_
#### interface (인터페이스)
```typescript
interface UserInfo {
  name: string;
  age: number;
}

function setUserInfo(userInfo: UserInfo) {
    console.log(userInfo.name);
}

let myInfoObj = { name: 'jetty', age: 100 };

setUserInfo(myInfoObj);
```


#### Type Alias (타입 별칭)
```typescript
type UserInfo = {
  name: string,
  age?: number
}

// 빈 객체를 Person 타입으로 지정
const userInfo = {} as UserInfo;
userInfo.name = 'yang';
userInfo.age = 3000;
userInfo.address = 'Seoul'; // Error
```


#### 객체 타입을 규격화
```typescript
export interface IOnlyNumberValueObject {
  [key: string]: number;
}

export interface IGetApi {
  (url: string, search?: string): Promise<string>;
}
```


#### 선택적 프로퍼티 (Optional Properties)
```typescript
interface UserInfo {
  name: string;
  age: number;
  address?: string;
}
```
>  address? 물음표(Optional Properties)는 값은 필수값은 아니지만, 만약에 값이 있는 경우에는 정의된 타입과 일치해야합니다.
---
### _7_
#### 함수 호출 방식
```typescript
// 예제는 context는 null 선언했습니다.
myFn();
myFn.call(null, 1, 2, 3);    // 전달인자: 일반 값
myFn.apply(null, [1, 2, 3]); // 전달인자: 배열 값
```
* call(), apply() 공통적으로 context 객체가 존재합니다.


#### 화살표 함수 (arrow function) - "한 줄 함수"라고도 불립니다.
```typescript
const a = () => 100;
const b = x => x * 100;
const c = (x, y, z) => {
  y + x * z
};
```


#### 제너레이터 (generator)
```typescript
function* foo() {
  yield 10;
  yield 20;
  return 30;
}

const gen = foo();

gen.next();
gen.next();
gen.next();
```
---
### _8_
#### 인자로 전달되는 함수
> 함수형 프로그래밍 : 기능 요청 시 동일한 기능을 항상 출력해서 반환합니다.
```typescript
function ul(child: string): string {
  return `<ul>${child}</ul>`;
}
function ol(child: string): string {
  return `<ul>${child}</ul>`;
}

// start
function makeLI(
  container: (child: string) => string,
  contents: string[]
): string {
  const liList = [];

  // 1. li 태크 생성
  for (const content of contents) {
    liList.push(`<li>${content}</li>`);
  }
  // 2. container(ul, ol) 추가
  return container(liList.join(''));
}

// 3. 값 할당
const htmlUL = makeLI(ul, ['월', '화','수', '목', '금', '토', '일']);
const htmlOL = makeLI(ol, ['봄', '여룸', '가울', '겨울']);

// end
console.log(htmlUL);
```
---
### _14_
#### 비동기
> axios : Promise 기반으로 됩니다.
* promise : ES6 에서 비동기 처리를 위해 사용되는 객체입니다.
```typescript
function test() {};

async function foo() {
  try {
    const result = await test();
  } catch (e) {
    console.log("ERROR : "+e);
  } finally {
    console.log("finally");
  }
}
```
---
### _16_
#### 데이터의 객체 (date Object)

```typescript
type Box = {
  width: number;
  height: numberl
  borderRadius: number;
  borderWidth?: string;
  backgroundColor: string;
  color?: string;
  ['className']?: string;
}

// 객체 리터럴
let box: Box = {
  width: 200,
  height: 200,
  borderRadius: 10,
  backgroundColor: 'red'
};

// 함수로 객체 생성
function makeBox(
  width: number,
  height: number,
  borderRadius: number,
  backgroundColor: string
): Box {
  return {
    width,
    height,
    borderRadius,
    backgroundColor
  };
}
makeBox(100, 100, 10, 'red');

// 클래스로 객채 생성
class Shape implements Box { // type Box
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
  
  constructor(
    width: number,
    height: number,
    borderRadius: number,
    backgroundColor: string
  ) {
    this.width = width;
    this.height = height;
    this.borderRadius = borderRadius;
    this.backgroundColor = backgroundColor;
  }
}
const boxShape = new Shape(10, 10, 5, 'red');

// 클래스의 규격을 파악하는 방법
if(boxShape instanceof Shape) {
  
};

box.borderRadius = 10;
box.color = 'blue';
box['className'] = 'boxName';

// 객체 변형
// 1 assign(n, box) : n에서 box를 추가합니다.
const box1 = box;
const box11 = Object.assign({}, box);

// 2 ... 전개 연산자(Spread Operator)를 이용해서, color를 추가합니다..
const box2 = { ...box, color: 'red' };

// 3 파싱 진행해서 변형 (문자열 > 객체)
const box3 = JSON.parse(JSON.stringify(box));
```
* 보통 전개 연산자(Spread Operator)을 사용합니다.
---
### _18_
#### array (배열)
```typescript
const books = [];
books[0] = '원피스';

// 추가
books.push('루피');
books.push('조로');
books.push('상디');
books.push('프랑키');

// 맨 뒷에 데이터(프랑키) 빠진다.
books.pop();

// 데이터 자르기
books.slice(1, 2); // 루피만 빠진다.

// 데이터를 빠지고 추가합니다.
books.splice(1, 2, '나미', '쵸파'); 

// 0번째 데이터 빠진다.
books.shift();

// 맨 앞에 데이터를 추가한다.
books.unshift('드래곤볼');

// 배열은 하나의 문자열로 합친다.
const booksJoin = books.join() // 기본옵션 : , (콤마)

// , 이용해서 배열을 만듭니다.
booksJoin.split(',') 

// 배열들끼리 합치는 방식
const book1 = [1];
const book2 = [2, 3]
book1.concat(book2); // [1, 2, 3], 배열 순서 : book1 + book2

// 전개 연산자 이용
const nextBookList = [...book1, ...book2];
```
---
### _19_
#### 배열 연산
##### forEach(), map(), filter()
```typescript
type Book = {
  title: string;
  copyrigth?: string;
  author?: string;
}
const books: string[] = [
  '원피스',
  '드래곤볼'
];
// 1 forEach()
books.forEach((book: string, index: number) => {
  console.log(book, index);
});


// 2-1 map() : 입력값을 map()을 이용해서, 데이터를 받아서 다른 형태(객채)로 변환하는데 자주 사용합니다.
const bookOjbects: Book[] = books.map((book: string) => {
  // 객채를 전달
  const result = {title: book, author: undefined};
  return result;
})
console.log(bookOjbects);

// 2-2 map & map
const ShakespeareOneBooks: Book[] = books
  .map((book: string) => ({
    title: book
  }))
  .map((book: Book) => ({
    ...book,
    author: undefined
  }))

console.log(ShakespeareOneBooks);


// 3-1 응용 방식 (재사용성)
const bookTitleToBookObject = (book: string) => ({title: book});

// 3-2 커링 기법 (6장_일급 함수)
const makeAuthor = (name: string) => (book: Book) => ({
  ...book,
  author: name
})

const shakespeareOneBooks2: Book[] = books
  .map(bookTitleToBookObject)
  .map(makeAuthor('베르세르크'));

console.log(shakespeareOneBooks2);


// 4. filter() : 특정 키값인해 필터링같은 방식으로 사용합니다.
const one: Book[] = shakespeareOneBooks2.filter((book: Book) =>
  book.title.includes('원'); // 원으로 시작하는 값을 찾습니다.
)
console.log(one);


// 5-1. reduce() : 배열[n] 안에 있는 합산
const someNumbers: number[] = [100, 20, 1, 2];
const sumNumber = someNumbers.reduce((a: number, b: number) => a + b, 0);
console.log(sumNumber); // 123

type SomeObject = {
  [key: string]: string | number;
}

const someObjects: SomeObject[] = [
  { border: "none"},
  { fontSize: 24},
  { className: 'box sm-box'}
]

// 5-2 객체들도 합산 가능합니다.
const someObject: SomeObject = someObjects.reduce(
  (a: SomeObject, b: SomeObject) => ({...a, ...b}),
  {}
);

console.log(someObject); // border + fontSize + className

// 5-3 가변인자 응용 : ...ages
function sumNumbersForTypeScript(...ages: number[]): number {
  return ages.reduce((a: number, b: number) => a + b, 0);
}

console.log(sumNumbersForTypeScript(100, 20, 1)) // 121
```
---
### _20_
#### Tuple (튜플)

```typescript
// 배열안에 각각 원소(인자)의 타입을 규정한 테이터 타입
const address: [number, string, string] = [123, '서울시', '송파구'];

type BookInfo = [string, string, number];

const BooksData: BookInfo[] = [
  ['루피', '원피스', 1000],
  ['루피', '원피스', 1000]
];

BooksData.push([1, 'B', 30]); // 1번째 인자는 type error

type Address = [number, string, string];
function getArray(): Address {
  return [123, '서울', '송파구'];
}
```
### _21_
#### class
> 객체를 정교하게 생성하는 방식, ES6 이후 클래스 문법이 추가됬습니다.

```typescript
interface Container {
  tagName: string;
  className: string;
  children?: string[];
  getTageName: () => string;
  getClassName: () => string;
}

// 상위 클래스
class Shape {
  // static : 정적 데이터
  public static MIN_WIDTH = 0;
  public static MAX_WIDTH = 100;

  // readonly : 읽기만 가능, 외부에서 변경 불가
  public readonly name: string = 'Shape';
  
  // protected : class안에 자식 클래스까지만 허용니다.
  protected _borderWidth: string;
  
  // private : 클래스(Shape)에서만 허용합니다.
  private action: string;

  constructor(borderWidth: number = 0) {
    this._borderWidth = borderWidth;
  }

  // abstract : 추상 클래스, 현재는 클래스는 정의만 되있습니다.
  abstract area: () => number;

  set borderWidth(width: number) {
    if (width >= Shape.MIN_WIDTH && width <= Shape.MAX_WIDTH) {
      this._borderWidth = width;
    } else {
      throw new Error('실패!');
    }
  }

  get borderWidth(): number {
    return this._borderWidth;
  }
}

// 하위 클래스
class Circle extends Shape { // 상속
  // private : 내부의 값은 보호합니다.
  private _radius: number;
  // 부모의 값을 재정의 가능합니다. (override)
  public readonly name: string = 'Circle';

  constructor(radius: number) {
    super(); // Shape(부모 호출) 초기화합니다.
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  // 부모에 선언한 추상 클래스의 실제 구현부입니다.
  area = () => this._radius * this._radius * Math.PI;
}

// 하위 클래스
class Rect extends Shape {
  private _width: number;
  private _heigth: number;
  public readonly name: string = 'Rect';

  constructor(width: number, height) {
    super(); // Shape(부모 호출) 초기화합니다.

    this._width = widths;
    this._heigth = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._heigth;
  }

  // 부모에 선언한 추상 클래스의 실제 구현부입니다.
  area = () => this._width * this._heigth;
}

const circle = new Circle(100);
const rect = new Rect(200, 100);

// 인터페이스를 이용해서 제공되면, 클래스 만드는 걸 도와줍니다.
// public만을 제공합니다. 참고로 private, protected 제공되지않고 class에서만 제공됩니다.
class MyContainer implements Container {
  tagName: string;
  className: string;

  constructor(tageName: string, className: string) {
    this.tagName = tageName;
    this.className = className;
  }
  
  getTageName = () => this.tagName;
  getClassName = () => this.className;
}
```
### _22_
#### instance (인스턴스)
> 함수로 인스턴스 객체 생성이 가능합니다,하지만 인스턴스 객체를 생성하는 것이 가독성이나 편의성 클래스를 권장합니다.
```typescript
// function 문법
function CartV1() { // 함수이지만 CartV1 맨 앞글자 대문자로해서 new 생성하도록 유도합니다.
  this.cart = [];
  this.currentId = 0;
}

CartV1.createItem = function (name: string, price: number) {
  return {
    name, price
  };
};

CartV1.prototype.getNewId = function () {
  this.currentId++;
  return this.currentId;
}

CartV1.prototype.addItem = function (item) {
  this.cart.push({
    ...item,
    id: this.getNewId(),
  })
}

CartV1.prototype.clearCart = function () {
  this.cart = [];
  this.currentId = 0;
}
const shoppingCarV1 = new CartV1();
shoppingCarV1.addItem(CartV1.createItem("수박", 2000))

// class 문법
class CartV2 {
  // static :  정적 메소드
  static createItem = (name: string, price: number) => {(
      name, price
    )
  };

  cart;
  currentId;
  
  constructor() {
    this.cart = [];
    this.currentId = 0;
  }
  
  getNewId = () => {
    this.currentId++;
    return this.currentId;
  }
  
  addItem = item => {
    this.cart.push({})
      ...item,
      id: this.getNewId(),
  }
  
  clearCart = () => {
    this.currentId = 0;
    this.cart = [];
  }
}

const shoppingCarV2 = new CartV2();

shoppingCarV2.addItem(CartV2.createItem('바나나', 1000))
```
### _23_
#### prototypes (프로토타입)
```typescript
function Foo(name: string) {
  this.name = name;
  this.__proto__ = Foo.prototype;
}

// 객체(Foo)의 상속관계에 상속된 객체를 추가합니다.
Foo.prototype.lastName = 'wow';

const f = new Foo('jetty');
console.log(f.name); // output : 'jetty'
console.log(f.lastName) // output : 'wow'
```
### _24_
#### Context (컨텍스트)
* Execution Context (실행 컨텍스트) 기본 컨텍스트입니다. // Execution : 호출

```typescript
const person = {
  name: 'jetty yang'
  age: 100,

  getAge() {
    return this.age;
  }
};

person.age;
person.getAge(); // this(person) 확인되었습니다. output : 100

const age = person.getAge;

// age(); // this의 아무것도 확인 안되므로, 접글 불가

// 메소드 2가지 방식으로 this(주최)를 호출합니다.
age.call(person);
age.apply(person);

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = nmae;
    this.age = age;

    // bind 고정적으로 this 할당해줍니다.
    this.getAge = this.getAge.bind(this);
  }
  
  getAge() {
    return this.age;
  }
  
  // arrow function으로 고정값 줍니다.
  getName = () => this.name;
};

const p1 = new Person('jtYang', 200);
p1.getAge();

const myAge = p1.getAge;
// myAge.call(p1);
myAge(); // bind 인해 call() 사용안해도 됩니다.

// arrow function
p1.getName();
```
### _25_
#### Closure (클로저)
> 함수 안쪽에서 함수를 생성해서 반환시점에 데이터 공간(Closure)에 값을 저장합니다.
##### 장점
* 함수가 전달(리턴)돼도 특정 값을 보호하면서 값을 사용합니다.
* 바깥공간에서 saveNumber 접글할 방법이 없습니다.
* javascipt에서는 값을 보호하는 방식으로 사용합니다. 그렇지만 typescipt에서는 class안에서 private 접근 제한자를 사용하면 끝.
```typescript
function increment() {
  let saveNumber = 1; // local 값은 반환시점에 없어집니다.
  
  // 함수로 값을 반환하는 방식
  return function () {
    return saveNumber++;
  };
}

const inc = increment();

console.log(inc()); // output : 1
console.log(inc()); // output : 2

class myOjb {
  private saveNumber: Number;
}
```
### _26_
#### Generic (제너릭)

```typescript
type User = {
  id: string;
  name: string;
}

type Address = {
  zipcode: number;
  address: string;
}

function plpeOne(value: any): any {
  return value;
}

let p1 = plpeOne(10); // output : 1 (type : number)

function plpeTwo<T>(value: T): T {
  return value;
}

// input type인해 type 추론을 됩니다.
let p2 = plpeTwo('10'); // output : 1 (type : string) 

const plpeObjectOne = <T>(obj: T): T => {
  return obj;
}

let po1 = plpeObjectOne({id: 1, name: '루피', zipcode: 1111});

// User type으로 타입(제너릭) 확정합니다.
let po2 = plpeObjectOne<User>({id: 1, name: '루피', zipcode: 1111});


// 1. 클래스 이용 방식
class State<S, Config={}> {
  private _state: S;
  config: Config;

  constructor(state: S, config: Config) {
    this._state = state;
    this.config = config;
  }
  
  getState(): S {
    return this._state;
  }
}

let s1 = new State<Address, { active: boolean}>({
  // 1번째 인자
  zipcode: 1000,
  address: '서울시',
}, {
  // 2번째 인자
  active: true
});

const s1Data = s1.getState();

// s1Data. 만 작성하면 zipcode OR address를 추론해서 자동완성기로 제공해줍니다.
console.log(s1Data.zipcode, s1Data.address);

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = {a: 1, b: 2, c: 3};
getProperty(x, 'a');
getProperty(x, 'm'); // K(key)값에 'm' 없으므로 error입니다. 

// 2. 인터페이스 이용 방법
interface KeyPair<T, U> {
  key: T;
  value: U;
}
// KeyPair의 타입을 직접 확정합니다.
let kv1 = KeyPair<number, string> = {key: 1, value: 'yang'};
let kv2 = KeyPair<number, number> = {key: 1, value: 9999};
```
### _27_
#### type guard (타입 가드)
```typescript
function duubleTypeFunction(a: number | string) {
  if (typeof a === 'string') {
    return a.replace('a', "X");
  }
  
  return a.replace('Y', 'y'); // error
}

function fooGuard(a: number | null) {
  if (a === null) return;
  
  console.log(a?.valueOf());
}
interface Foo {
  foo: string;
  common: string;
}
// 도움 함수(헬퍼 함수)
function isFoo(arg: any): arg is Foo {
  return arg foo !== undefined;
}

console.log(isFoo({
  foo: 'OK',
  common: 'wow',
  active: false
}))
```
### _28_
#### @types
> uuid 기본적 typescript 제공하지 않는다. 그래서 해결방법은 @types/uuid
> 만약에 라이브러리가 typescript 안하는 경우에는 **@types** 이용하면 쉽게 제공 받을 수 있습니다.
```typescript
// uuid 
// npm install uuid 
// npm install @types/uuid
import { v4 } from 'uuid';
type UniqObj = {
  id: string;
  [key: string]: string | number | boolean;
}
const makeObj = (): UniqObj => ({
  id: 999
});

console.log(makeObj()); // 999
```
### _29_
#### JSON (JavaScript Object Notation)
> 비동기 브라우저/서버 통신 (AJAX)을 위해, 넓게는 XML(AJAX가 사용)을 대체하는 주요 데이터 포맷이다
```typescript
const jsonString =  `
    {
      "name": 'jetty',
      "age": 123,
      "address": "b"
    }
`;
try {
  const myJson = JSON.parse(jsonString);
  console.log(myJson);
  console.log(JSON.stringify(jsonString));
} catch (e) {
  console.log("error")
}
```
### _30_
#### Scope (스코프)
> 함수(블록)을 진입할 때  생성
* 전역 스코프
* 함수(지역) 스코프
* 블록 스코프
```typescript
let myName = 'yang';

function myFoo() {
  let x = 10;
  
  console.log(myName) // output : 'yang'
  console.log(x);
  
  bar(); // 호이스팅 : 스코프안에 미리 만들어져 있어서 밑에 bar()가 있어도 호출이 가능합니다.
  zoo(); // 함수식이라 호출 안됩니다.
  
  // 함수문
  function bar() {
    let y = 100;
    
    console.log(x); output : 10
    console.log(myName); // output : 'yang'
  }
  
  // 함수식
  const zoo = function () {
    alert('zoo');
  }
  
  if (x === 10) {
    let x = 1;
    
    console.log(x); // 1
  }
  
  console.log(y) // error
  bar();
}

myFoo();
console.log(x); // error
```
---
### _31_
#### 동기, 비동기
```typescript
function double(x) {
  retrun x * 2;
}

const x = double(100);
const y = x;

// 2
function calcValue() {
  setTimeout(() => {
    return a + b;
  }, 100);
}

// 3
const r = calcValue(10, 20, (result) => {
  console.log(result); // output : 30
});

// 1
const z = r; 

// Promise 사용 방식
const promise = new Promise((resolve, reject) => {
  // 성공
  // resolve('OK');
  setTimeout(() => {
    resolve('OK');
  }, 2000)
  
  //실패 
  // reject('fail');
  setTimeout(() => {
    reject('실패');
  }, 1000)
});

promise.then(function (ok) {
  console.log("1번쨰 성공");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          resolve('2번째 성공');
        }, 2000)
    })
  })
  .then(function (ok) {
    console.log(ok);
  })
  .catch(function (error) {
    console.log(error); // output : fail
  })
```
### _32_
#### DOM (Document Object Model)
> DOM을 사용하는거는 지향하지 않는 방향이다, 그리고 현재 프레임워크, 라이브러리 사용하는 React.js, vue.js에서는 DO을 일체 접근하지 못하는 형태를 취하고 있습니다.
* 작은 애플리케이션이 아닌 규모가 있는 애플리케이션을 만든다고 하면 DOM을 직접 조작하는 행위는 권장하지 않는다.

### _34_
#### 런타임, 컴파일 타임
> javascript로 개발하면 런타임, 컴파일 타입 구분없이 브라우저 랜더링으로 실행됩니다. 하지만 typescript는 런타임, 컴파일 타입 구분 됩니다.
```typescript
function add(x: number, y: number) {
    return x + y;
}

type ObjType = {
    x: number;
    y: number;
}

const json = `{"x": "ABC", "y":20}`;
const jsonObj: ObjType = JSON.parse(json) as ObjType;

// 런타임 시점에 체크하는 방어로직을 필요하다.
add(jsonObj.x, jsonObj.y);
```
### _35_
#### Web API
##### 브라우저 저장소
1. Window.localStorage : 저장한 데이터는 브라우저 세션 간에 공유됩니다
2. Window.sessionStorage : 데이터는 페이지 세션이 끝날 때 제거됩니다
3. History API : 브라우저의 세션 기록에 접근할 수 있는 방법입니다
4. Clipboard API : 잘라내기, 복사, 붙여넣기 같은 응답할 수 있는 기능합니다
5. Canvas API : 엘리먼트를 통해 그래픽을 그리기위한 수단을 제공합니다

URL : https://developer.mozilla.org/ko/docs/Web/API

### _36_
#### polyfill (폴리필)
>  웹 개발에서 기능을 지원하지 않는 웹 브라우저 상의 기능을 구현하는 코드를 뜻한다.
* 라이브러리로는 core-js를 Babel.js 내부에 탑재되서 최신 코드을 이용해서 사용됩니다.

### _37_
#### 순환 연산, n개의 연산
```javascript
const arr2 = [1, 2 , 3, 4]
  .map(n => n * 3)
  .filter(n => n & 2 !== 0)
  .map(n => `<li>${n}</li>`);

console.log(arr2);
```
### _38_
#### protocol (프로토콜)
> 소프트웨어의 규격을 만들어 놓고, 규격 안에서 함수, 클래스를 동작을 만들고 디자인하는 것.

### _39_
#### 이터레이션, 이터러블
```javascript
const myIterable = {};

// Symbol : 유일한(유니크값) 생성하는 기본 값
myIterable[Symbol.iterator] = function* () {
  let i = 1;
  
  while (i <= 100) {
    yield i++;
  }
  
  for (const n of myIterable) {
    console.log(n); // output : 1 2 3 4...
  }
}
```

### _40_
#### 형태의 변환 (객체를 문자열로 변환하기)
```javascript
// 1
const cartItems = [
  {id: 1, item: '원피스', price: 20000, discount: 0 },
  {id: 2, item: '루피', price: 10000, discount: 0 },
  {id: 3, item: '조로', price: 5000, discount: 0 },
  {id: 4, item: '상디', price: 7000, discount: 0 },
]

const cartItemArray = [];

for (const item for cartItems) {
  const row = [];
  
  // Object.entrie : ['id', 1]
  for (const [, value] of Object.entries(item)) {
    row.push(value);
  }
  
  cartItemArray.push(row.join());
}
console.log(cartItemArray.join('==='));

// 2 배열 연산
const valueOfObject = obj => Object
  .entries(obj)
  .map(([, value]) => String(value));

const cartItemString = cartItems
  .map(valueOfObject)
  .join('===')

console.log(cartItemString);
```
### _41_
#### 형태의 변환 (문자열을 형태가 다른 문자열로 변환하기)
```javascript
// 변수, 반복문
function converamleName(name) {
  let camelName = '';
  
  for (let i = 0, newSpace = false; i=name.length; i++) {
    if (name[i] == ' ') { // ' ' : 스페이스
      newSpace = true;
      continue;
    }
    
    if (newSpace) {
      camelName = camelName + name[i].toUpperCase(); // toUpperCase : 대문자
      newSpace = false;
    } else {
      camelName = camelName + name[i].toUpperCase();
    }
    
    return camelName;
  }
}

// 배열 연산
// splitter : 구분자
const simpleCamel = (text, splitter = ' ') => text.split(splitter) // 배열 변환
  .map((word, wi) => word.split('')
    .map((c, ci) => wi > 0 && ci === 0 ? c.toUpperCase() : c.toUpperCase())
    .join(''))
  .join('');


const camelName1 = converamleName('jt yang');
const camelName2 = simpleCamel('jt yang');

console.log(camelName1); // output : jtyang
console.log(camelName2); // output : jtyang
```
---

### _42_
#### 형태의 변환 (Tagged Template : 템플릿)
```javascript
const userName = 'jt yang';
const border = text => `<b>${text}</b>`;

console.log(`
HI!,${userName}
`)
// output : HI!, jt yang 

console.log(`
HELLO, ${border(userName)}
`)
// output : HELLO, jt yang 

function div(strings, ...fns) {
  const flat = s => s.split('\n').join(''); //
  
  return function (props) {
    return `<div style="${flat(strings[0]) + (fns[0] && fns[0](props)) + flat(strings[1])}"></div>`;
  }
}

const DIV = div`
  font-size: 17px;
  color: ${props => props.action ? 'white' : 'gray' };
  border: none; 
`;

console.log(DIV({ active: true }));
```
### _43_
#### 형태의 변환 (객채를 형태가 다른 객채로 변환하기)
```javascript
const sourceObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
}

const targetObj = {
  aGroup: {
    a: 1,
    b: 2
  },
  bGroup: {
    c: 3,
    d: 4,
    e: 5
  }
};

const groupInfo = {
  aGroup: ['a', 'b'],
  bGroup: ['c', 'd', 'e']
};

function makeGroup(source, info) {
  const merge = (a, b) => ({...a, ...b}) // 각 아구먼트 합치기
  
  return Object.keys(info) // Object.keys : into의 key value 가져오기
    .map(group => ({ [group]: info[group] // map 사용해서 key: value 형태 변환
        .map(k => ({ [k]: source[k] })) // map 사용해서 key: value 형태 변환
        .reduce(merge, {}) // 값 합치기
      }))
    .reduce(merge, {}) // 값 합치기
}

console.log(makeGroup(sourceObj, groupInfo)); // output : { aGroup: {'a: 1', 'b: 2'}, bGroup: {'c: 3', 'd: 4', 'e: 5'} }

```
---

### _44_
#### 형태의 변환 (문자열을 객체로 변환하기)
```javascript
class HeaderListData {
  constructor(source, separator = ',') { // separator(구분자) : ,
    const rawData = source.split('\n'); // 엔터마다 값 주입
    
    this.headers = rawData[0].split(separator);
    this.rows = rawData
      .filter((row, index) => index > 0) // 0 보다 크다
      .map(row => row.split(separator));
  }
  
  // 값 정의
  row = index => index.rows[index]
    .map((row, index) => [index.headers[index], row]);
  
  get length() {
    return this.rows.length;
  }
  
  get columnLength() {
    return this.headers.length;
  }
}

// 객체 생성
export default class MakeObj extends HeaderListData {
  toObj = index => this
    .row(index)
    .reduce( (a, [key, value]) => ({...a, [key]: value}), {} ); // a, [title, contents]
  
  toAllObj = () => Array(this.length)
    .fill(0) // fill : 정적인 값(0) 하나로 채웁니다.
    .map((item, index) => this.toObj(index));
}
```
### _45_
#### 형태의 변환 (객의의 변환 : merge)
```javascript
const sourcObj = {
  traits: {
    fisrt_name {
      value: 'jt',
      age: 20
    },
    email_opened {
      value: 'yang',
      age: 33
    }
  },
  cursor: {
    url: '/v/abc/dsadas',
    has_more: false,
    next: ''
  }
}
// 깊은 복사 : 문자열 > 객체 변환, 객체가 크면 성능 좋지 않습니다.
const newObj1 = JSON.parse(JSON.stringify(sourcObj))

// 얕은 복사
const newObj2 = Object.assign({}, sourcObj);
const newObj3 = { ...sourcObj };

const DefaultStyle = {
  color: '#fff',
  fontSize: 14,
  fontWeight: 200
}

function createParagraph(config) {
  config = { ...DefaultStyle, ...config };
  
  console.log(config) // DefaultStyle에서 fontSize만 변경
}
createParagraph({ fontSize: 20} ); 
```
### _47_
#### Webpack
>  최신 JavaScript 애플리케이션을 위한 정적 모듈 번 들러 입니다 .
* Entry
```javascript
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```
* Output
```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```
* Loaders
```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
* Plugins
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

URL : https://webpack.js.org/
* 학습용으로는 webpack boilerplate 검색하고서 webpack.config.js 설정

### _51_
#### Handlebars
> 템플릿(Mustache) 엔진, {{ 콧수염 }} 더블 브레이스
* https://handlebarsjs.com/