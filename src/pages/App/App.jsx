import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import AddToPantryPage from '../AddToPantryPage/AddToPantryPage';
import AddMyOwnRecipePage from '../AddMyOwnRecipePage/AddMyOwnRecipePage';
import EditRecipePage from '../EditRecipePage/EditRecipePage';
import MyKitchenPage from '../MyKitchenPage/MyKitchenPage';
import NavBar from '../../components/NavBar/NavBar';
import RecipeDetailPage from '../RecipeDetailsPage/RecipeDetailsPage';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006241',
    },
    secondary: {
      main: '#dff9ba',
    },
    background: {
      default: "#d4e9e2",
      paper: "#1e3932",
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Cabin',
    ].join(','),
    h3: {
      color: '#1e3932',
      fontWeight: 'bold',
    },
  }
});

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="App">
        { user ?
          <>
            <NavBar user={ user } setUser={ setUser } />
            <br></br>
            <Routes>
              <Route path="/" element={<MyKitchenPage />} />
              <Route path="/addIngredient" element={<AddToPantryPage />} />
              <Route path="/addRecipe" element={<AddMyOwnRecipePage />} />
              <Route path="/editRecipe/:id" element={<EditRecipePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={ setUser } />
        }
      </main>
    </ThemeProvider>
  );
}
