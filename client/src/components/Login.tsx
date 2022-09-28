import { useState } from 'react';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {
  InputAndIcon, LoginContainer, LoginInput, StyledLogin, SubmitButton,
} from './styles/Login.styled';
import createToken from '../api/createToken';
import ErrorMessage from './styles/ErrorMessage.styled';
import Logo from './styles/Logo.styled';
import { LargeTitle, LinkTitle, SmallTitle } from './styles/Title.styled';
import getCookie from '../helpers/getCookie';
import Footer from './Footer';
import Icon from './Icon';
import { LoadingButton } from './styles/Button.styled';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPasswoed] = useState('');
  const [emptyUserNameErr, setEmptyUserNameErr] = useState(0);
  const [emptyPasswordErr, setEmptyPasswordErr] = useState(0);
  const [authErr, setAuthErr] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setAuthErr(0);
    setEmptyUserNameErr(0);
    setEmptyPasswordErr(0);
    if (!userName) setEmptyUserNameErr(+true);
    if (!password) setEmptyPasswordErr(+true);
    if (userName && password) {
      setIsLoading(true);
      await createToken({ userName, password });
      const checkToken = getCookie('checkToken');
      if (checkToken) {
        window.location.href = '/';
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setAuthErr(+true);
      }
    }
  };

  return (
    <StyledLogin>
      <LoginContainer>
        <Logo width="7vw" mobilewidth="20vw" />
        <LargeTitle>כניסה</LargeTitle>
        <SmallTitle>
          אין לך חשבון?
          {' '}
          <LinkTitle to="/signup">הרשמה</LinkTitle>
        </SmallTitle>
        <InputAndIcon>
          <Icon src={<AccountCircleIcon />} size="1.1" />
          <LoginInput
            label="שם משתמש"
            onChange={(e) => setUserName(e.target.value)}
          />
        </InputAndIcon>
        <ErrorMessage showErr={emptyUserNameErr}>שדה חובה</ErrorMessage>
        <InputAndIcon>
          <Icon src={<KeyIcon />} size="1.1" />
          <LoginInput
            type={showPassword ? 'text' : 'password'}
            label="סיסמה"
            onChange={(e) => setPasswoed(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword
                    ? <Icon src={<Visibility />} size="0.7" mobilesize="0.9" />
                    : <Icon src={<VisibilityOff />} size="0.7" mobilesize="0.9" />}
                </IconButton>
              ),
            }}
          />
        </InputAndIcon>
        <ErrorMessage showErr={emptyPasswordErr}>שדה חובה</ErrorMessage>
        <ErrorMessage showErr={authErr}>שם משתמש או סיסמה שגויים ):</ErrorMessage>
        <SubmitButton green={+true} onClick={handleSubmit}>{!isLoading ? 'כניסה' : (<LoadingButton />)}</SubmitButton>
      </LoginContainer>
      <Footer />
    </StyledLogin>
  );
};

export default Login;
