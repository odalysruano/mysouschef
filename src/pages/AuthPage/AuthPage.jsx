import { useState } from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <main>
            <h1>AuthPage</h1>
            {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
            <div>
                <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'CLICK TO SIGN UP' : 'CLICK TO LOG IN'}</button>
            </div>
        </main>
    )
}
