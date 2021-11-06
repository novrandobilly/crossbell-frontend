import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    padding: '0',
    '& .MuiOutlinedInput-input': {
      padding: '5px',
    },
    '& fieldset': {
      border: '2px solid #f79f35',
      borderRadius: '5px',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #f79f35',
    },
    '&:hover fieldset': {
      border: '2px solid #f79f35',
    },
  },
});
