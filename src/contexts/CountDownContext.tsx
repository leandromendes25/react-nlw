import {createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';
interface CountDownContextData {//formato 
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}
interface CountDownProviderProps {
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData); //formato texto as ...

let countDownTimeout: NodeJS.Timeout //diz formato do time

export function CountDownProvider({children}: CountDownProviderProps ) {//Que as props são igual a Count... 
    const {startNewChallenge} = useContext(ChallengesContext);

    const[time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false); 
    const [hasFinished, setHasFinished] = useState(false);
   
    const minutes = Math.floor(time / 60);
    const seconds = time % 60; 
   
    function startCountDown() {
        setIsActive(true);
        }
        function resetCountDown() {
            clearTimeout(countDownTimeout);//cancelando o timer
            setIsActive(false);
            setTime(0.1 * 60)
            setHasFinished(false);
        }
        useEffect(()=> { 
             if(isActive && time > 0) {    
           {/*como setTimeout tem retorno..*/} 
           countDownTimeout = setTimeout(() =>{setTime(time - 1);}, 1000)}
        else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);//Quando chegar a 0 não vai + estar ativo, para mentar os estados como deveriam
            startNewChallenge();
        }
        }, [isActive, time])
   
    return (//valores que vai retornar
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountDownContext.Provider>
    )
}