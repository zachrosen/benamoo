namespace app {
  angular.module('app').config((
    $stateProvider: ng.ui.IStateProvider
  ) => {
    $stateProvider.state('user register', {
      url: '/register',
      templateUrl: '/client/app/users/register/users.register.html',
      controller: 'UserRegisterController as vm'
    })
  });
}
