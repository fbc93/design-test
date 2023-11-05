'use client'
import { getMenabiQuestionStudentDataAction } from '../app/_actions'
import Link from "next/link";
import { styled } from "styled-components";
import { useEffect, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const Wrapper = styled.ul<{ $percent: number }>`
  form {
    & > div:nth-child(2){
      margin-top: 4rem;
    }

    .progressbar {
      display: inline-block;
      width: 100%;
      position: sticky;
      top: 0rem;
      left: 0;
      padding: 4rem 7rem;
      background: white;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      .bg {
        width: 100%;
        height: 1rem;
        background-color: #e2e2e2;
        position: relative;

        .color {
          width: ${props => `${props.$percent}%`};
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #6bdfe3;
          display: flex;
          justify-content: right;
          align-items: center;
          transition: width 0.3s ease-in-out;

          .value {
            color: #000000;
            font-size: 1.8rem;
          }
        }
      }
    }

    .item {
      background-color: #b4eff3;
      margin-bottom: 4rem;
      font-size: 1.8rem;
      padding: 1rem;

      p {
        margin-bottom: 2rem;
      }

      .radio-group {
        span {
          display:inline-block;
          font-size: 1.6rem;
          margin: 0 2rem 0 0.5rem;
        }
      }
    }
  }

  .loading {
    font-size: 5rem;
    font-weight: 700;
    text-align: center;
    padding: 3rem;
  }

  button {
    display:inline-block;
    width: 50%;
    font-size: 2rem;
    padding: 1rem;
    cursor:pointer;
  }
`;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {},
  })

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [studentAnswer, setStudentAnswer] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const someData = async () => {
      //학생 문항
      const result = await getMenabiQuestionStudentDataAction(page)
      setData(result)

      //로컬 스토리지 값 확인
      await getLocalStorageItem('studentData')

      setIsLoading(false)
    }

    someData()
  }, [page])

  //로컬스토리지에 데이터 저장
  const getLocalStorageItem = (keyName: string): any => {
    // 실제 저장한 로컬 데이터
    let objString = window.localStorage.getItem(keyName)

    // 로컬 데이터가 없으면, 더미 데이터로 초기값을 넣어준다.
    const temObjString = '{"value":{"0":{"questionId":"TEM","answer":0,"isReverse":false}},"expire":1694412497296}'
    if (!objString) objString = temObjString

    // 저장한 로컬 데이터 변환
    const temDataObj = JSON.parse(objString as string)
    const temDataKeys = Object.keys(temDataObj.value).length
    console.log('키 개수 확인', temDataKeys)
    console.log('로컬스토리지 : ', temDataObj.value)

    if (temDataKeys >= 10) {
      console.log('10개 이하니 1페이지')
      // return
    }

    if (temDataKeys >= 20) {
      console.log('60개 이하니 2페이지')
      // return
    }
    // null 체크
    if (!objString) return null

    // 문자열을 객체로 변환
    const obj = JSON.parse(objString)

    // 현재 시간과 localStorage의 expire 시간 비교
    if (Date.now() > obj.expire) {
      // 만료시간이 지난 item 삭제
      window.localStorage.removeItem(keyName)
      return null
    }

    // 저장된 정보가 있다면, setAnswer 해준다.
    setStudentAnswer(obj.value)

    // 만료 기간이 남아있으면 return
    return obj.value
  }

  const onChangeRadio = (event: any, item: any, i: number) => {
    console.log('target_value : ', event.target.value)
    console.log('item : ', item.code)
    console.log('idx : ', i)

    setStudentAnswer((prev) => ({
      ...prev,
      [i + (page - 1) * 10]: { questionId: item.code, answer: Number(event.target.value), isReverse: item.isReverse },
    }))

    let temArray: any[] = studentAnswer

    temArray = { ...temArray, [i + (page - 1) * 10]: { questionId: item.code, answer: Number(event.target.value), isReverse: item.isReverse } }

    const obj = {
      value: temArray,
      // expire: Date.now() + 1000 * 60 * 60 * 12, // 12 시간
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7일 test용
      // expire: Date.now() + 1000 * 10, // 10초 test용
    }

    const objString = JSON.stringify(obj)
    window.localStorage.setItem('studentData', objString)

    console.log('answers : ', studentAnswer)
  }

  //다음 페이지
  const handleNextPageData = async (data: any) => {
    console.log('다음 페이지로 넘어가는 버튼 :: ', data)

    const keyLength = Object.keys(data).length
    console.log('확인 :: !! ', keyLength)

    const checkNull = Object.values(data)
    let isNull = false

    for (let i = 0; i < checkNull.length; i++) {
      if (!checkNull[i]) {
        isNull = true
        alert('모든 문항에 답변을 해주세요.')
        return
      }
    }

    if (isNull) return

    setPage((prev) => prev + 1)
    scrollTo(0, 0)
  }

  const onClickSubmit = async (data: any) => {
    let getOut = false

    const checkNull = Object.values(data)

    // 다음 문항으로 넘어 갈 때 확인
    for (let i = 0; i < checkNull.length; i++) {
      if (!checkNull[i]) {
        getOut = true
        alert('모든 문항에 답변을 해주세요.')
        break
      }
    }

    // 위에서 문항 답변 안한게 있다면, 함수 이탈시킨다.
    if (getOut) return
  }

  // UI : radio 버튼 클릭시 다음 문항으로 스크롤 이동
  const ref = useRef<null[] | HTMLDivElement[]>([])

  interface IData {
    description: string;
    code: string;
  }

  return (
    <Wrapper $percent={Math.ceil((Object.keys(studentAnswer).length / 50) * 100)}>
      {!isLoading ? (
        <form onSubmit={handleSubmit(onClickSubmit)}>

          {/* 프로그레스바 */}
          <div className='progressbar '>
            <div className='bg'>
              <div className='color'>
                <span className='value'>{`${Math.ceil((Object.keys(studentAnswer).length / 50) * 100)}%`}</span>
              </div>
            </div>
          </div>

          {data?.map((item: IData, idx) => (
            <div key={idx} ref={el => ref.current[idx] = el} className="item">
              {/* 텍스트 문항 */}
              <p><span>{`${idx + 1 + (page - 1) * 10}. `}</span><span>{item.description}</span></p>

              {/* 라디오 선택지 */}
              <fieldset className='radio-group'>
                <legend className='sr-only'>라디오 버튼 선택지</legend>

                <label htmlFor={`${item.code}_opt_${1}`}>
                  <input
                    {...register(item.code)}
                    type="radio"
                    id={`${item.code}_opt_${1}`}
                    name={`${item.code}`}
                    value={1}
                    checked={studentAnswer[idx + (page - 1) * 10]?.questionId === item.code && studentAnswer[idx + (page - 1) * 10]?.answer === 1}
                    onChange={(event) => {
                      onChangeRadio(event, item, idx)


                      //UI : radio 버튼 값 변경시 다음 문항으로 스크롤 이동
                      const targetHeight = ref.current[idx]?.offsetHeight as number;
                      window.scrollBy(0, targetHeight);
                    }}
                  />
                  <span>매우 아니다</span>
                </label>
                <label htmlFor={`${item.code}_opt_${2}`}>
                  <input
                    {...register(item.code)}
                    type="radio"
                    id={`${item.code}_opt_${2}`}
                    value={2}
                    checked={studentAnswer[idx + (page - 1) * 10]?.questionId === item.code && studentAnswer[idx + (page - 1) * 10]?.answer === 2}
                    name={`${item.code}`}
                    onChange={(event) => {
                      onChangeRadio(event, item, idx)

                      //UI : radio 버튼 값 변경시 다음 문항으로 스크롤 이동
                      const targetHeight = ref.current[idx]?.offsetHeight as number;
                      window.scrollBy(0, targetHeight);
                    }}
                  />
                  <span>아니다</span>
                </label>
                <label htmlFor={`q${item.code}_opt_${3}`}>
                  <input
                    {...register(item.code)}
                    type="radio"
                    id={`q${item.code}_opt_${3}`}
                    value={3}
                    checked={studentAnswer[idx + (page - 1) * 10]?.questionId === item.code && studentAnswer[idx + (page - 1) * 10]?.answer === 3}
                    name={`${item.code}`}
                    onChange={(event) => {
                      onChangeRadio(event, item, idx)

                      //UI : radio 버튼 값 변경시 다음 문항으로 스크롤 이동
                      const targetHeight = ref.current[idx]?.offsetHeight as number;
                      window.scrollBy(0, targetHeight);
                    }}
                  />
                  <span>보통이다</span>
                </label>
                <label htmlFor={`${item.code}_opt_${4}`}>
                  <input
                    {...register(item.code)}
                    type="radio"
                    id={`${item.code}_opt_${4}`}
                    value={4}
                    checked={studentAnswer[idx + (page - 1) * 10]?.questionId === item.code && studentAnswer[idx + (page - 1) * 10]?.answer === 4}
                    name={`${item.code}`}
                    onChange={(event) => {
                      onChangeRadio(event, item, idx)

                      //UI : radio 버튼 값 변경시 다음 문항으로 스크롤 이동
                      const targetHeight = ref.current[idx]?.offsetHeight as number;
                      window.scrollBy(0, targetHeight);
                    }}
                  />
                  <span>그렇다</span>
                </label>
                <label htmlFor={`${item.code}_opt_${5}`}>
                  <input
                    {...register(item.code)}
                    type="radio"
                    id={`${item.code}_opt_${5}`}
                    value={5}
                    checked={studentAnswer[idx + (page - 1) * 10]?.questionId === item.code && studentAnswer[idx + (page - 1) * 10]?.answer === 5}
                    name={`${item.code}`}
                    onChange={(event) => {
                      onChangeRadio(event, item, idx)

                      //UI : radio 버튼 값 변경시 다음 문항으로 스크롤 이동
                      const targetHeight = ref.current[idx]?.offsetHeight as number;
                      window.scrollBy(0, targetHeight);
                    }}
                  />
                  <span>매우 그렇다</span>
                </label>
              </fieldset>

            </div>
          ))}

          {page !== 1 && (
            <button onClick={() => setPage(prev => prev - 1)}>이전</button>
          )}

          {page >= 1 && page < 5 && (
            <button onClick={handleSubmit(handleNextPageData)}>다음</button>
          )}

          {page == 5 && (
            <button>리포트 보기</button>
          )}

        </form>
      ) : (
        <div className='loading'>Loading...</div>
      )}




      <ul>
        <li><Link href="/psychologicalTest/piFigure/student">Pi-Figure : 학령기 테스트</Link></li>
        <li><Link href="/psychologicalTest/piFigure/adult">Pi-Figure : 성인 테스트</Link></li>
      </ul>
    </Wrapper>
  )
}
