namespace app {
export class MainController {

public question: IQuestion;
public questions: IQuestion[];
public create() {

  this.MainService.create(this.question);
  this.questions.push(<IQuestion>this.question);
  this.question;

}

  constructor (private MainService: app.MainService,
  private $state:ng.ui.IStateService) {

this.questions = MainService.getAll();


  }
}
angular.module("app").controller("MainController", MainController)
}
