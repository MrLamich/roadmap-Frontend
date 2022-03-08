import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useHistory } from "react-router-dom";

export function Registration(){

    const history = useHistory();
    function registrationClick(){
        history.push("/main");
    }

    return(
      <Box>
          <Box sx={{flexGrow: 1}}>
              <AppBar position="static">
                  <Toolbar>
                      <Typography
                          variant="h5"
                          component="h1"
                          sx={{ flexGrow: 1 }}
                          align="center"
                      >
                          Roadmap
                      </Typography>
                  </Toolbar>
              </AppBar>
          </Box>

          <Container component="main" maxWidth="xs">
              <CssBaseline/>
              <Box
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
              >
                  <Typography component="h1" variant="h5">
                      Регистрация
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Логин"
                      />
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Почта"
                          name="email"
                          autoComplete="email"
                          autoFocus
                      />
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Пароль"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                      />
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={registrationClick}
                      >
                          Зарегистрироваться
                      </Button>
                      <Typography  align="center">
                          <Link href="/">
                              Войти
                          </Link>
                      </Typography>
                  </Box>
              </Box>
          </Container>
      </Box>
    );
}