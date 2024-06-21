import { useState } from "react";
import { blue } from "@mui/material/colors";
import "./Gerador.css"
import { 
    TextField, 
    Checkbox, 
    Slider, 
    Button, 
    ButtonProps, 
    FormGroup,
    FormControlLabel,
    styled,
    Typography, 
    IconButton,
    Tooltip,
    Snackbar
} 
from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const GenerateButton = styled(Button) <ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    alignSelf: "center",
    "&:hover": {
        backgroudColor: blue[700],
    },
}));

const RangeSlider = styled(Slider)({
    width: "90%",
    alignSelf: "center",
    color: "#c1c1c1", // cor placeholder
    height: 8,
    '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

function algorithm(uppercaseChecked:boolean, numbersChecked:boolean, symbolsChecked:boolean, range:number){
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const upper = chars.toUpperCase();
    const numbers = "0123456789";
    const specialChars = "!@#$%&*_?|";
    const allchars = chars + upper + numbers + specialChars;

    let password = "";

        if (uppercaseChecked == true && numbersChecked == true && symbolsChecked == true){
            for (let x = 0; x<= range; x++){
                password += allchars.charAt(Math.floor(Math.random() * allchars.length));
            }
        }else if(uppercaseChecked == true && numbersChecked == true && symbolsChecked == false){
            for (let x = 0; x<= range; x++){
                password += (chars + upper + numbers).charAt(Math.floor(Math.random() * (chars + upper + numbers).length));
            }
        }else if(uppercaseChecked == true && numbersChecked == false && symbolsChecked == false){
            for (let x = 0; x<= range; x++){
                password += (chars + upper).charAt(Math.floor(Math.random() * (chars + upper).length));
            }
        }else if(uppercaseChecked == false && numbersChecked == true && symbolsChecked == true){
            for (let x = 0; x<= range; x++){
                password += (chars + numbers + specialChars).charAt(Math.floor(Math.random() * (chars + numbers + specialChars).length));
            }
        }else if(uppercaseChecked == false && numbersChecked == true && symbolsChecked == false){
            for (let x = 0; x<= range; x++){
                password += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
        }else if(uppercaseChecked == false && numbersChecked == false && symbolsChecked == true){
            for (let x = 0; x<= range; x++){
                password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
            }
        }else if (uppercaseChecked == true && numbersChecked == false && symbolsChecked == true){
            for (let x = 0; x<= range; x++){
                password += (chars + upper + specialChars).charAt(Math.floor(Math.random() * (chars + upper + specialChars).length));
            }
        }else{
            for (let x = 0; x<= range; x++){
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        }
    return password;
}

// AJEITAR A PARTE DE GERAR SENHAS PARA INCLUIR DADOS SOZINHOS. EX. APENAS NUMEROS OU APENAS SYMBOLOS
{/*
function passwordCheck(password:string){
    if((password.length<= 8) || (password.length<=15 && password[])){
        return "Password very weak";
    }else if (){

    }
    for(let x = 0; x<= password.length; x++){
        
    }
    // lembrar de colocar verificacao para tamanho da senha
}
*/}

function Gerador(){
    const [uppercaseChecked, setUpperChecked] = useState(true);
    const [numbersChecked, setNumberChecked] = useState(true);
    const [symbolsChecked, setSymbolChecked] = useState(true);
    const [value, setValue] = useState(8);
    const [password, setPassword] = useState("");
    const [openSnack, setOpenSnack] = useState(false);

    const handleChangeUpper = () => {
        setUpperChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
      };
    const handleChangeNumber = () => {
        setNumberChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
    };
    const handleChangeSymbol = () => {
        setSymbolChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
    };
    const handleValue = (_event:any, value:any) => {
        setValue(value);
    }
    const handleSnackClose = (_event:any, reason:any) =>{
        if (reason == "clickaway"){
            return;
        }
        setOpenSnack(false);
    }
    const copyToClipboard = () =>{
        navigator.clipboard.writeText(password);
        setOpenSnack(true);
    }
    return(
        <div className="gerador">
                <form className="form">
                    <div className="passThings">
                        <TextField 
                        className="passcamp" 
                        label="Your password will appear here" 
                        inputProps={{readOnly:true}}
                        value={password}
                        />
                        <Tooltip title="Copy Password">
                            <IconButton className="icon" onClick={copyToClipboard}>
                                <ContentCopyIcon className="icoon"></ContentCopyIcon>
                            </IconButton>
                        </Tooltip>
                        <Snackbar
                            open={openSnack}
                            autoHideDuration={6000}
                            onClose={handleSnackClose}
                            message="Password copied to clipboard!"
                        />
                    </div>
                    <div className="checkboxes">
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={uppercaseChecked} 
                                onChange={handleChangeUpper}
                                />} 
                                label="Include Uppercases"/>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={numbersChecked}
                                onChange={handleChangeNumber}
                                />} 
                                label="Include Numbers"/>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={symbolsChecked}
                                onChange={handleChangeSymbol}
                                />} 
                                label="Include Symbols"/>
                        </FormGroup>
                    </div>
                    <Typography>Select the password range:</Typography>
                    <RangeSlider 
                    valueLabelDisplay="auto" 
                    defaultValue={8} 
                    min={4} 
                    max={140} 
                    value={value} 
                    onChange={(_event, value) => handleValue(_event, value)}
                    >
                    </RangeSlider>
                    <GenerateButton 
                    variant="contained"
                    onClick={() => setPassword(algorithm(uppercaseChecked, numbersChecked, symbolsChecked, value))}
                    >Generate</GenerateButton>
                </form>
        </div>    
    );
}
export default Gerador