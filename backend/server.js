import app from './app.js';

const port = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production'_){
  app.use(express.static('build'))
}

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

export default app;
