'use client'
import { questions } from "@/app/data/mockup";
import { createRef, useEffect, useRef } from "react";
import QuestionTextGroup from "./components/questionTextGroup";
import RadioBtnGroup from "./components/radioBtnGroup";
import TestProgressbar from "./components/testProgressbar";
import * as S from "./styles/student";

export default function StudentTest() {
  const ref = useRef<null[] | HTMLDivElement[]>([]);

  return (
    <main>
      <TestProgressbar />
      <S.TestQuestions>
        {questions.map((q, idx) => (

          <S.TestQuestion
            key={idx}
            ref={el => ref.current[idx] = el}
            className={idx != 0 ? "inactive" : ""}>
            {/* 문제 텍스트 group */}
            <QuestionTextGroup questionText={q.question} />
            {/* 문제 선택지 group */}
            <RadioBtnGroup
              questionNumber={q.number}
              onClick={() => {
                const targetHeight = ref.current[idx]?.offsetHeight as number;
                window.scrollBy(0, targetHeight);
                ref.current[idx]?.classList.add('pass');
                ref.current[idx]?.classList.remove('inactive');
                ref.current[idx]?.nextElementSibling?.classList.remove('inactive');
              }} />
            {/* Divider */}
            <S.Divider />
          </S.TestQuestion>

        ))}
      </S.TestQuestions>
    </main>
  )
}