import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { SortableModule } from '@progress/kendo-angular-sortable';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { InlineSVGModule } from 'ng-inline-svg';
//import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModuleShared,
        HttpModule,
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
