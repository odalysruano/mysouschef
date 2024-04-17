import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import logoImg from '../../static/Logo.png';

export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <Container>
            <Grid container rowSpacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h3">
                        MySousChef
                    </Typography>
                    {showLogin ? 
                        <LoginForm setUser={setUser} /> 
                        : 
                        <SignUpForm setUser={setUser} />
                    }
                </Grid>
                <Grid item xs={12} md={12}>
                    <img style={{width: 300, borderRadius: '20%'}} src={logoImg} alt="MySousChefLogo" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button variant='contained' size='small' onClick={() => setShowLogin(!showLogin)}>
                        {showLogin ? 'CLICK TO SIGN UP' : 'CLICK TO LOG IN'}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
