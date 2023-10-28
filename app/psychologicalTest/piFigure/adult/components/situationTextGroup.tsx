'use client'
import * as S from "../../student/styles/student"

export default function SituationTextGroup({ situationText }: {
  situationText: string;
}) {
  return (
    <S.SituationText>
      {situationText}
    </S.SituationText>
  )
}