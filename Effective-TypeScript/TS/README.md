```
let age:number = 30;
let isAdult:boolean = true;
let a:number[] = [1,2,3,];
let a2:Array<number> = [1,2,3];

let week1:string[] = ['mon','tue','wed'];
let week2:Array<string> = ['mon','tue','wed'];
```

<br/>
<br/>

튜플(Tuple):배열과 비슷한 모양인데 인덱스별로 타입이 다를 때 이용 

```
let b:[string,number];

b=['z',1]
```
<br/>
<br/>

void:함수에서 아무 것도 반환하지 않을때 사용
never:항상 에러를 반환하거나,영원히 끝나지 않는 함수의 타입으로 사용가능
```
function sayHello():void{
console.log('hello')
}

function showError():never{
	throw new Error();
}
function infLoop():never{
	while(true){
    
    }
}
    
```
<br/>
<br/>


enum:비슷한 값들끼리 묶어줌 특정값만 입력하도록 강제하고싶을때,
그 값들이 공통점들이 있을때, enum사용
```
enum Os{
	window,
    Ios,
    android
}
```

<br/>
<br/>

interface~프로퍼티를 정해서 객체를 표현할때 인터페이스 사용함.

?:(옵셔널) 입력을 해도되고 안해도 되는 속성
```
type Score = 'A'|'B'|'C'|'D'|'F';~문자열 리터럴 타입. 

interface User{
name:string;
age:number;
gender?:string; // (?)물음표는 옵셔널,입력을 해도되고 안해도 되는 속성
readonly birthYear :number; //readonly를 앞에 넣어주면 읽기전용 속성으로 바뀜. 최초에 생상할때만 할당 이후에 수정 불가.


[grade:number]:string ; // number를 key로 하고 string을 value로 받는 프로퍼티를 여러개 받을 수 있다. 

let user :User={
	name:'xx',
	age:30,
	birthYear:2000,
	1:'A',
    2:'B'
```

<br/>
<br/>


implements~interface로 클래스를 정의할때 사용
```
interface Car {
color:string;
wheels:number;
start():void;
}

class Bmw implemnets Car{
	color;
    wheels =4;
    constructor(c:string){
    this.color =c;
    }
    strat(){
    console.log('go..');
    }
 }
 ```
 extends interface는 확장이 가능함 그때는 extends라는 키워드를 사용한다.extends는 여러개로 확장가능
 (예시> interface Toycar extends Car,Toy)  
 
```  
  interface Benz extends Car{
  //이미 Car가 가진 속성 다가지고 가고 거기에 추가로 정의해주면된다.
  }
```



함수 타입정의
옵셔널이 필수타입보다 먼저 나오면 에러가 뜬다.

함수오버로드: 전달받은 매개변수의 개수나 타입에 따라 다른동작을 하게하는것을 의미
```
interface User{
name:string;
age:number;
}

function join (name:string, age: number) : User;
function join (name:string, age: string) : string;

//오버로딩
function join (name:string, age: number|string) : User|string{  //전달받은 매개변수의 타입에 따라서 return값이 달라짐.
if(typeof age==="numver"){
return {
name,age,
};
}else{return "나이는 숫자로";
}
}

```


literal types~정해진 string값을 가진것을 문자열 literal type이라고 한다. 

union types : (|)
동일한속성의 타입을 다르게 해서 구분할수 있는것을 식별가능한 union type

intersection Types~여러 타입을 하나로 합쳐서 사용. 유니온이 or느낌이라면 인터섹션 타입은 and 느낌
