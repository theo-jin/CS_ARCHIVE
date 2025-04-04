### 관계형 데이터베이스 (RDB, Relational Database)

테이블 기반의 데이터베이스로, 데이터를 행(Row)과 열(Column)로 구성하여 저장합니다. 

**특징**

- 테이블 구조 되어 있어 데이터를 정해진 스키마(schema) 내에서 테이블로 저장합니다.
- SQL 로 데이터를 조작하고 조회할 때 SQL 사용합니다.
- 정규화를 통해 중복을 최소화하고 데이터 무결성을 유지합니다.
- 트랜잭션 지원 하여 ACID(원자성, 일관성, 고립성, 지속성)를 보장합니다

**관계형 데이터베이스의 장단점**

**장점**

- **데이터 무결성 보장합니다**. 정규화된 데이터 구조 덕분에 중복이 적고 일관성 유지할 수 있습니다.
- **복잡한 쿼리 처리 가능합니다**. JOIN, 집계 함수 등으로 강력한 데이터 조작 가능합니다.
- **트랜잭션 보장합니다.** 금융, 전자상거래 등 데이터의 신뢰성이 중요한 시스템에 적합합니다.

**단점**

- **확장성 문제가 있습니다.** 수직 확장(서버 성능 업그레이드)에 의존하고, 수평 확장(서버 추가)은 어렵다는 단점이 있습니다.
- **설계 유연성이 부족합니다.** 스키마가 고정되어 있어 변경이 어렵다는 단점이 있습니다.
- **대량의 데이터 처리 속도 느립니다.** 수많은 JOIN이 필요한 경우 성능 저하가 된다는 단점이 있습니다.

### NoSQL 데이터베이스

비정형 데이터를 유연하게 저장할 수 있는 데이터베이스로, 스키마 없이 다양한 형식의 데이터를 저장할 수 있습니다.

**특징**

- 스키마 없어 데이터를 자유롭게 저장 가능합니다.
- 유연한 데이터 구조라서 JSON, Key-Value, Column-Family 등 다양한 저장 방식 지원합니다.
- 수평 확장이 가능하여 여러 서버에 데이터를 분산 저장하여 확장 용이합니다.
- 높은 성능과 빠른 데이터 처리가 가능하여 대량의 데이터를 빠르게 저장 및 조회 가능합니다.

**장점**

- **확장성 뛰어납니다.** 수평 확장이 용이하여 대량의 데이터를 처리하는 서비스에 적합합니다.
- **빠른 데이터 처리가 가능합니다.** 캐싱, 로그 저장, 실시간 데이터 분석 등에 유리합니다.
- **유연한 데이터 모델링.** 정형화되지 않은 데이터를 자유롭게 저장 가능합니다.

**단점**

- **데이터 무결성 보장 어렵습니다.** JOIN 기능이 부족하고 정규화된 데이터 모델이 아니기때문에 데이터 무결성을 보장하기 힙듭니다.
- **트랜잭션 지원 부족합니다.** 일부 NoSQL DB는 ACID를 완벽히 보장하지 않습니다.
- **복잡한 쿼리 처리 어려움** . 관계형 DB만큼 강력한 데이터 조작 기능이 없습니다.