import * as express from 'express';
import * as controller from './questions.controller';

const router = express.Router();

router.get('/', controller.getAll);

router.post('/', controller.create);



export = router;
