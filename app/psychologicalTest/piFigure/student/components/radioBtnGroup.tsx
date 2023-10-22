'use client'
import { options } from "@/app/data/mockup";
import RadioBtn from "./radioBtn";
import * as S from "../styles/student";

export interface IOptions {
  value: number;
  id: string;
  title: string;
}

interface IRadioBtnGroup {
  questionNumber: number;
  onClick?: any;
}

export default function RadioBtnGroup({ questionNumber, onClick }: IRadioBtnGroup) {
  return (
    <S.RadioBtnGroup>
      <S.RadioBtns>
        <legend className="sr-only">라디오 버튼 선택지</legend>
        {options.map((opt, idx) => (
          <RadioBtn
            key={idx}
            questionNumber={questionNumber}
            options={opt}
            onClick={onClick}
          />
        ))}
      </S.RadioBtns>
    </S.RadioBtnGroup>
  )
}