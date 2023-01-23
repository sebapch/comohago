'use client'

import React, {useState} from 'react'

const Inputs = () => {
    const [programa, setPrograma] = useState('')
    const [comosehace, setComosehace] = useState('')


    const prompt = `${comosehace} en ${programa}. 
      ¿Como lo hago?`;


  return (
    <>
        <h1>Como se hace?</h1>
    </>
  )
}

export default Inputs