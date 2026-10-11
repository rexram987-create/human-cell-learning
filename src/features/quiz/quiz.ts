import data from '../../content/questions.json';
export type Question={id:string;lessonId:string;prompt:string;options:string[];correctIndex:number;explanation:string};
export const questions:Question[]=data;
export function gradeAnswer(question:Question,index:number){return {correct:index===question.correctIndex,explanation:question.explanation}}
