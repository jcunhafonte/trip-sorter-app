import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class UIModule {
}
