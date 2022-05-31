import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from '../layouts/main-layout/components/footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../pages/auth/reset-password/reset-password.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { MatSelectModule } from '@angular/material/select';
import { PrivacyPolicyComponent } from '../pages/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from '../pages/terms-of-use/terms-of-use.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from '../pages/home/home.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CountUpModule } from 'ngx-countup';
import { RatingModule } from 'ng-starrating';
import { MatIconModule } from '@angular/material/icon';
import { GalleryModule } from 'ng-gallery';
import { SharedModule } from './shared.module';
import { RequestDesignComponent } from '../pages/request-design/request-design.component';


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
        MatFormFieldModule,
        MatSelectModule,
        MatSidenavModule,
        NgxUsefulSwiperModule,
        CountUpModule,
        RatingModule,
        MatIconModule,
        GalleryModule,
        SharedModule
    ],
    declarations: [
        FooterComponent,
        ResetPasswordComponent,
        ContactUsComponent,
        PrivacyPolicyComponent,
        TermsOfUseComponent,
        HomeComponent,
        RequestDesignComponent,
    ]
}