import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly configSuccess: MatSnackBarConfig = {
    panelClass: ['snack-bar-success'],
    duration: 5000,
  };

  private readonly configError: MatSnackBarConfig = {
    panelClass: ['snack-bar-error'],
    duration: 5000,
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', this.configSuccess);
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', this.configError);
  }

  showCustom(message: string, config: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', config);
  }
}
