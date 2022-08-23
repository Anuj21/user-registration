import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
})
export class AppMaterialModule {}
