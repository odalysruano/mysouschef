import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="primary" variant="contained"> Welcome, { user.name } </Button>
                    &nbsp; &nbsp;
                    <Button color="secondary" variant="contained" href="/" component={Link}>My Kitchen</Button>
                    &nbsp; &nbsp;
                    <Button color="secondary" variant="contained" href="/addIngredient" component={Link}>Add Ingredients</Button>
                    &nbsp; &nbsp;
                    <Button color="secondary" variant="contained" href="/addRecipe" component={Link}>Add Recipe</Button>
                    &nbsp; &nbsp;
                    <Button color="secondary" variant="contained" href="" onClick={ handleLogOut } component={Link}>Log Out</Button>
                    <Link to="" onClick={ handleLogOut }>Log Out</Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
