```
book-management-front/ 경로에 
.env.local 생성 후
NEXT_PUBLIC_API_URL=http://localhost:8080 삽입한다.

[실행 명령어]
book-management-api> ./gradlew bootRun

book-management-front> npm install

book-management-front> npm run dev

- 책 리스트 및 대출 상태를 보여주는 메인 페이지 (이용자/관리자 모드 권한 분기)
- 관리자 모드에서 수정을 누르면 상세 정보 확인 및 수정 가능, 이용자 모드에서 대여가능
- 도서 검색 기능 : 도서명, 저자명, 출판년도 카테고리별로 존재
- /register 에서 도서 등록 후 메인 페이지로 리다이렉트 (백엔드에서 ISBN 자동 생성)
- 프론트엔드 가격 입력 제한(10억 미만) 및 출판년도 4자리 숫자 제한 완료
- 200, 201, 204, 404 등 REST API Status 처리 완료
- http://localhost:3000 허용
- 잘못된 경로 접근 시 404 전역 에러 error.tsx 예외 처리
```
