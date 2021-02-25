import '../styles/global.css';
import {  ChallengesProvider } from '../contexts/ChallengesContext';
import { CountDownProvider } from '../contexts/CountDownContext';
function MyApp({ Component, pageProps }) {
  
  //todos elementos dentro Provider > acesso aos dados do contexto. value - tipo de inform q vou enviar
  //como MyApp ta por volta de toda minha aplicação então toda app vai ter acess
  //lembrar de que os providers também tem dependencias entre eles. Não precisamos colocar countdown pois não vai estar em todas telas 
  return (
  <ChallengesProvider>
  <Component {...pageProps} /> 
  </ChallengesProvider>
  )
  }

export default MyApp
