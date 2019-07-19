# Angular MarkDown Editor

<p align="center">
  <a href="https://www.npmjs.com/package/ang-mark-down-editor">
    <img src="https://img.shields.io/npm/dm/ang-mark-down-editor.svg?style=flat" alt="downloads">
  </a>
 
  <a href="https://badge.fury.io/for/js/ang-mark-down-editor">
    <img src="https://badge.fury.io/js/ang-mark-down-editor.svg" alt="npm version" height="18">
  </a>
</p>

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

### @Inputs()

| Input             | Type    | Required                  | Description                      |
| ------------------| ------- | --------------------------| ---------------------------------|
| appMarkDownEditor | boolean | Optional, default: true   | use false to hide preview pannel |

### @Output()

| Output           | Type                   | Required  | Description                                                 |
| ---------------- | -----------------------| ----------| ------------------------------------------------------------|
| valueChange      | EventEmitter<object>() | Optional  | returns event object 'event: { markDown: any; html: any; }' |


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
      template: `<textarea appMarkDownEditor (valueChange)="onValueChange($event)"></textarea>` // [appMarkDownEditor]='false' In case of hide preview
    })
    export class AppComponent  {

       onValueChange(event: { markDown: any; html: any; }) {
        console.log(event.markDown); // this will print markdown which user entered
        console.log(event.html); // this will print html output for the markdown
      }
    }

  ```
  
## License

[MIT](https://tldrlegal.com/license/mit-license) © [Vishal Hasnani](https://github.com/Hasnanivishal)


**Thanks for Installing**

> Conatct me for any suggestion/issues -> hasnanivishal@gmail.com