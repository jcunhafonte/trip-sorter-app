import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ResponseService} from './services/response.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from './ui/ui.module';
import {FormComponent} from './components/form.component';
import {MainComponent} from './containers/main.component';
import {ShortestPathFinderService} from './services/shortest-path-finder.service';
import {ListComponent} from './components/list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule
  ],
  providers: [
    ResponseService,
    ShortestPathFinderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
