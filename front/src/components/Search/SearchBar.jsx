import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "10px",
  backgroundColor: '#ffffff',
  marginRight: 70,
  width: '185.31px',
  height: '39.5px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#ffffff',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    background: '#ffffff',
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'gray',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

export default function SearchBar() {
  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon style={{ color: "black" }} sx={{ marginRight: "-11px" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Type here..."
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Box>
  );
}
