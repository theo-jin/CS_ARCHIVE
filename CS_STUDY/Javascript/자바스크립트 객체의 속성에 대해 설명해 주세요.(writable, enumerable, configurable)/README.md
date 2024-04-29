# 자바스크립트 객체의 속성에 대해 설명해 주세요.(writable, enumerable, configurable)
```
요약
JavaScript의 객체는 다음과 같이 key : value 쌍으로 이루어진 존재
value: obj.key에 설정될 값. 기본값은 undefined
writable: 값이 변경 가능한지 여부. 기본값은 false
enumerable: 열거 가능한지 여부. 기본값은 false
configurable: 객체에서의 삭제 가능 여부와 descriptor의 속성들을 추후에 변경할 수 있는지 여부. 기본값은 false
get: getter 함수로 obj.key에 접근할 때 동작하며, 이 함수의 return 값을 obj.key로 가집니다. 기본값은 undefined
set: setter 함수로 obj.key에 값을 할당할 때 동작하며, 할당할 값이 인자로 들어옵니다. 기본값은 undefined
```



## writable, enumerable, configurable
### writable
writable이 false이면 obj.key = value 방식으로는 값을 변경할 수 없다.   
writable이 false일 때, obj.key = value로 값을 변경하려고 시도하면, strict mode가 아닐 경우에는 에러가 발생하지 않고 무시되며, strict mode일 경우에는 동일한 값을 할당하려 해도 에러가 발생한다.   
하지만 Object.defineProperty를 사용하여 value를 변경할 수는 있다.

### enumerable
enumerable이 false이면 Object.keys나 for...in을 사용하여 객체의 키를 열거할 수 없습니다. 심지어 단순히 객체를 출력만 할 때에도 해당 속성이 보이지 않습니다. 하지만 객체 내에서 완전히 사라진 것은 아니기 때문에 obj.key와 같이 직접 접근할 수는 있습니다.

### configurable
configurable 속성은 객체에서 해당 속성의 삭제 가능 여부와 descriptor의 다른 속성들의 변경 가능 여부를 결정합니다.

configurable이 false이면 delete로 객체에서 해당 속성을 삭제할 수 없습니다. strict mode일 때 삭제를 시도하면 에러가 발생합니다. 또한 enumerable, configurable, get, set을 변경할 수 없습니다.

writable과 value에 대해서는 다소 다르게 동작합니다. 기존의 writable이 true였을 경우 writable 및 value의 변경은 가능합니다. 하지만 writable을 false로 변경하였을 경우 writable을 다시 변경하는 것과 value를 변경할 수 없습니다.




## Reference

https://developer-talk.tistory.com/277

https://www.timegambit.com/blog/js/object-define-property  

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty