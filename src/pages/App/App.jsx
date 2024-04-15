import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import AddToPantryPage from '../AddToPantryPage/AddToPantryPage';
import MyKitchenPage from '../MyKitchenPage/MyKitchenPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <>
      <main className="App">
        { user ?
          <>
            <NavBar user={ user } setUser={ setUser } />
            <Routes>
              <Route path="/" element={<MyKitchenPage />} />
              <Route path="/addIngredient" element={<AddToPantryPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={ setUser } />
        }
      </main>
    </>
  );
}
