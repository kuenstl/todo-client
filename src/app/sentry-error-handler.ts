import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as Sentry from '@sentry/browser';

import { environment } from '../environments/environment';

Sentry.init({
  dsn:
    'https://c9b436394c7844158f1ed19458abaf31@o409972.ingest.sentry.io/5285874',
  integrations: [
    new Sentry.Integrations.TryCatch({
      XMLHttpRequest: false,
    }),
  ],
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  extractError(error) {
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof Error) {
        return error.error;
      }

      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      if (typeof error.error === 'string') {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }
      return error.message;
    }
    return null;
  }

  handleError(error) {
    let extractedError = this.extractError(error) || 'Handled unknown error';
    const eventId = Sentry.captureException(extractedError);

    if (!environment.production) {
      console.error(extractedError);
    }
  }
}
