import axios from "axios";
import { createContext, useState } from "react";

interface AuthContextData {
    signed: boolean;
    user: string;
    authToken: string;
    userType: string;
    signIn(email: string, password: string): Promise<void>;
    logOut(): void;
}

interface Props{
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(''); 
    const [signed, setSigned] = useState(false);
    const [Type, setUserType] = useState('');
    
    async function signIn(email: string, password: string): Promise<void> {
        await axios.post("http://localhost:3001/auth", {
            email: email,
            password: password,
        })
        .then((response) => {
            setToken(response.data.access_token);
            setUser(response.data.user);
            setUserType(response.data.userType);
            setSigned(true);
        })
        .catch((err) => {
            if (err.response) {
                alert(`Ocorreu o seguinte erro: ${err.response.data}`);
            }
            else{
                alert(`Ocorreu o seguinte erro: ${err.message}`);
            }
        });
    }

    function logOut() {
        setToken('');
        setUser('');
        setUserType('');
        setSigned(false);
    }

    return (<AuthContext.Provider value={{signed: signed, user, authToken: token, signIn, logOut, userType: Type}}>
        {children}
    </AuthContext.Provider>
    );
}