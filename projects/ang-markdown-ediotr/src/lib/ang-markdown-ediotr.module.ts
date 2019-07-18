import { NgModule } from '@angular/core';
import { AngMarkdownEdiotrComponent } from './ang-markdown-ediotr.component';
import { MarkdownEditorDirective } from './markdown-editor.directive';

@NgModule({
  declarations: [AngMarkdownEdiotrComponent, MarkdownEditorDirective],
  imports: [
  ],
  exports: [AngMarkdownEdiotrComponent]
})
export class AngMarkdownEdiotrModule { }
