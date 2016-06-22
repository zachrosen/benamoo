import * as mongoose from 'mongoose';

export interface IQuestionModel extends IQuestion, mongoose.Document { }

let questionSchema = new mongoose.Schema({
  question: String
});

export let Question = mongoose.model('Question', questionSchema);
