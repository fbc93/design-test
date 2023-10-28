'use client'
import Link from "next/link";
import { styled } from "styled-components";

const Wrapper = styled.ul`
  border:1px solid red;

  li {
    a {
      font-size: 3rem;
    }
  }
`;

export default function Home() {
  return (
    <>
      <Wrapper>
        <li><Link href="/psychologicalTest/piFigure/student">Pi-Figure : 학령기 테스트</Link></li>
        <li><Link href="/psychologicalTest/piFigure/adult">Pi-Figure : 성인 테스트</Link></li>
      </Wrapper>
    </>
  )
}
