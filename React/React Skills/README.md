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
