namespace app {
  export class UserLoginController {
    public user: IUser;

    public register() {
      this.UserService.login(this.user).then((res) => {
        this.$state.go('user main')
      }, (err) => {
        alert(err);
      })
    }
    constructor(
      private UserService: app.UserService,
      private $state: ng.ui.IStateService
    ) {

    }
  }
  angular.module('app').controller('UserLoginController', UserLoginController);
}
