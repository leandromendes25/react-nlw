import { useState, useEffect } from 'react';
import styles from '../styles/components/CountDown.module.css';
export function CountDown(){
    const[time, setTime] = useState(25 * 60); {/*25m em segundos, fica mais facil assim*/}
    const [active, setActive] = useState(false);  {/*Verif > se está ativo*/}
    const minutes = Math.floor(time / 60); {/*Obtem número de min, floor aredonda para baio */}
    const seconds = time % 60; {/*Padstart como não da pra dividir 5 e não tiver 2 characteres vai preencher o da esquerda com 0 */}
    const [minuteLeft,  minuteRight] = String(minutes).padStart(2, '0').split('');{/*Como não passou anda o split está partindo cada character em arrays diferentes*/}
    const [secondLeft,  secondRight] = String(seconds).padStart(2, '0').split('');{/*Como não passou anda o split está partindo cada character em arrays diferentes*/}
    function startCountDown() {
    setActive(true);
    }

    useEffect(()=> { //setTimeout - aconteça depois de um tempo, exec depois de 1 segundo = 1000
        if(active && time > 0) {    
        setTimeout(() =>{setTime(time - 1);{/*Tira 1s do timer*/} }, 1000)}}, [active, time])//o que exec. vai ser sempre função, seg param, quando? ou seja quando valo de active mudar..
    return (                                                                    //quando o time muda, o logo acima ele está sendo mudado dentro setTime
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
        </div>
        <button type="button" className={styles.countDownButton} onClick={startCountDown}>
            Iniciar um ciclo
        </button>
        </div>
    )
}