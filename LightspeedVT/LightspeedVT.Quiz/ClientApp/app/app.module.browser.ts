import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { AngularSvgIconModule } from 'angular-svg-icon';
//import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SortableModule,
        AppModuleShared,
        Http
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
