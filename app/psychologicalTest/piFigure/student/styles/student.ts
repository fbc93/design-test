import { styled } from "styled-components";

export const ProgressbarWrapper = styled.div`
  width: 100%;
  padding: 4rem 0;
  background-color: var(--green-01);
`;

export const ProgressContainer = styled.div`
  max-width: 69.6rem;
  margin: 0 auto;
`;

export const Progressbar = styled.div`
  background-color: var(--white);
  padding: 1.6rem 0;
  border-radius: 14rem;
  width: 100%;
  height: 15.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  box-sizing: border-box;

  span {
    font-size: 1.6rem;
    color: var(--brand-color);
    font-weight: 200;
    letter-spacing: 0.374px;
  }
`;

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

  .inactive,
  .pass {
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
  }

  &:nth-child(n + 1) {
    &:has(input:checked) {
      background-image: ${(props) =>
        `url("/images/test/opt_${props.$optionIdx}.webp")`};
      background-size: 64px;
      background-position: center top;
      background-repeat: no-repeat;
    }
  }
`;
