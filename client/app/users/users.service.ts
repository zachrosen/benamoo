namespace app {
  interface IUserResourceClass extends ng.resource.IResource<IUserResourceClass>, IUser{}
  interface IUserResource extends ng.resource.IResourceClass<IUserResourceClass>{
    update(params:Object);
    update(params:Object, body:Object);
  }
  export class UserService {
    private UserResource: IUserResource;
    public status = {
          _id: '',
          email: ''
        }

    public login(u: IUser) {
      let q = this.$q.defer();
      this.$http.post('/api/v1/users/login', u).then((res) => {
        this.setToken(res.data['token']);
        this.setUser();
        q.resolve();
      }, (err) => {
        q.reject(err);
      });
      return q.promise;
    }

    public register(u: IUser) {
      let q = this.$q.defer();
      this.$http.post('/api/v1/users/register', u).then((res) => {
        this.setToken(res.data['token']);
        this.setUser();
        // TODO: show logout button on page refresh, if person is logged in
        q.resolve(res.data);
      }, (err) => {
        q.reject(err);
      });
      return q.promise;
    }

    public logout() {
      this.$window.localStorage.removeItem('token');
      this.status._id = '';
      this.status.email = '';
    }

    public setUser() {
      let u = JSON.parse( this.urlBase64Decode( this.$window.localStorage.getItem('token').split('.')[1] ) );
      this.status._id = u._id;
      this.status.email = u.email;
    }

    public getToken() {
      return this.$window.localStorage.getItem('token');
    }

    public setToken(token: string) {
      this.$window.localStorage.setItem('token', token)
    }

    private urlBase64Decode(str) {
      let output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: { break; }
        case 2: { output += '=='; break; }
        case 3: { output += '='; break; }
        default: {
          throw 'Illegal base64url string!';
        }
      }
      return decodeURIComponent(encodeURIComponent(this.$window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }

    constructor(
      private $http: ng.IHttpService,
      private $q: ng.IQService,
      private $window: ng.IWindowService,
      private $resource: ng.resource.IResourceService
    ) {
      if (this.getToken()) this.setUser();
      this.UserResource = <IUserResource>$resource('/api/v1/users/:id',
      null, {'update': {'method': 'PUT'}});
    }
  }
  angular.module('app').service('UserService', UserService);
}
