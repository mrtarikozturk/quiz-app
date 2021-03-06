import {shuffleArray} from './utils';

export type Question = {
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}

export type QuestionState = Question & {answers:string[]}

export enum Difficulty{
    EASY='easy',
    MEDIUM='medium',
    HARD='hard',
}

const url = process.env.REACT_APP_API_BASE_URL

export const fetchQuizQuestions = async (amount:number, difficulty:Difficulty) =>{
    const endpoint = `${url}amount=${amount}&category=11&difficulty=${difficulty}&type=multiple`
    console.log(endpoint);
    const data = await (await fetch(endpoint)).json();
    return data?.results?.map((question:Question)=>({...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer])}))
}
