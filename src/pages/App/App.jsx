import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import AddToPantryPage from '../AddToPantryPage/AddToPantryPage';
import AddMyOwnRecipePage from '../AddMyOwnRecipePage/AddMyOwnRecipePage';
import MyKitchenPage from '../MyKitchenPage/MyKitchenPage';
import NavBar from '../../components/NavBar/NavBar';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff2424',
      light: '#ff8484',
      dark: '#9a1414',
    },
    secondary: {
      main: '#262641',
    },
  },
});

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <ThemeProvider theme={theme}>
      <main className="App">
        { user ?
          <>
            <NavBar user={ user } setUser={ setUser } />
            <Routes>
              <Route path="/" element={<MyKitchenPage />} />
              <Route path="/addIngredient" element={<AddToPantryPage />} />
              <Route path="/addRecipe" element={<AddMyOwnRecipePage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={ setUser } />
        }
      </main>
    </ThemeProvider>
  );
}
