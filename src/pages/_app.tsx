import '../styles/global.css';
import {  ChallengesProvider } from '../contexts/ChallengesContext';
function MyApp({ Component, pageProps }) {
  
  //todos elementos dentro Provider > acesso aos dados do contexto. value - tipo de inform q vou enviar
  //como MyApp ta por volta de toda minha aplicação então toda app vai ter acess
  return (
  <ChallengesProvider>
  <Component {...pageProps} />
  </ChallengesProvider>
  )
  }

export default MyApp
