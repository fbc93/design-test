'use client'
import { adultQuestions } from "@/app/data/mockup";
import { useEffect, useRef, useState } from "react";
import QuestionTextGroup from "../student/components/questionTextGroup";
import RadioBtnGroup from "../student/components/radioBtnGroup";
import TestProgressbar from "../student/components/testProgressbar"
import SituationTextGroup from "./components/situationTextGroup";
import * as S from "../student/styles/student";
import { FieldValues, useForm } from "react-hook-form";

export default function AdultTest() {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {},
  });

  const { basic, biss } = adultQuestions[0];
  let [answersLength, setAnswersLength] = useState(0);
  const [sadBg, setSadBg] = useState('middle');
  const [bgNum, setBgNum] = useState(1);
  const [isFirefox, setIsFirefox] = useState(false);
  const ref = useRef<null[] | HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.navigator.userAgent.toLowerCase().includes("firefox")) {
      console.log(window.navigator.userAgent.toLowerCase());
      setIsFirefox(true);
    }
  }, [])

  const onSubmitEvent = () => {
    console.log('submit');
    scrollTo(0, 0);
  }

  return (
    <main>
      <TestProgressbar
        bgColor="var(--blue-02)"
        currentLength={answersLength}
        totalLength={basic.length + biss.length}
      />
      <S.TestQuestions onSubmit={handleSubmit(onSubmitEvent)}>
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

                //UI : radio 버튼 값 변경시 다음 문항으로 스크롤 이동
                const targetHeight = ref.current[idx]?.offsetHeight as number;
                window.scrollBy(0, targetHeight);
                ref.current[idx]?.classList.remove('inactive');
                ref.current[idx]?.nextElementSibling?.classList.remove('inactive');

                if (el.target.checked && !ref.current[idx]?.classList.contains('pass')) {
                  setAnswersLength(++answersLength);
                }
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


              {/* Range-Slider */}
              <S.FireFoxTest $sadBg={sadBg} $bgNumber={bgNum}>
                <div className="container num-5">
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
                      el.target.nextSibling.nextSibling.style.cssText = `width: calc(${percent}% - 3.2rem)`;

                      //UI image
                      el.target.value >= 1 && el.target.value <= 3 ? setSadBg('low') :
                        el.target.value >= 4 && el.target.value <= 7 ? setSadBg('middle') :
                          el.target.value >= 8 && el.target.value <= 10 ? setSadBg('high') : ''

                      //UI
                      if (el.target.value == 1) {
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add(`num-${el.target.value}`);
                        el.target.nextSibling.style.cssText = `left: calc(0% - 0.5rem);`;

                      } else if (el.target.value >= 2 && el.target.value <= 7) {
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add(`num-${el.target.value}`);
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;

                      } else if (el.target.value >= 8 && el.target.value <= 10) {
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add(`num-${el.target.value}`);
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;
                      }
                    }}
                  />

                  <div className="thumb"></div>
                  <div className={`progress-bg ${isFirefox ? "firefox" : ""}`}></div>
                </div>

                {/* Range-Slider-Text */}
                <S.RangeTextContainer>
                  <span>별로 화나지 않는다</span>
                  <span>많이 화가난다</span>
                </S.RangeTextContainer>
              </S.FireFoxTest>

            </S.QuestionSection>


            {/* '화남' range 선택지 group */}
            <S.QuestionSection>
              <S.QuestionTitle>다음과 같은 상황에서 “슬픔”을 어느정도 느끼시나요?</S.QuestionTitle>


              {/* Range-Slider */}
              <S.FireFoxTest $sadBg={sadBg} $bgNumber={bgNum}>
                <div className="container num-5">
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
                      el.target.nextSibling.nextSibling.style.cssText = `width: calc(${percent}% - 3.2rem)`;

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
                        el.target.nextSibling.style.cssText = `left: calc(0% - 0.5rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-1');

                      } else if (el.target.value == 2) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-2');

                      } else if (el.target.value == 3) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-3');

                      } else if (el.target.value == 4) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-4');

                      } else if (el.target.value == 5) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-5');

                      } else if (el.target.value == 6) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-6');

                      } else if (el.target.value == 7) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 6rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-7');

                      } else if (el.target.value == 8) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-8');

                      } else if (el.target.value == 9) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-9');

                      } else if (el.target.value == 10) {
                        el.target.nextSibling.style.cssText = `left: calc(${percent}% - 5.5rem);`;
                        el.target.parentElement.className = 'container';
                        el.target.parentElement.classList.add('num-10');
                      }


                    }}
                  />

                  <div className="thumb"></div>
                  <div className={`progress-bg ${isFirefox ? "firefox" : ""}`}></div>
                </div>

                {/* Range-Slider-Text */}
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
            //el.preventDefault();
            scrollTo(0, 0);

          }}>이전</button>

          <button type="submit" onClick={(el) => {
            //el.preventDefault();


            // const offsetArr: any = [];

            // ref.current.forEach(function (item) {
            //   if (!item?.classList.contains('pass')) {
            //     offsetArr.push(item?.offsetTop);
            //   }
            // });

            // // 체크하지 않은 항목으로 스크롤하기
            // scrollTo(0, Math.min(...offsetArr) - 337);

          }}>다음!</button>
        </div>
      </S.TestQuestions>
    </main>
  )
}