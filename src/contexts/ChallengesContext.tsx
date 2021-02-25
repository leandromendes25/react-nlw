import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'
//pra falar quais dados tem dentro desafio
interface Challenge {
  type: 'body' | 'eye';//é do tipo string mas como só tem body ou eye
  description: string;
  amount: number;
}
//Como o children é um component react - ReactNode
interface ChallengesContextData {
  level: number; 
  currentExperience: number 
  challengesCompleted: number;
  experienceToNextLevel:number;
  activeChallenge: Challenge;
  levelUp: () => void; //Função então nao tem retorno
  startNewChallenge: () => void;
  resetChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode //Aceita qualquer elemento como children
}

export const ChallengesContext = createContext({} as ChallengesContextData)//fala pro contexto seguir o contrato ali cima
//Colocamos aqui no lugar do app para evitar poluir lá
export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2) //calculo math utilizado em games para acumulo de xp, o 4 é a questão de dificul

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {        //math.random pega numero aleatorio normalmente 0 - 1 * por alguma coisa. Math.floor - arredonda pra baixo
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {//Quando usuario falhar vai passar o valor para null
    setActiveChallenge(null)
  }
  
  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challengesCompleted, 
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge
      }}
    >
      { children }
    </ChallengesContext.Provider>
  )

}