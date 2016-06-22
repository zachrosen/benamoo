namespace app {
export class MainController {

public question: IQuestion;
public create() {

  this.MainService.create(this.question)

}

  constructor (private MainService: app.MainService,
  private $state:ng.ui.IStateService) {



  }
}
angular.module("app").controller("MainController", MainController)
}
