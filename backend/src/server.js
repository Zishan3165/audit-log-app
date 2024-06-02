import app from './index.js';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

export default app;
