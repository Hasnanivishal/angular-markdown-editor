import { NgModule } from '@angular/core';
import { AngularMarkDownEditorComponent } from './angular-mark-down-editor.component';
import { MarkDownEditorDirective } from './mark-down-editor.directive';

@NgModule({
  declarations: [AngularMarkDownEditorComponent, MarkDownEditorDirective],
  imports: [
  ],
  exports: [AngularMarkDownEditorComponent, MarkDownEditorDirective]
})
export class AngularMarkDownEditorModule { }
