import styles from '../styles/components/Profile.module.css';
export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/leandromendes25.png" alt="leandrom mendes"/>
        
        <div>   
            <strong>Leandro mendes da silva</strong>
            <p>
                <img src="icons/level.svg" alt="level"/>
                level 1</p>
        </div>
        </div>
    );
}