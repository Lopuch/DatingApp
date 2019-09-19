import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        req: import("@angular/common/http").HttpRequest<any>,
        next: import("@angular/common/http").HttpHandler
    ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(error.statusTest);
                }
                if(error instanceof HttpErrorResponse){
                    const applicationError = error.headers.get('Application-Error');
                    if(applicationError){
                        return throwError(applicationError);
                    }

                    const serverError = error.error;
                    let modalStateErrors = '';
                    // TADY SE TO LISI, on ma v error jeste jedno pole ERRORS a v nem za potom hodnoty, ja mam o uroven min
                    // resi to v Udemy 5 - Handling errors in Angular
                    if(serverError && typeof serverError === 'object'){
                        for(const key in serverError){
                            if(serverError[key]){
                                modalStateErrors += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || serverError);
                }
            })
        );
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};