import { Link } from "react-router-dom";
import '../styles/Inicio.css'

export default function Inico() {
    return (
        <>
            <div className="Interacao">
                <h1>Bem vindo ao REDEX</h1>
                <p>O Projeto de extensão para todos tem +50 projetos cadastrados</p>
                <img src="./src/assets/Logo_RedEX.png"  width={236} height={95} alt="Logo do aplicativo Redex" />

                <Link to='/Home' className="button-link">Entrar</Link>
            </div>
            
        </>
    )

}