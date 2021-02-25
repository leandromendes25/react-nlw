import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CountDown.module.css';

let countDownTimeout: NodeJS.Timeout //diz formato do time

export function CountDown(){
    const {startNewChallenge} = useContext(ChallengesContext);

    const[time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false); 
    const [hasFinished, setHasFinished] = useState(false);
   
    const minutes = Math.floor(time / 60);
    const seconds = time % 60; 
   
    const [minuteLeft,  minuteRight] = String(minutes).padStart(2, '0').split('');{/*Como não passou anda o split está partindo cada character em arrays diferentes*/}
    const [secondLeft,  secondRight] = String(seconds).padStart(2, '0').split('');
  
    function startCountDown() {
    setIsActive(true);
    }
    function resetCountDown() {
        clearTimeout(countDownTimeout);//cancelando o timer
        setIsActive(false);
        setTime(0.1 * 60)
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
    return (                                                                    
        <div>                                                                   {//useEffect mudar será exec dnv.}
        <div className={styles.countDownContainer}>
            <div>
                <span>{minuteLeft}</span>{/*Colocamos separados para facilitar estilização*/}
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>           /*Sempre que tiver mais de uma linha de retorno, parentes() por fora */}
        {hasFinished ? (
             <button
             disabled
             type="button" 
             className={styles.countDownButton}>{/*Não precisa de outra classe pois disable resolve */}
             Ciclo encerrado
                
            </button>
        ): ( //Estava esperando um cod JS, e não chaves então temos que colocar em volta > elemento. Fragmentação
            <>
            {isActive ? (
            <button
            type="button" 
            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}/*Colocar mais de uma classe, como mudar de cor ao click*/ 
            onClick={resetCountDown}>
            Abandonar ciclo
               
           </button>) : (
            <button
         type="button" 
         className={styles.countDownButton} 
         onClick={startCountDown}>
         Iniciar ciclo
         </button>
        ) }
        

            </>
        )}     
        </div>
    )
}