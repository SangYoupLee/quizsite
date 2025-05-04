import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "KT가 Microsoft와 함께 공동 개발한 ‘한국형 소버린 클라우드’의 주요 목적은 무엇인가?",
    options: [
      "통신요금 인하 대응",
      "글로벌 AI 플랫폼 수출",
      "데이터 주권 보호 및 공공·금융 특화 클라우드 제공",
      "콘텐츠 스트리밍 서비스 강화"
    ],
    answer: 2
  },
  {
    question: "KT의 믿:음 AI 플랫폼의 주요 특징은 무엇인가?",
    options: [
      "영상 압축 기술 고도화",
      "범용 AI 모델로 범죄 탐지",
      "맞춤형 모델 학습, AI 윤리 필터링, 경량화 설계",
      "스마트폰용 안면인식 최적화"
    ],
    answer: 2
  },
  // 추가 문제 여기에 삽입 가능
];

export default function KTMockTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(60 * 10); // 10분 타이머 (테스트용)
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, submitted]);

  const handleOptionClick = (index) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = answers.filter((a, i) => a === questions[i].answer).length;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="text-right text-sm text-gray-500">
        남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      {!submitted ? (
        <div>
          <h2 className="text-lg font-bold mb-4">
            {current + 1}. {questions[current].question}
          </h2>
          <ul className="space-y-2">
            {questions[current].options.map((opt, idx) => (
              <li key={idx}>
                <Button
                  variant={answers[current] === idx ? "default" : "outline"}
                  className="w-full text-left"
                  onClick={() => handleOptionClick(idx)}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <Button onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}>이전</Button>
            {current < questions.length - 1 ? (
              <Button onClick={() => setCurrent((prev) => Math.min(questions.length - 1, prev + 1))}>다음</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={answers.includes(null)}>제출</Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">시험 완료!</h2>
          <p>총점: {score} / {questions.length}</p>
          <ul className="mt-4 space-y-2">
            {questions.map((q, i) => (
              <li key={i} className="text-sm">
                {i + 1}. {q.question} <br />
                <span className="text-green-600">정답: {String.fromCharCode(65 + q.answer)}</span> | 
                <span className={answers[i] === q.answer ? "text-green-600" : "text-red-600"}> 내 답: {answers[i] !== null ? String.fromCharCode(65 + answers[i]) : "미답"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
