import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { LoaderService } from './loader.service';
import { Injectable  , Injector} from "@angular/core";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService  , private injector: Injector , private _http:HttpClient) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let  authService = this.injector.get(AuthService) ;
      let tokenzedReq ;
      if(req.headers.get(`skip`))
      {
         tokenzedReq = req.clone({
          setHeaders : {
            Authorization :  `Bearer ${authService.getToken()} `
          }
        }) ;
      }else
      {
        debugger
        // this.loaderService.show();
        tokenzedReq = req.clone({
          setHeaders : {
            Authorization :  `Bearer ${authService.getToken()} `
          }
        }) ;
      }
          //  this._http.post(`https://waz3ly.net/dashboard/api/me` , {tokenzedReq} ).subscribe(res => {
          //  })4

          return next.handle(tokenzedReq).pipe(
            catchError((error) => {
              if(error.error.status == 'Token is Expired' )
              {
                console.log('you should go out ');
                authService.logOut()
              }
              console.log('error in intercept')
              return throwError(error);
            })
          )

    }
}
