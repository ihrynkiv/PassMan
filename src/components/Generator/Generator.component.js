import React, {useCallback, useEffect, useState} from 'react'
import IconButton from "@mui/material/IconButton";
import {Box, Checkbox, FormControl, FormControlLabel, Slider} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { FormGroup } from '@mui/material';
import {Toast} from "../Toast/Toast.component";

const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const CAPITAL_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '1234567890'
const SYMBOLS = '!@#$%^&*'

export const Generator = () => {
  const [randomizedPassword, setRandomizedPassword] = useState('password')
  const [length, setLength] = useState(+window.localStorage.getItem('length') || 16)
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)

  const [hasNumbers, setHasNumbers] = useState(true)
  const [hasLowerLetters, setHasLowerLetters] = useState(true)
  const [hasCapitalLetters, setHasCapitalLetters] = useState(true)
  const [hasSymbols, setHasSymbols] = useState(true)

  const capitalLettersChangeHandler = (e) => setHasCapitalLetters(e.target.checked)
  const lowerLettersChangeHandler = (e) => setHasLowerLetters(e.target.checked)
  const numbersChangeHandler = (e) => setHasNumbers(e.target.checked)
  const symbolsChangeHandler = (e) => setHasSymbols(e.target.checked)
  const handleLengthChange = (e) => setLength(e.target.value)

  const generatePassword = useCallback(() => {
    let characters = []
    if (hasCapitalLetters) characters = [...characters, ...CAPITAL_CASE_LETTERS.split('')]
    if (hasLowerLetters) characters = [...characters, ...LOWER_CASE_LETTERS.split('')]
    if (hasNumbers) characters = [...characters, ...NUMBERS.split('')]
    if (hasSymbols) characters = [...characters, ...SYMBOLS.split('')]

    const passwordArr = []

    for (let i = 0; i < length; i++) {
      passwordArr.push(characters[Math.floor(Math.random() * characters.length)])
    }

    setRandomizedPassword(passwordArr.join(''))
  }, [hasSymbols, hasNumbers, hasLowerLetters, hasCapitalLetters, length])

  useEffect(() => {
    if (!hasCapitalLetters && !hasLowerLetters && !hasNumbers && !hasSymbols)
      setHasLowerLetters(true)

    if (!hasCapitalLetters && !hasNumbers && !hasSymbols && hasLowerLetters) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }

    generatePassword()
  }, [hasSymbols, hasNumbers, hasLowerLetters, hasCapitalLetters, length])

  const copyPasswordHandler = async () => {
    setOpen(true)
    return await navigator.clipboard.writeText(randomizedPassword)
  }

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100px',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        padding: '10px'
      }}
    >
     <div style={{wordBreak: 'break-all', maxWidth: '75%'}}>
       {randomizedPassword}
     </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <IconButton sx={{ ml: 1 }} color="inherit" onClick={copyPasswordHandler}>
          <ContentCopyIcon/>
        </IconButton>
        <IconButton sx={{ ml: 1 }} color="inherit" onClick={generatePassword}>
          <ShuffleIcon/>
        </IconButton>
      </div>
    </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'text.primary',
          borderRadius: 1,
          marginBottom: 'auto',
          p: 3,
        }}
      >
        <FormGroup>
          <FormControl style={{width: '250px', display: 'flex', flexDirection: 'row', marginBottom: '15px'}}>
            <span style={{margin: '5px', marginRight: '25px'}}>Length: </span>
            <Slider
              min={6}
              max={100}
              value={length}
              aria-label="Length"
              valueLabelDisplay="auto"
              onChange={handleLengthChange}
            />
          </FormControl>
          <FormControlLabel control={
            <Checkbox checked={hasCapitalLetters} onChange={capitalLettersChangeHandler}/>
          } label="A-Z" />
          <FormControlLabel control={
            <Checkbox checked={hasLowerLetters} disabled={disabled} onChange={lowerLettersChangeHandler}/>
          } label="a-z" />
          <FormControlLabel control={
            <Checkbox checked={hasNumbers} onChange={numbersChangeHandler}/>
          } label="0-9" />
          <FormControlLabel control={
            <Checkbox checked={hasSymbols} onChange={symbolsChangeHandler}/>
          } label="!@#$%^&*" />
        </FormGroup>
      </Box>
      <Toast severity="success" message="Copied successfully" setOpen={setOpen} open={open}/>
    </>
  )
}