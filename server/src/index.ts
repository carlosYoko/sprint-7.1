import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const app = express();

// Configuración de express-session
app.use(
  session({
    secret: 'secret-word',
    resave: false,
    saveUninitialized: true,
  })
);

// Configuración de la estrategia de Google
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '838434056572-fhkhvep5k867tcq2e98rvjnmcvl9bh3h.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/yeah',
    },
    (accessToken, refreshToken, profile, done) => {
      // Lógica para gestionar la información del perfil del usuario
      console.log({
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile,
        done: done,
      });
      return done(null, profile);
    }
  )
);

// Inicializar Passport y usar sesiones para mantener la autenticación
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get('/api', (_req: Request, res: Response) => {
  res.status(200).send('Hello to API');
});

app.get('/yeah', (_req: Request, res: Response) => {
  res.status(200).send('Yeah to API');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:', PORT);
});
