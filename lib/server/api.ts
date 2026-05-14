// lib/api.ts
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600; // 로딩 중일때 어떻게 UI를 표현할 것인가?
const maybeFail = () => Math.random() < 0.15; // 실패했을 경우 어떻게 처리할 것인가?
