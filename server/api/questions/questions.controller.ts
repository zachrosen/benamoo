import * as express from 'express';
import {Question, IQuestionModel} from './questions.model';



export function create (req: express.Request, res: express.Response, next) {
let q = new Question(req.body);
q.save((err, q) => {
  if(err) return next(err);
  res.json(q);
});
}
