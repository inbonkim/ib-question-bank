# IB PrepDojo - AI 맞춤형 IB 시험 문제 추천 Q-Bank

최신 IB(International Baccalaureate) Past Papers 출제 트렌드 빅데이터를 기반으로 취약점 분석 및 적중 예상 문제를 추천하는 유료 웹 플랫폼입니다.

- **라이브 서비스 (Vercel)**: [https://ib-question-bank-six.vercel.app](https://ib-question-bank-six.vercel.app)
- **GitHub 리포지토리**: [https://github.com/inbonkim/ib-question-bank](https://github.com/inbonkim/ib-question-bank)

---

## 🌟 주요 기능
1. **KaTeX 고해상도 수식 렌더러**: 분수, 적분, 행렬, 복소수 등 IB 고유의 복잡한 수식을 완벽하게 렌더링.
2. **IB 시험 맞춤형 타이머**: 배점(Mark)당 권장 시험 시간(약 1.2분) 자동 계산 및 시간 초과 알림.
3. **공식 마크스킴(Markscheme) 뷰어**: 단계별 점수 기준표(`M1` 풀이방법, `A1` 계산정확도, `R1` 논리추론, `AG` 결과도출) 시각화.
4. **AI 출제 트렌드 분석 & 적중 문제 추천**: 최신 3~5개년 기출 빈출 유형 및 고난도 킬러 문항 집중 공략.
5. **저작권 100% 안전 보장 변형 문항(Isomorphic Questions)**: 공식 기출의 무단 복제를 방지하고 수식 메커니즘을 동일하게 유지한 독점 문제 풀.

---

## 🛠 기술 스택
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Math Engine**: KaTeX (LaTeX Parser)
- **Deployment**: Vercel (Production Live)

---

## 💻 로컬 개발 환경 실행

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드 검증
npm run build
```
로컬 접속: [http://localhost:3000](http://localhost:3000)
