namespace app {
  angular.module("app").config ((
    $stateProvider:ng.ui.IStateProvider

  ) => {
    $stateProvider.state("main", {
      url:"/",
      templateUrl: "/client/app/main/questions/main.html",
      controller: "MainController as vm"
    })
  });
}
