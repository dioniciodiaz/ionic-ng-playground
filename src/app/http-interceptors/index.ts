import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ParseInterceptor } from './parseInterceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ParseInterceptor, multi: true },
];