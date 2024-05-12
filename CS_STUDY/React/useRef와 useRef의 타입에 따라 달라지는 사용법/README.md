# useRef란?

```
useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환합니다. 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지될 것입니다.
```

useRef는 리액트 훅의 한 종류로, Ref는 reference(참조)의 줄임말이다.

useRef를 이용하면 특정한 DOM요소에 접근이 가능하면, 불필요한 재렌더링을 하지 않는다는 장점이 있다.

리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 있다.그럴 땐, 리액트에서 ref 라는 것을 사용하는데,useRef 훅은 함수컴포넌트에서 ref를 쉽게 사용할 수 있도록 해주는 훅을 말합니다.

## 사용방법

```ts
//생성
const 변수명 = useRef(initialValue);

//반환요소에 접근
<input ref={변수명} />;
```

useRef는 변수명에 초기값을 적는 식으로 만든다.

➡️ 이러한 결과값으로, {current: 초기값} 을 지닌 객체가 반환된다.

useRef에서 기억할 것은 이러한 current라는 키값을 지닌 프로퍼티가 생성되고, 값에 어떤 변경을 줄때도 이 current를 이용해서 한다는 점이다

## 특징

useRef는 React Hook의 일종으로, 인자로 넘어온 initialValue를 useRef 객체의 .current 프로퍼티에 저장한다.  
 반환된 useRef 객체는 컴포넌트의 전생애주기를 통해 유지가

1. 컴포넌트가 계속해서 렌더링이 되어도 컴포넌트가 언마운드되기 전까지는 값을 그대로 유지할 수 있다

2. .currnet 속성은 값을 변경해도 상태를 변경할 때 처럼 React 컴포넌트가 재렌더링 되지 않는다.

🔫 렌더링과 상관없이, 마운트된 시점부터 언마운트된 시점까지 값을 유지한다 🔫

## 언제사용?

### 1. 저장공간

변경시 렌더링을 발생시키지 말아야하는 값을 다룰때 사용한다(변화는 감지해야하지만, 그 변화가 렌더링을 발생시키면 안될때!!)
useRef를 이용하면 값이 변경될때마다 렌더링이 일어나지 않는다 ➡️ ⭐️ 성능향상!! ⭐️

#### useRef훅을 이용한 값과의 비교

ref의 값은 컴포넌트의 전생애주기를 통해서 관리되기 때문에, 아무리 컴포넌트가 렌더링 되더라도 언마운트가 되기 전까지는 값을 계속해서 유지한다

### 2. DOM요소에 접근

useRef를 사용하면 손쉽게 input에 접근할 수 있다.

바닐라 자바스크립트의 getElementById, querySelector와 비슷하다.

<DOM요소 접근의 대표적인 예>

대표적으로 Input요소를 클릭하지 않아도 focus를 줄때 사용

DOM 객체를 직접 가리켜서 내부 값을 변경하거나 focus() 메소드를 사용하거나 하는 때에 주로 사용하고, 변경되어도 컴포넌트가 리렌더링되지 않도록 하기 위한 값들을 저장하기 위해서도 사용한다. (이는 useRef가 내용이 변경되어도 이를 알려주지 않기 때문이다. .current 프로피터를 변경시키는 것은 리렌더링을 발생시키지 않고, 따라서 로컬 변수 용도로 사용할 수 있다.)

```
본질적으로 useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같습니다.
```

# 타입에 따른 useRef

## 1. useRef<T>(initialValue: T): MutableRefObject<T>;

인자의 타입과 제네릭의 타입이 T로 일치하는 경우, MutableRefObject<T>를 반환한다.
MutableRefObject<T>의 경우, 이름에서도 볼 수 있고 위의 정의에서도 확인할 수 있듯 current 프로퍼티 그 자체를 직접 변경할 수 있다.

로컬 변수 용도로 useRef를 사용하는 경우, MutableRefObject<T>를 사용해야 하므로 제네릭 타입과 같은 타입의 초깃값을 넣어주자.

## 2. useRef<T>(initialValue: T|null): RefObject<T>;

인자의 타입이 null을 허용하는 경우, RefObject<T>를 반환한다.
RefObject<T>는 위에서 보았듯 current 프로퍼티를 직접 수정할 수 없다.

DOM을 직접 조작하기 위해 프로퍼티로 useRef 객체를 사용할 경우, RefObject<T>를 사용해야 하므로 초깃값으로 null을 넣어주자.

## 3. useRef<T = undefined>(): MutableRefObject<T | undefined>;

제네릭의 타입이 undefined인 경우(타입을 제공하지 않은 경우), MutableRefObject<T | undefined>를 반환한다.

리렌더가 필요없는 가변적인 값을 저장하기위해 사용할경우
MutableRefObject를 반환할수 있게, 선언한 제네릭 타입과 같은 타입의 초기값을 사용한다.
DOM조작을 위해 사용할경우
RefObject를 반환할수 있게, 초기값으로 null을 사용한다.

## Reference

https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5

https://reactjs.winterlood.com/3cef124b-4664-40bc-8b13-1591c31b0e39

https://hihiha2.tistory.com/19
