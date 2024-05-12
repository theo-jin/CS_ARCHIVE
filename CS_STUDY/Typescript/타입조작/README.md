# 타입조작

기본 타입이나 별칭 또는 인터페이스로 만든 원래 존재하던 타입들을 상황에 따라 유동적으로 다른 타입으로 변환하는 기능을 말함.

## 인덱스드 엑세스 타입

인덱스드 엑세스 타입은 인덱스를 이용해 다른 타입내의 특정 프로퍼티의 타입을 추출하는 타입. 인덱스드 엑세스 타입은 객체, 배열, 튜플에 사용할 수 있다.

### 객체에서 사용할 때

```ts
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number; // 추가
  };
}

function printAuthorInfo(author: Post['author']) {
  console.log(`${author.id} - ${author.name}`);
}
```

Post["author"]는 Post 타입으로부터 author 프로퍼티의 타입을 추출합니다. 그 결과 author 매개변수의 타입은 {id : number, name: string, age:number}가 됩니다.
이때 대괄호 속에 들어가는 String Literal 타입인 “author” 를 인덱스 라고 부릅니다. 그래서 인덱스를 이용해 특정 타입에 접근하다고 하여 인덱스드 엑세스 타입이라 부릅니다.

### 배열에서 사용할 때

### 튜플에서 사용할때

```ts
type Tup = [number, string, boolean];

type Tup0 = Tup[0];
// number

type Tup1 = Tup[1];
// string

type Tup2 = Tup[2];
// boolean

type Tup3 = Tup[number];
// number | string | boolean
```

## 맵드 타입

기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 타입조작 기능

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = {
  [key in keyof User]?: User[key];
};

type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};

(...)
```

[key in “id” | “name” | “age”] 는 이 객체 타입은 key가 한번은 id, 한번은 name, 한번은 age가 된다는 뜻 입니다. 따라서 다음과 같이 3개의 프로퍼티를 갖는 객체 타입으로 정의됩니다.
key가 “id” 일 때 → id : User[id] → id : number
key가 “name”일 때 → name : User[user] → name : string
key가 “age”일 때 → age : User[age] → age : number
여기에 대 괄호 뒤에 선택적 프로퍼티를 의미하는 물음표(?) 키워드가 붙어있으므로 모든 프로퍼티가 선택적 프로퍼티가 되어 결론적으로 이 타입은 다음과 같은 타입이 됩니다.

## 템플릿 리터럴 타입

템플릿 리터럴을 이용해 특정 패턴을 갖는 String 타입을 만드는 기능

```ts
type Color = 'red' | 'black' | 'green';
type Animal = 'dog' | 'cat' | 'chicken';
type ColoredAnimal = `${Color}-${Animal}`;
```

## Reference

https://ts.winterlood.com/4be60954-bc0e-4458-a58d-c0b367eb8ef4
