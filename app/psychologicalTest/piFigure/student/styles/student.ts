import { styled } from "styled-components";

export const RangeWrapper = styled.div`
  width: 40rem;
  height: 0.8rem;
  display: inline-block;
  border-radius: 13px;
  background-color: var(--gray-01);
  position: relative;
`;

export const RangeFill = styled.div`
  width: 0%;
  height: 100%;
  background-color: var(--green-03);
  border-radius: 13px;
`;

export const Indicator = styled.div`
  width: 12rem;
  height: 8rem;
  position: absolute;
  bottom: -10px;
  right: 78%; /* -5% */
  transform: translate(0%, 0%);
  background-image: url("/images/test/progressbar_indicator.webp");
  background-size: 87.68px;
  background-position: center center;
  background-repeat: no-repeat;
`;

export const TestQuestions = styled.form`
  max-width: 69.6rem;
  width: 100%;
  margin: 0 auto;

  .inactive {
    opacity: 0.3;
  }
`;

export const TestQuestion = styled.div`
  width: 100%;
  padding: 8rem 0 0;
  transition: opacity 0.3s ease-in-out;
`;

export const Divider = styled.div`
  margin: 0;
  width: 100%;
  height: 1px;
  background-color: var(--gray-03);
  margin-top: 8rem;
`;

export const QuestionTextGroup = styled.div`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 3.2rem;
  letter-spacing: 0.374px;
  margin-bottom: 0.8rem;
`;

export const RadioBtnGroup = styled.div`
  width: 100%;
  position: relative;
`;

export const RadioBtns = styled.fieldset`
  width: 100%;
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  background-image: url("/images/test/option_bg.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top left;
`;

export const RadioBtn = styled.span<{ $optionIdx: string }>`
  display: inline-block;
  width: 12rem;
  height: 13.6rem;

  label {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;

    span {
      display: none;
    }
  }

  &:nth-child(n + 1) {
    &:has(input:checked) {
      background-image: ${(props) =>
        `url("/images/test/opt_${props.$optionIdx}.webp")`};
      background-size: 64px;
      background-position: center top;
      background-repeat: no-repeat;

      .title {
        color: var(--black);
      }
    }
  }

  &:nth-child(2n) {
    label {
      span {
        display: block;
      }
    }
  }
`;

export const RadioLabel = styled.label`
  position: relative;
`;

export const RadioBtnTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 200;
  color: var(--gray-05);
  letter-spacing: 0.374px;
  display: inline-block;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const ProgressbarWrapper = styled.div<{ $bgColor: string }>`
  width: 100%;
  padding: 4rem 0;
  background-color: ${(props) => props.$bgColor};
`;

export const ProgressContainer = styled.div`
  max-width: 69.6rem;
  margin: 0 auto;
`;

export const Progressbar = styled.div<{ $bgColor: string }>`
  background-color: var(--white);
  padding: 2.5rem 9.7rem 2rem 9.7rem;
  border-radius: 14rem;
  width: 100%;
  height: 15.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8rem;
  box-sizing: border-box;

  span {
    font-size: 1.6rem;
    color: ${(props) =>
      props.$bgColor === "var(--green-01)"
        ? "var(--brand-color)"
        : "var(--blue-02)"};
    font-weight: 200;
    letter-spacing: 0.374px;
  }
`;

export const RangeContainer = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: var(--gray-01);
  border-radius: 13px;
  position: relative;
`;

export const RangeFillElement = styled.div<{ $pos: number; $bgColor: string }>`
  width: ${(props) => `${props.$pos}%`};
  height: 100%;
  background-color: ${(props) =>
    props.$bgColor === "var(--green-01)"
      ? "var(--green-03)"
      : "var(--blue-02)"};
  border-radius: 13px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const IndicatorContainer = styled.div<{ $pos: number }>`
  width: fit-content;
  height: 100%;
  position: absolute;
  left: ${(props) => `${props.$pos}%`};
  bottom: 52px;
  transform: translateX(-60%);
`;

export const RangeIndicatorImage = styled.div`
  width: 87.68px;
  height: 64px;
  background-image: url("/images/test/progressbar_indicator.webp");
  background-position: center top;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const RangeIndicatorValue = styled.div`
  width: 7rem;
  height: 3.8rem;
  margin: 0 auto;
  background-image: url("/images/test/progressbar_indicator_bottom.webp");
  background-position: center top;
  background-size: contain;
  background-repeat: no-repeat;

  text-align: center;
  font-size: 1.4rem;
  line-height: 4.4rem;
  letter-spacing: -1px;
  font-weight: 500;
`;
