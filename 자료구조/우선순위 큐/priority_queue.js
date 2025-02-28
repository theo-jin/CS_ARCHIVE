class PriorityQueue {
  constructor() {
    // 내부적으로 힙(배열)을 사용하여 구현
    this.heap = [];
  }

  // 현재 우선순위 큐에 들어있는 원소의 개수
  size() {
    return this.heap.length;
  }

  // 우선순위 큐가 비어있는지 확인
  isEmpty() {
    return this.size() === 0;
  }

  // 우선순위 큐에 새로운 원소 삽입
  // priority가 작을수록 먼저 추출됨 (Min-Heap)
  enqueue(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this._heapifyUp();
  }

  // 우선순위가 가장 높은(가장 낮은 수치의) 원소 제거 및 반환
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    // 루트(우선순위가 가장 높은 원소) 반환 준비
    const root = this.heap[0];
    // 힙의 마지막 원소를 루트 위치로 가져오고, 다시 힙 정렬
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._heapifyDown();
    }
    return root.value;
  }

  // 우선순위가 가장 높은(가장 낮은 수치의) 원소를 보기만 함
  peek() {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  // 힙에 새 원소가 삽입된 뒤, 위쪽 방향으로 힙을 정렬
  _heapifyUp() {
    let index = this.size() - 1; // 새로 삽입된 노드의 인덱스
    while (index > 0) {
      // 부모 노드 인덱스 계산
      const parentIndex = Math.floor((index - 1) / 2);
      // 부모 노드보다 새 노드의 우선순위가 더 높은(수치가 더 낮은) 경우 교환
      if (this.heap[index].priority >= this.heap[parentIndex].priority) {
        break;
      }
      // 부모와 자식을 교환
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      // 인덱스를 부모 인덱스로 변경
      index = parentIndex;
    }
  }

  // 루트가 제거된 뒤, 아래쪽 방향으로 힙을 정렬
  _heapifyDown() {
    let index = 0;
    const length = this.size();

    while (true) {
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;
      let smallest = index;

      // 왼쪽 자식이 존재하고, 해당 자식의 priority가 현재 노드보다 더 작은 경우
      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildIndex;
      }

      // 오른쪽 자식이 존재하고, 해당 자식의 priority가 현재 smallest보다 더 작은 경우
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = rightChildIndex;
      }

      // 더 이상 교환할 필요가 없으면 반복 종료
      if (smallest === index) {
        break;
      }

      // 현재 노드와 더 우선순위가 높은(수치가 더 낮은) 자식 노드를 교환
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

// 사용 예시
const pq = new PriorityQueue();
pq.enqueue('가장 긴급함', 1);
pq.enqueue('보통', 5);
pq.enqueue('조금 긴급함', 3);

console.log(pq.peek()); // "가장 긴급함" (priority: 1)
console.log(pq.dequeue()); // "가장 긴급함" (priority가 가장 낮으므로 먼저 꺼내짐)
console.log(pq.dequeue()); // "조금 긴급함"
console.log(pq.dequeue()); // "보통"
