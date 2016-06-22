import * as express from 'express';

const router = express.Router();

router.use('/facebook', require('./facebook/routes'));

export = router;
