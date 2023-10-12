


```
localStorage.setItem('데이터이름', '데이터');
localStorage.getItem('데이터이름');
localStorage.removeItem('데이터이름')
```


### localStorage에 array/object 자료를 저장하려면
```
localStorage.setItem('obj', JSON.stringify({name:'kim'}) );

```