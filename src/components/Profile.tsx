import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
export function Profile() {
    const { level} = useContext(ChallengesContext);//é uma prop q existem em level
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/leandromendes25.png" alt="leandrom mendes"/>
        
        <div>   
            <strong>Leandro mendes da silva</strong>
            <p>
                <img src="icons/level.svg" alt="level"/>
                level {level}</p>
        </div>
        </div>
    );
}