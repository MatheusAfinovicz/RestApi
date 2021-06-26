import app from './app';

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
