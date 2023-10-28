'use client'
import { questions } from "@/app/data/mockup";
import { useRef, useState } from "react";
import QuestionTextGroup from "./components/questionTextGroup";
import RadioBtnGroup from "./components/radioBtnGroup";
import TestProgressbar from "./components/testProgressbar";
import * as S from "./styles/student";

export default function StudentTest() {
  const ref = useRef<null[] | HTMLDivElement[]>([]);
  let [answersLength, setAnswersLength] = useState(0);

  return (
    <main>
      <TestProgressbar
        bgColor="var(--green-01)"
        currentLength={answersLength}
        totalLength={10}
      />
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
              onClick={(el: any) => {
                const targetHeight = ref.current[idx]?.offsetHeight as number;
                window.scrollBy(0, targetHeight);
                ref.current[idx]?.classList.remove('inactive');
                ref.current[idx]?.nextElementSibling?.classList.remove('inactive');

                if (el.target.checked && !ref.current[idx]?.classList.contains('pass')) {
                  setAnswersLength(++answersLength);
                }

                ref.current[idx]?.classList.add('pass');
              }} />

            {/* Divider */}
            <S.Divider />
          </S.TestQuestion>
        ))}

        {/* 버튼 */}
        <div>
          <button onClick={(el) => {
            el.preventDefault();
            scrollTo(0, 0);

          }}>이전</button>

          <button onClick={(el) => {
            el.preventDefault();
            scrollTo(0, 0);

            const offsetArr: any = [];

            ref.current.forEach(function (item) {
              if (!item?.classList.contains('pass')) {
                offsetArr.push(item?.offsetTop);
              }
            });

            // 체크하지 않은 항목으로 스크롤하기
            scrollTo(0, Math.min(...offsetArr) - 337);

          }}>다음</button>
        </div>
      </S.TestQuestions>
    </main>
  )
}