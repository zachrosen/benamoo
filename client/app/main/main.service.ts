namespace app {
  interface IQuestionResourceClass extends IQuestion, ng.resource.IResource<IQuestionResourceClass> { }
    interface IQuestionResource extends ng.resource.IResourceClass<IQuestionResourceClass> {
        update(params: Object);
        update(params: Object, body: Object);
    }



  export class MainService {

    private QuestionResource: IQuestionResource;



    public create(question:IQuestion) {
        return this.QuestionResource.save(question).$promise;
       }


    constructor ( private $http: ng.IHttpService,
        private $q: ng.IQService,
        private $resource: ng.resource.IResourceService)

        {
      this.QuestionResource = <IQuestionResource>$resource("/api/v1/main/:id", null, { "update": { "method": "PUT" } })

   }
  }
angular.module("app").service("MainService", MainService);
}
