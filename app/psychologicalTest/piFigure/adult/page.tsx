'use client'
import { adultQuestions } from "@/app/data/mockup";
import { useRef, useState } from "react";
import QuestionTextGroup from "../student/components/questionTextGroup";
import RadioBtnGroup from "../student/components/radioBtnGroup";
import TestProgressbar from "../student/components/testProgressbar"
import SituationTextGroup from "./components/situationTextGroup";
import * as S from "../student/styles/student";

export default function AdultTest() {
  const { basic, biss } = adultQuestions[0];
  let [answersLength, setAnswersLength] = useState(0);
  const [sadBg, setSadBg] = useState('middle');
  const ref = useRef<null[] | HTMLDivElement[]>([]);

  return (
    <main>
      <TestProgressbar
        bgColor="var(--blue-02)"
        currentLength={answersLength}
        totalLength={basic.length + biss.length}
      />
      <S.TestQuestions>
        {basic.map((q, idx) => (

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


        {/* BISS */}
        {biss.map((q, idx) => (
          <S.TestQuestion key={idx}>
            {/* 상황 설명 텍스트 group */}
            <SituationTextGroup situationText={q.situation} />

            {/* '슬픔' range 선택지 group */}
            <S.QuestionSection>
              <S.QuestionTitle>다음과 같은 상황에서 “슬픔”을 어느정도 느끼시나요?</S.QuestionTitle>
              <S.RangeInputContainer>

                {/* Range-Slider */}
                <S.RangeSlider $sadBg={sadBg}>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={5}
                    onChange={(el: any) => {
                      //UI: 퍼센트로 range indicator 이동
                      const percent = (el.target.value / el.target.max) * 100;

                      //UI
                      el.target.nextSibling.nextSibling.style.cssText = `width: calc(${percent}% - 3.2rem);`;


                      if (el.target.value == 1) {
                        el.target.nextSibling.style.cssText = `left: calc(0% + 1.5rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('middle');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('low');


                      } else if (el.target.value == 2) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 4.2rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('middle');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('low');

                      } else if (el.target.value == 3) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 3.9rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('middle');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('low');

                      } else if (el.target.value == 4) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 3.5rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('middle');

                      } else if (el.target.value == 5) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 3.2rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('middle');

                      } else if (el.target.value == 6) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 2.9rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('middle');


                      } else if (el.target.value == 7) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 2.6rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('high');
                        el.target.nextSibling.children[0].children[0].classList.add('middle');

                      } else if (el.target.value == 8) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 2.2rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('middle');
                        el.target.nextSibling.children[0].children[0].classList.add('high');


                      } else if (el.target.value == 9) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 1.9rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('middle');
                        el.target.nextSibling.children[0].children[0].classList.add('high');

                      } else if (el.target.value == 10) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 1.6rem);`;
                        el.target.nextSibling.children[0].children[0].classList.remove('low');
                        el.target.nextSibling.children[0].children[0].classList.remove('middle');
                        el.target.nextSibling.children[0].children[0].classList.add('high');

                      }


                      //tooltip
                      el.target.nextSibling.children[0].children[1].innerText = el.target.value;
                    }}
                  />

                  {/* SliderThumb */}
                  <S.SliderThumb>
                    <S.Tooltip>
                      <div className={`tooltip-img middle`}></div>
                      <p className="tooltip-value">5</p>
                    </S.Tooltip>
                  </S.SliderThumb>

                  {/* Progressbar */}
                  <S.SliderProgress />
                </S.RangeSlider>


                {/* Range-Slider-Text */}
                <S.RangeTextContainer>
                  <span>별로 화나지 않는다</span>
                  <span>많이 화가난다</span>
                </S.RangeTextContainer>
              </S.RangeInputContainer>
            </S.QuestionSection>





            {/* '화남' range 선택지 group */}
            <S.QuestionSection>
              <S.QuestionTitle>다음과 같은 상황에서 “화남”을 어느정도 느끼시나요?</S.QuestionTitle>

              <S.FireFoxTest $sadBg={sadBg}>
                <div className="container">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={5}
                    onChange={(el: any) => {
                      //UI: 퍼센트로 range indicator 이동
                      const percent = (el.target.value / el.target.max) * 100;

                      //UI width
                      el.target.nextSibling.nextSibling.style.cssText = `width: calc(${percent}% - 5rem)`;

                      //UI image
                      if (el.target.value >= 1 && el.target.value <= 3) {
                        setSadBg('low');

                      } else if (el.target.value >= 4 && el.target.value <= 7) {
                        setSadBg('middle');

                      } else if (el.target.value >= 8 && el.target.value <= 10) {
                        setSadBg('high');
                      }


                      //UI
                      if (el.target.value == 1) {
                        el.target.nextSibling.style.cssText = `left: calc(0% - 0.3rem);`;

                      } else if (el.target.value == 2) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6.3rem);`;

                      } else if (el.target.value == 3) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;

                      } else if (el.target.value == 4) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;

                      } else if (el.target.value == 5) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;

                      } else if (el.target.value == 6) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;

                      } else if (el.target.value == 7) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;

                      } else if (el.target.value == 8) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;

                      } else if (el.target.value == 9) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;

                      } else if (el.target.value == 10) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;

                      }

                      //tooltip
                      el.target.nextSibling.innerText = el.target.value;
                    }}
                  />

                  <div className="thumb">5</div>
                  <div className="progress-bg"></div>
                </div>

                <S.RangeTextContainer>
                  <span>별로 화나지 않는다</span>
                  <span>많이 화가난다</span>
                </S.RangeTextContainer>
              </S.FireFoxTest>
            </S.QuestionSection>

            {/* '행동' 선택지 group */}
            <S.QuestionSection>
              <S.QuestionTitle>이런 상황이면 어떤 행동을 할 것 같나요?</S.QuestionTitle>
              {q.options.map((opt, idx) => (

                <S.RadioBtnItem key={idx}>
                  <input type="radio" id="" name="" value={idx + 1} />
                  <span>{opt}</span>
                </S.RadioBtnItem>
              ))}
            </S.QuestionSection>

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