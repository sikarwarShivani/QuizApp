import React, { useRef, useState } from 'react'
import './QuizApp.css'
import { QuizData } from './QuizData'

const QuizApp = () => {
    let[index,setIndex]=useState(0)
    let[question,setQuestion]=useState(QuizData[index])
    let[lock,setLock]=useState(false)
    let[score,setScore]=useState(0)
    let[result,setResult]=useState(false)

    let option1 =useRef(null)
    let option2 =useRef(null)
    let option3 =useRef(null)
    let option4 =useRef(null)

    let optionArray = [option1,option2,option3,option4]

    let next =()=>{
        if(lock===true){
            if(index===QuizData.length-1){
                setResult(true)
                return 0;
             }
            setIndex(++index)
        setQuestion(QuizData[index])
        setLock(false)
        optionArray.map((Option)=>{
            Option.current.classList.remove('wrong')
            Option.current.classList.remove('correct')
            return null
        })
        }
    }
    let reset =()=>{
        setIndex(0)
        setQuestion(QuizData[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

let checkAns =(e,answer)=>{
    if(lock===false){
        if(question.answer===answer){
            e.target.classList.add('correct')
            setLock(true)
            setScore(prev=>prev+1)
          }
          else{
            e.target.classList.add('wrong')
            setLock(true)
            optionArray[question.answer-1].current.classList.add('correct')
          }
    }
 
}


  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr/>
      {result?<></>:<>
        <h2>{index+1}{question.question}</h2>
      <ul>
        <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option2}</li>
        <li  ref={option2}  onClick={(e)=>{checkAns(e,2)}}>{question.option3}</li>
        <li  ref={option3}  onClick={(e)=>{checkAns(e,3)}}>{question.option1}</li>
        <li  ref={option4}  onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className='indexcontain'> {index+1} of {QuizData.length} questions</div></>}
      {result?<>
        <h2> you scored {score} out of {QuizData.length}</h2>
        <button onClick={reset}>Reset</button>
      </>:<></>}
      
      
    </div>
  )
}

export default QuizApp
