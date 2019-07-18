# Angular MarkDown Editor

* A directive for MarkDown which can be used with text area to make text area compatible for mark down support.
* It is developed using `Angular >=7.1.0` and its newly introduced `ng g library` schematics.
* Library location: `projects/angular-mark-down-editor` directory of this repository.


## Examples/Demo

* Live Demo [Example](https://stackblitz.com/edit/angular-ksq5mm)

![angular-mark-down-editor](https://i.stack.imgur.com/lKnSi.png)

## Installation

`npm i ang-mark-down-editor`

## API

`import { AngularMarkDownEditorModule } from 'ang-mark-down-editor';`<br>
`directive: MarkDownEditor`

## Usage

 ```typescript

    // Module File
    import { AngularMarkDownEditorModule } from 'ang-mark-down-editor'

    @NgModule({ 
        imports: [AngularMarkDownEditorModule]
    })

    // Component File
    import { Component } from '@angular/core';

    @Component({
      selector: 'my-app',
      template: `<textarea MarkDownEditor (valueChange)="onValueChange($event)">
                 </textarea>`,
      styleUrls: [ './app.component.css' ]
    })
    export class AppComponent  {
    }

  ```
  
## Test

Run tests

```
npm test
```

## License

[MIT](https://tldrlegal.com/license/mit-license) © [Vishal Hasnani](https://github.com/Hasnanivishal)


**Thanks for Installing**

> Conatct me for any suggestion/issues -> hasnanivishal@gmail.com