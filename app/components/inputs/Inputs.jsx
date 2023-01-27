"use client";

import React, { useState, useEffect } from "react";
import styles from "./Inputs.module.css";

let preguntas = [
  "¿Cuáles son los síntomas de la enfermedad X?",
  "¿Qué tratamientos están disponibles para la enfermedad X?",
  "¿Qué medidas preventivas debo tomar para evitar la enfermedad X?",
  "¿Cómo se diagnostica la enfermedad X?",
  "¿Qué complicaciones pueden surgir de la enfermedad X?",
  "¿Cuáles son los riesgos de la enfermedad X?",
  "¿Cuáles son los efectos de la enfermedad X en el cuerpo?",
  "¿Cuáles son los factores de riesgo para la enfermedad X?",
  "¿Cuáles son las recomendaciones para el tratamiento de la enfermedad X?",
  "¿Qué pruebas se necesitan para diagnosticar la enfermedad X?"
  ];

const Inputs = () => {
  const [programa, setPrograma] = useState("Photoshop");
  const [comosehace, setComosehace] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState(`${comosehace} en ${programa}. ¿Como lo hago?`)
  const[nombreBoton, setNombreBoton] = useState('Como se hace?')
  

  
  const checkProgram = () =>{
    if(programa === "Salud"){
      setNombreBoton('Hacer consulta de salud')
      setPrompt(`${comosehace} en lenguaje de salud, para medicos, enfermeros y doctores.`)
    } else{
      setNombreBoton('Como se hace?')
      setPrompt(`${comosehace} en ${programa}. ¿Como lo hago?`)
    }
  }

  useEffect(() => {
    checkProgram()

  }, [programa, comosehace])
  
  
  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: `{"model": "text-davinci-003", "prompt": "${prompt}", "temperature": 0, "max_tokens": 600}`,
    });

    const data = await response.json();
   

    setResult(data.choices[0].text);
    setLoading(false);
  }

  return (
    <>
      <div className={styles.main}>
        <h1 className="m-3 text-4xl font-bold text-[#7547ad]">De todo un poco</h1>
        <br />
        <form onSubmit={onSubmit}>
          <input
            className="bg-[#3B3B3B]"
            type="text"
            name="consulta"
            rows={5}
            placeholder="Ingresa consulta"
            value={comosehace}
            onChange={(e) => setComosehace(e.target.value)}
          />
          <select
            name="select"
            value={programa}
            onChange={(e) => setPrograma(e.target.value)}
            className={styles.regionstyle}
          >
            <option value="Photoshop">Photoshop</option>
            <option value="Illustrator">Illustrator</option>
            <option value="After Effects">After Effects</option>
            <option value="Premiere">Premiere</option>
            <option value="Salud">Salud</option>
          </select>
          <br />
          {loading ? (
            <span className={styles.loader}></span>
          ) : (
            <input type="submit" value={nombreBoton} />
          )}
        </form>
        <div className={styles.responseContainer}>
          <pre className={styles.preResult}>{result}</pre>
        </div>
      </div>
    </>
  );
};

export default Inputs;
