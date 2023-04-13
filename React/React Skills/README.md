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
