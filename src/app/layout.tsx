import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IB PrepDojo - AI 맞춤형 IB 시험 문제 추천 & 문제은행',
  description: '최신 IB Past Papers 트렌드 분석 기반 적중 문제 추천 및 실시간 수식 렌더링 문제은행',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
