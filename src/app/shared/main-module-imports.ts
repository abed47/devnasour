import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from '../layouts/main-layout/components/footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';


/**
 * @description imports and declarations for the main layout declarations
 */
export default {
    imports: [
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule
    ],
    declarations: [
        FooterComponent
    ]
}