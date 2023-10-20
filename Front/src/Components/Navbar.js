import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Toolbar, AppBar, useMediaQuery, useTheme, IconButton, Menu, MenuItem, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import background from './../Assets/Background.png';
import logo from './../Assets/Logo.png';

const NavButton = function ({ to, children }) {
    return (
        <NavLink to={to}>
            <StyledButton>{children}</StyledButton>
        </NavLink>
    );
};

const CustomNavLinkIconButton = ({ to }) => {
    return (
        <NavLink to={to}>
            <IconButton color="inherit" edge="start">
                <StyledLogo src={logo} alt="Logo"/>
            </IconButton>
        </NavLink>
    );
};

function CustomMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                edge="start"
                color="default"
                aria-label="menu"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to="/Pokemon">
                        <StyledButton>Pokemon</StyledButton>
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to="/Yugioh">
                        <StyledButton>Yu-Gi-Oh!</StyledButton>
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to="/Magic">
                        <StyledButton>Magic</StyledButton>
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to="/Onepiece">
                        <StyledButton>One Piece</StyledButton>
                    </NavLink>
                </MenuItem>
            </Menu>
        </>
    );
}

function SearchBar({ onSubmit, onClose }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchValue.trim() === "") {
            return;
        }
        onSubmit(searchValue);
        onClose();
    };

    return (
        <form onSubmit={handleSearchSubmit}>
            <TextField 
                id="search"
                label="Rechercher"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" >
                            <IconButton type="submit" >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{backgroundColor: 'white', borderRadius: '15px', border: 'none'}}
            />
        </form>
    );
}

const appBarStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}

const StyledLogo = styled('img')(({ theme }) => ({
    height: '80px',
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
        height: '40px',
    },
}));

const StyledButton = styled(Button)({
    color: 'black',
    backgroundColor: 'transparent',
    variant: 'text',
    fontWeight: 'bold',
    textTransform: 'none',
    marginRight: '10px'
})

const Navbar = function () {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);
    
    const handleSearchIconClick = () => {
        setSearchOpen(!searchOpen);
    };
    
    const handleSearchClose = () => {
        setSearchOpen(false);
    };

    const handleSearchSubmit = (searchValue) => {
        console.log('Recherche effectuée avec la valeur :', searchValue);
        setSearchOpen(false);
        navigate(`/search?q=${searchValue}`)
    };

    return (
        <AppBar position="static" style={appBarStyle}>
            <Toolbar>
            <CustomNavLinkIconButton to="/"/>
                {!isMobile && (
                    <>
                        <NavButton to="/Pokemon">
                            Pokémon
                        </NavButton>
                        <NavButton to="/Yugioh">
                            Yu-Gi-Oh!
                        </NavButton>
                        <NavButton to="/Magic">
                            Magic
                        </NavButton>
                        <NavButton to="/Onepiece">
                            One Piece
                        </NavButton>
                        <div style={{ marginLeft: 'auto'}}>
                            <SearchBar onSubmit={handleSearchSubmit} onClose={handleSearchClose}/>
                        </div>
                    </>
                )}
                {isMobile && (
                    <div style={{ marginLeft: 'auto'}}>
                        <IconButton onClick={handleSearchIconClick}>
                            <SearchIcon />
                        </IconButton>
                        <CustomMenu />
                    </div>
                )}

                <Dialog open={searchOpen} onClose={handleSearchClose}>
                    <DialogTitle>Rechercher</DialogTitle>
                    <DialogContent>
                        <SearchBar onSubmit={handleSearchSubmit} onClose={handleSearchClose} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSearchClose} color="primary">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;