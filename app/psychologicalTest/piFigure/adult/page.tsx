'use client'

import Image from "next/image";
import { useRef } from "react";
import { styled } from "styled-components"

const RangeSlider = styled.div`
  border: 1px solid red;
`;

const SliderThumb = styled.div``;

const Tooltip = styled.div``;

const Progress = styled.div``;

const TooltipImg = styled.div``;

export default function AdultTest() {
  const sliderRef = useRef(null);

  return (
    <RangeSlider ref={sliderRef}>
      <input type="range" min="0" max="200" value="100" width="100" />

      <SliderThumb>
        <Tooltip>
          <TooltipImg>
            <Image src="/images/test/sad_indicator.webp" width={60} height={75} alt="indicator" />
          </TooltipImg>
        </Tooltip>
      </SliderThumb>

      <Progress></Progress>
    </RangeSlider>
  )
}