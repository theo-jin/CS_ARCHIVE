# CSS Selector

**css selector**:style을 적용하고자하는 HTML 요소를 셀렉터로 특정하고 선택된 요소에 스타일을 정의

## 1. 전체 셀렉터 (Universal Selector)
HTML 문서 내의 모든 요소를 선택한다. html 요소를 포함한 모든 요소가 선택된다. (head 요소도 포함된다)

## 2. 태그 셀렉터 (Type Selector)
지정된 태그명을 가지는 요소를 선택한다.  
예시)
```
p { color: red; }
h1, h2 { color: red; }}
```

## 3.ID 셀렉터 (ID Selector)
#id 어트리뷰트 값:id 어트리뷰트 값을 지정하여 일치하는 요소를 선택한다. id 어트리뷰트 값은 중복될 수 없는 유일한 값이다.
```
  #p1 { color: red; }
  ```

## 4. 클래스 셀렉터 (Class Selector)
.class 어트리뷰트 값:class 어트리뷰트 값을 지정하여 일치하는 요소를 선택한다. class 어트리뷰트 값은 중복될 수 있다.

```
 .container { color: red; }
```
HTML 요소에 class 어트리뷰트 값은 공백으로 구분하여 여러 개 지정할 수 있다. 아래와 같이 클래스 셀렉터를 사용하여 미리 스타일을 정의해 두고, HTML 요소는 이미 정의되어 있는 클래스를 지정하는 것으로 필요한 스타일을 지정할 수 있다. 이것은 재사용의 측면에서 유용하다.
## 5. 어트리뷰트 셀렉터 (Attribute Selector)
셀렉터[어트리뷰트]:	지정된 어트리뷰트를 갖는 모든 요소를 선택한다.

셀렉터[어트리뷰트=”값”]	지정된 어트리뷰트를 가지며 지정된 값과 어트리뷰트의 값이 일치하는 모든 요소를 선택한다.

셀렉터[어트리뷰트~=”값”]	지정된 어트리뷰트의 값이 지정된 값을 (공백으로 분리된) 단어로 포함하는 요소를 선택한다.

예시)
```
  a[href] { color: red; }
  .
  .
  .
<a href="http://www.poiemaweb.com">poiemaweb.com</a><br>
```

## 6. 복합 셀렉터 (Combinator)


## Reference
https://poiemaweb.com/css3-selector