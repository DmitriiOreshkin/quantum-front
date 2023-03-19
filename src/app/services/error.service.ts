import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  error$ = new Subject();
  handle(message: string) {
    this.error$.next(message);
  }
  clear() {
    this.error$.next('');
  }
}
