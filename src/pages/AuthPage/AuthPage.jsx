import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);

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
                    <Button variant='contained' size='small' onClick={() => setShowLogin(!showLogin)}>
                        {showLogin ? 'CLICK TO SIGN UP' : 'CLICK TO LOG IN'}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
