import * as express from 'express';
import * as controller from './questions.controller';

const router = express.Router();



router.post('/', controller.create);



export = router;
