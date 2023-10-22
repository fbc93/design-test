'use client'
import * as S from "../styles/student"

export default function QuestionTextGroup({ questionText }: {
  questionText: string;
}) {
  return (
    <S.QuestionTextGroup>
      {questionText}
    </S.QuestionTextGroup>
  )
}