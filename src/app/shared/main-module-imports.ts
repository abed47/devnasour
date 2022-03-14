import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from '../layouts/main-layout/components/footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../pages/auth/reset-password/reset-password.component';


/**
 * @description imports and declarations for the main layout declarations
 */
export default {
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule
    ],
    declarations: [
        FooterComponent,
        ResetPasswordComponent
    ]
}