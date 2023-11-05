"use server";
import { getMenabiQuestionStudentData } from "../lib/serverside-logic/psychological";

// 심리테스트 문항 가져오기 (학생)
export async function getMenabiQuestionStudentDataAction(
  page: number
): Promise<any> {
  const result = await getMenabiQuestionStudentData(page);
  console.log(
    `_actions ::: getMenabiQuestionStudentDataAction ::: result : ${JSON.stringify(
      result
    )}`
  );
  // revalidatePath('/psychological') // 데이터를 넣고나서 리패치개념인듯?
  return result;
}
