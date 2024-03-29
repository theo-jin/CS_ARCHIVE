# 유틸리티 타입이란?
유틸리티 타입이란 타입스크립트가 자체적으로 제공하는 특수한 타입들
제네릭, 맵드 타입, 조건부 타입 등의 타입 조작 기능을 이용해 실무에서 자주 사용되는 유용한 타입들을 모아 놓은 것을 의미


1. Partial<T>:  특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 변환
2. Required<T>: 제네릭 타입 T의 모든 속성을 필수로 만듭니다.
3. Readonly<T>: 특정 객체 타입의 모든 프로퍼티를 읽기 전용 프로퍼티로 변환
4. Pick<T, K>: 특정 객체 타입으로부터 특정 프로퍼티 만을 골라내는 타입
(예시: Pick 타입에 T가 name, age가 있는 객체 타입이고 K가 name 이라면 결과는 name만 존재하는 객체 타입이 됩니다.)
5. Omit<T, K>:특정 객체 타입으로부터 특정 프로퍼티 만을 제거하는 타입 
(예시: Omit 타입에 T가 name, age가 있는 객체 타입이고 K가 name 이라면 결과는 name을 제외하고 age 프로퍼티만 존재하는 객체 타입이 됩니다.)
6. Record<K, T>: 키 타입 K와 값 타입 T를 갖는 객체를 나타냅니다.


## Reference
https://ts.winterlood.com/a5b224e2-3f3e-432c-8bfb-7b338762514f