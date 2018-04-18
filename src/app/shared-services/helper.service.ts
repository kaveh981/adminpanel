import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HelperService {

  constructor(private snackBar: MatSnackBar) { }
  openSnackBar(message: string, error?) {
    if (error) {
      message = message + ' ' + (error.error.text || error.error || error.message);
    }
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
