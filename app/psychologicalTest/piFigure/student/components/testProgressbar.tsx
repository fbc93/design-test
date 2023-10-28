'use client'
import * as S from '../styles/student'

export default function TestProgressbar({ currentLength, totalLength, bgColor }: {
  currentLength: number;
  totalLength: number;
  bgColor: string;
}) {
  return (
    <S.ProgressbarWrapper $bgColor={bgColor}>
      <S.ProgressContainer>
        <S.Progressbar $bgColor={bgColor}>
          <span>0%</span>

          <S.RangeContainer>
            <S.RangeFillElement $pos={(currentLength / totalLength) * 100} $bgColor={bgColor} />
            <S.IndicatorContainer $pos={(currentLength / totalLength) * 100}>
              <S.RangeIndicatorImage />
              <S.RangeIndicatorValue>
                {`${Math.ceil((currentLength / totalLength) * 100)}%`}
              </S.RangeIndicatorValue>
            </S.IndicatorContainer>
          </S.RangeContainer>

          <span>100%</span>
        </S.Progressbar>
      </S.ProgressContainer>
    </S.ProgressbarWrapper>
  )
}