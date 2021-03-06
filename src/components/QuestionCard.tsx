import React from 'react'
import {AnswerObject} from '../App';
import {Wrapper, ButtonWrapper} from './QuestionCard.styles';

type Props = {
    question:string;
    answers:string[];
    callback:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer: AnswerObject | undefined;
    questionNr:number;
    totalQuestion:number;
}


const QuestionCard: React.FC<Props> = (props) => {

    const {answers, callback, question, questionNr, totalQuestion, userAnswer} = props;
    
    return (
        <Wrapper>
           <p className='number'>
               Question:{questionNr} / {totalQuestion}
           </p>
           <p dangerouslySetInnerHTML={{__html:question}}/>
           <div>
               {
                   answers.map(answer=>(
                       <ButtonWrapper  
                       correct={userAnswer?.correctAnswer === answer}
                       userClicked ={userAnswer?.answer === answer}
                       key={answer}>
                           <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html:answer}}/>
                           </button>
                       </ButtonWrapper>
                   ))
               }
           </div>
        </Wrapper>
    )
}

export default QuestionCard
