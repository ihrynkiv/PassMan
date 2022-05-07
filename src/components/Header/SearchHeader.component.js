import {
  alpha,
  AppBar, IconButton, InputBase, styled, Toolbar,
} from '@mui/material';
import React, {useState} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import {useHistory} from "react-router-dom";
import {useQuery} from "../../hooks/useQuery.hook";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '150px',
    },
  },
}));

export const SearchHeader = ({ onHomeClick, onAddRecordClick }) => {
  const query = useQuery();
  const search = query.get('search') || ''

  const [searchQuery, setSearchQuery] = useState(search)
  const history = useHistory()
  const searchChangeHandler = (e) => {
    setSearchQuery(e.target.value)
    history.push({
      pathname: '/',
      search: `?search=${e.target.value}`
    })
  }

  return (
    <AppBar position="static" color="primary" style={{ width: '396px' }} title="PassMan">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onHomeClick}
        >
          <HomeIcon />
        </IconButton>
        <Search sx={{ flexGrow: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchQuery}
            onChange={searchChangeHandler}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={onAddRecordClick}
        >
          <AddCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}


