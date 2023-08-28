# useEffect 

1. 재렌더링 마다 코드 실행 하는법
```
useEffect(()=>{ 실행할코드 })
```
2.mount시 1회만 실행하는 법
```
useEffect(()=>{ 실행할코드 }, [])
```

3.useEffect안의 코드 실행전에 항상 실행.
```
useEffect(()=>{ 
  return ()=>{
    실행할코드
  }
})
```
4. 컴포넌트 unmount시 1회 실행
```
useEffect(()=>{ 
  return ()=>{
    실행할코드
  }
}, [])
```
5.state변경될때에만 실행 
```
useEffect(()=>{ 
  실행할코드
}, [state1)
```
