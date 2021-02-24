import Document, {Html, Head, Main, NextScript} from 'next/document';       /*Temos que colocar por padrão */
export default class MyDocument extends Document {
render(){
    return (
        <Html>
        <Head>{/*Se precisar de algo que vá se repetir para todos <*/}
        

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="shortcut icon" href="favicon.png" type="image/png"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body>
            <Main/>{/*É onde vai mostrar aplicação*/}
            <NextScript/>{/*Scripts o nest injeta de forma auto*/}
        </body>
        </Html>
    )
}
}