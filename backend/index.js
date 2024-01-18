import express from 'express';
import router from './routes/index';
import cors from "cors";
import bodyParser from 'body-parser';
import path from "path";


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
