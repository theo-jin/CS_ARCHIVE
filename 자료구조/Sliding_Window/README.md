# Sliding Window

슬라이딩 윈도우(Sliding Window) 알고리즘은 배열이나 리스트의 요소의 일정 범위의 값을 비교할때 사용하면 유용한 알고리즘이다. 해당값을 창문처럼 묶는다고 하여 붙여진 이름이고 이는 매번 처리되는 중복된 요소를 버리지 않고 재사용함으로써 낭비되는 계산을 하지 않음으로써 효율적으로 처리하는 방법입니다.

이 알고리즘의 핵심은 바로 지정 된 범위내에 모든 숫자들을 더해서 subarray의 합을 만들어주고 또 범위 밖으로 벗어난 숫자들은 그 합에서 빼주는 원리로 작동한다.

## 예시

```ts
// https://www.acmicpc.net/problem/2559
const readFileSync = require('fs').readFileSync;
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [NK, arr] = readFileSync(filePath).toString().trim().split('\n');
const [N, K] = NK.split(' ').map(Number);
const array = arr.split(' ').map(Number);

function SlidingWindow(array, K) {
  let windowSum = 0;
  let maxSum = -Infinity; //0대신에 -Infinity를 주고 시작하는 이유는 배열중에 negative한 숫자들이 있을 경우를 대비해서이다. 그래서 애초에 가장적은 수
  for (let i = 0; i < N; i++) {
    windowSum += array[i]; //범위 합을 미리 계산하고 시작한다.
    if (i >= K - 1) {
      // 그리고 인덱스를 기준으로 윈도우의 범위를 업데이트 해준다. 그래서 인덱스가 K보다 커지면 그때부터 윈도우 범위를 업데이트 해준다.
      maxSum = Math.max(windowSum, maxSum); // windowSum, maxSum둘중에 큰값으로 업데이트 해준다.
      windowSum -= array[i - (K - 1)]; // windowSum,도 업데이트 해주는 데 현재의 부분합에서 범위 밖의 숫자를 빼주는 작업을 여기서 해준다.
    }
  }
  return maxSum; //최종적으로 maxSum리턴
}

console.log(SlidingWindow(array, K));
```

## Reference

https://velog.io/@endmoseung/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%94%A9%EC%9C%88%EB%8F%84%EC%9A%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98feat.Javascript

https://www.youtube.com/watch?v=ot5mnp_hTqo

```

```
