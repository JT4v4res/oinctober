import React, { FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";

export default function Register () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        //adicionar tratamento de cadastro
    }
    
    return (
        <div className="login">
            <h1>Oincregister</h1>
            <div className="login-input">    
                <form>
                    <fieldset className="fieldset-border">
                        <legend className="legend-border">Nome</legend>
                        <input type="email" id="email" placeholder="seu email" value={name} onChange={(event) => setName(event.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset-border">
                        <legend className="legend-border">Email</legend>
                        <input type="email" id="email" placeholder="seu email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset-border">
                        <legend className="legend-border">Senha</legend>
                        <input type="password" id="password" placeholder="sua senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </fieldset>
                    <button type="submit" onSubmit={handleSubmit}>Cadastrar</button>
                </form>
                <Link to="/"><p>Voltar para o início</p></Link>
            </div>
        </div>
    );
}