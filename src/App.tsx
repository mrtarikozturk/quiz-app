import React, {useState} from 'react';
import {fetchQuizQuestions, Difficulty, QuestionState} from './API';
import QuestionCard from './components/QuestionCard';
import {GlobalStyle, Wrapper} from './App.styles';

export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL_QUESTIONS = 10;

const  App:React.FC = ()=> {

  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore]= useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  console.log(questions)
  
  const startTrivia = async() => {
      setLoading(true);
      setGameOver(false);
      const newQuestions:QuestionState[] = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);

  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>):void => {
      if(!gameOver){
        const answer = e.currentTarget.value
        const correct = questions[number].correct_answer === answer;
        if(correct) setScore(prev=> prev + 1);
        const answerObject = {
          question:questions[number].question,
          answer,
          correct,
          correctAnswer:questions[number].correct_answer,
        };
        setUserAnswers(prev=> [...prev, answerObject])
      }
  }
  
  const nextQuestion = (): void=> {
      const nextQuestion = number + 1;
      if(nextQuestion === TOTAL_QUESTIONS){
        setGameOver(true);
      }else{
        setNumber(nextQuestion);
      }
  }
   
  return (
    <>
    <Wrapper >
      <GlobalStyle/>
      <h1>REACT QUIZ</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button> 
        ): null
      }
      {!gameOver ? <p className='score'>Score:{score}</p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
            <QuestionCard 
            questionNr={number +1}
            totalQuestion={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )
      }
      {
        !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?  
        (
          <button className='next' onClick={nextQuestion}>
          Next Question
          </button>
        ) : null
      }

     
    </Wrapper>
    </>
  );
}

export default App;
