import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function getMenabiQuestionStudentData(page: number): Promise<any> {
  try {
    const data = await client.pifigure_question_student.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        code: "asc",
      },
    });
    return data;
  } catch (error) {
    console.log("getMenabiQuestionAdultData Error : " + error);
  }
}
