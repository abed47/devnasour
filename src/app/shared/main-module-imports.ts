import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from '../layouts/main-layout/components/footer/footer.component';

/**
 * @description imports and declarations for the main layout declarations
 */
export default {
    imports: [
        MatButtonModule,
        MatInputModule
    ],
    declarations: [
        FooterComponent
    ]
}