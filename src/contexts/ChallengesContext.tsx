import { createContext, ReactNode, useEffect, useState } from 'react'
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
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode //Aceita qualquer elemento como children
}

export const ChallengesContext = createContext({} as ChallengesContextData)//fala pro contexto seguir o contrato ali cima


export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2) //calculo math utilizado em games para acumulo de xp, o 4 é a questão de dificul
  useEffect(() => {
    Notification.requestPermission();//permissão > sino
  }, [])//toda vez a informação muda.. Quando o segundo array é vazio, exec 1 função uma única vez 
  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {        //math.random pega numero aleatorio normalmente 0 - 1 * por alguma coisa. Math.floor - arredonda pra baixo
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    
    setActiveChallenge(challenge)
    new Audio('/notification.mp3').play();
    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', { 
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {//Quando usuario falhar vai passar o valor para null
    setActiveChallenge(null)
  }
  function completeChallenge(){
    if (!activeChallenge){//se não
      return;//validação não pode ser chamada se usuario nao tiver o challenge ativo
    }
    const { amount } = activeChallenge; //esta no challenges.json
    let finalExperience = currentExperience + amount;
    if (finalExperience > experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted +1);
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
      resetChallenge,
      completeChallenge,
      }}
    >
      { children }
    </ChallengesContext.Provider>
  )

}