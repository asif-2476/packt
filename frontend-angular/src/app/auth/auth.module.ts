import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import {  MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,  MatIconModule, MatInputModule, MatPaginatorModule , MatSnackBarModule, MatTableModule } from '@angular/material';
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule,MatFormFieldModule,
    MatInputModule,MatCardModule,MatDialogModule, MatExpansionModule,MatIconModule,MatPaginatorModule,  MatSnackBarModule, MatTableModule]
})
export class AuthModule {}
