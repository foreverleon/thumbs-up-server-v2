import express, { Application } from 'express';
import cors from 'cors';    
import routes from './routes';
// const port: number = process.env.PORT as number || 9000;
const port: number = 9000;
const app: Application = express();
// import chokidar from 'chokidar';

/** Middlewares before routes */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.text());
app.use(cors())

app.use(routes);


// chokidar.watch('src').on('all', (event, path) => {
//     console.log(event, path);
// });

app.listen(port, () => {
    console.log('Listening at ', port);
});
