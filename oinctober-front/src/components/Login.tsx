import React, { FormEventHandler, useState, useContext } from "react";
import '../_css/App.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/Context";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {signed,signIn} = useContext(AuthContext);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        signIn(email, password);

        if (signed) {
            navigate("/")
        }
    }

    return (
        <div className="login">
            <h1>Oinctenticação</h1>
            <div className="login-input">    
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset-border">
                        <legend className="legend-border">Email</legend>
                        <input type="email" id="email" placeholder="seu email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset-border">
                        <legend className="legend-border">Senha</legend>
                        <input type="password" id="password" placeholder="sua senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </fieldset>
                    <button type="submit" >Logar</button>
                </form>
                <Link to="/cadastro"><p>Cadastre-se aqui</p></Link>
                <Link to="/"><p>Voltar para o início</p></Link>
            </div>
        </div>
    );
}