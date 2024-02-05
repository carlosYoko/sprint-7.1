import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/api', (_req: Request, res: Response) => {
  res.status(200).send('Hello to API');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:', PORT);
});
