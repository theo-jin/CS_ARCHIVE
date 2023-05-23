# React Skills

## 리액트 스킬 1
```
 const [modalIsOpen,setModalIsOpen]=useState(false);
  
  
  { modalIsOpen && <Modal />} 
  //modalIsOpen과 <Modal /> 양쪽 모두 true이면? 뒤에꺼가 렌더링된다. 
  
  { modalIsOpen ? <Modal /> : null} 
  //modalIsOpen이 true면?>> <Modal /> 렌더링
  //modalIsOpen이 false면?>> null 렌더링
  ```

## 동적 ui 만드는 step
1. html/css로 미리 디자인을 완성
2. ui의 현재 상태를 state로 저장
3. state에 따라 ui가 어떻게 보일지 작성(조건문등으로)


## 애니메이션 만드는 스킬 

1. 애니메이션 동작 전 스타일을 담을 className 만들기 
2. 애니메이션 동작 후 스타일을 담을 className 만들기 
3. transition 속성도 추가
4. 원할 때 2번 탈부착


## if문이 길때
```
  function TabContent({tab}){       
      return (<div className="start end">
{
     [<div>내용0</div>,<div>내용1</div>,<div>내용2</div>] [tab]
}</div>
      )
      //   if(tab==0){
    //   return <div>내용0</div>
    // }else if(tab==1){
    //   return<div>내용1</div>
    // }else if(tab==2){
    //   return <div>내용2</div>
    // }
  }
```
