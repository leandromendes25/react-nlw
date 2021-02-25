import { useState, useEffect, useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';
//Regras de negocio.. aqui

export function CountDown(){
    const {
        minutes, seconds, 
        hasFinished, isActive,
         startCountDown, resetCountDown
        } = useContext(CountDownContext);
   //não colocamos no context - Estamos formatando dados, a parte visual precisa desses dados
    const [minuteLeft,  minuteRight] = String(minutes).padStart(2, '0').split('');{/*Como não passou anda o split está partindo cada character em arrays
     diferentes*/}
    const [secondLeft,  secondRight] = String(seconds).padStart(2, '0').split('');
  
    return (                                                                    
        <div>                                                                  
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