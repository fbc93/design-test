'use client'
import { IOptions } from "./radioBtnGroup";
import * as S from "../styles/student";

interface IRadioBtnItem {
  questionNumber: number;
  options: IOptions;
  onClick?: any;
}

export default function RadioBtnItem({ questionNumber, options, onClick }: IRadioBtnItem) {
  return (
    <S.RadioBtn $optionIdx={options.id}>
      <label htmlFor={`q${questionNumber}_${options.id}`}>
        <input
          type="radio"
          id={`q${questionNumber}_${options.id}`}
          value={options.value}
          name={`q${questionNumber}`}
          onChange={onClick}
        />
        <span className="sr-only">{options.title}</span>
      </label>
    </S.RadioBtn>
  )
}