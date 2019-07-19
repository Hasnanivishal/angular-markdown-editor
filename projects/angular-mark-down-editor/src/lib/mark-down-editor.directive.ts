import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appMarkDownEditor]'
})
export class MarkDownEditorDirective {

  @Input() appMarkDownEditor = true;
  boldButton: any;
  boldButtonText: any;

  italicButton: any;
  italicButtonText: any;

  linkButton: any;
  linkButtonText: any;

  previewDiv: any;
  @Output() valueChange = new EventEmitter<object>();

  constructor(private element: ElementRef, private renderer: Renderer2) { 
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.element.nativeElement.value = this.element.nativeElement.value.trim();
    const outerDiv = this.renderer.createElement('div');
    const innerDiv = this.renderer.createElement('div');
    this.previewDiv = this.renderer.createElement('div');
    const previewText = this.renderer.createElement('div');

    this.renderer.setStyle(this.element.nativeElement, 'height', '150px');

    this.renderer.setStyle(this.previewDiv, 'width', '512px');
    this.renderer.setStyle(this.previewDiv, 'height', '150px');
    this.renderer.setStyle(this.previewDiv, 'padding', '2px');
    this.renderer.setStyle(this.previewDiv, 'border', '1px solid gray');
    this.renderer.setStyle(this.previewDiv, 'margin-top', '30px');


    this.renderer.setStyle(innerDiv, 'width', '512px');
    this.renderer.setStyle(innerDiv, 'padding', '2px');
    this.renderer.setStyle(innerDiv, 'border', '1px solid gray');
    this.renderer.setStyle(innerDiv, 'margin-top', '-6px');

    this.renderer.setStyle(previewText, 'width', '512px');
    this.renderer.setStyle(previewText, 'padding', '2px');
    this.renderer.setStyle(previewText, 'border', '1px solid gray');
    const previewTextData = this.renderer.createText('PREVIEW');
    this.renderer.appendChild(previewText, previewTextData);

    if (!this.appMarkDownEditor) {
      this.renderer.setStyle(previewText, 'display', 'none');
      this.renderer.setStyle(this.previewDiv, 'display', 'none');
    }

    // Bold Button
    this.boldButton = this.renderer.createElement('a');
    this.boldButtonText = this.renderer.createText('B');
    this.renderer.setStyle(this.boldButton, 'margin-left', '5px');
    this.renderer.setStyle(this.boldButton, 'cursor', 'pointer');
    this.renderer.appendChild(this.boldButton, this.boldButtonText);

    // Italic Button
    this.italicButton = this.renderer.createElement('a');
    this.italicButtonText = this.renderer.createText('I');
    this.renderer.addClass(this.italicButton, 'classItalic');
    this.renderer.setStyle(this.italicButton, 'margin-left', '10px');
    this.renderer.setStyle(this.italicButton, 'cursor', 'pointer');
    this.renderer.appendChild(this.italicButton, this.italicButtonText);


    // link ButtonText
    this.linkButton = this.renderer.createElement('a');
    this.linkButtonText = this.renderer.createText('S');
    this.renderer.addClass(this.linkButton, 'classItalic');
    this.renderer.setStyle(this.linkButton, 'margin-left', '10px');
    this.renderer.setStyle(this.linkButton, 'cursor', 'pointer');
    this.renderer.appendChild(this.linkButton, this.linkButtonText);


    this.renderer.appendChild(innerDiv, this.boldButton);
    this.renderer.appendChild(innerDiv, this.italicButton);
    this.renderer.appendChild(innerDiv, this.linkButton);

    this.renderer.appendChild(outerDiv, innerDiv);
    this.renderer.appendChild(outerDiv, this.previewDiv);
    this.renderer.appendChild(outerDiv, previewText);

    this.renderer.insertBefore(this.element.nativeElement.parentNode, outerDiv, this.element.nativeElement.nextSibling);

    this.renderer.listen(this.boldButton, 'click', (event) => {
      this.makeContentBold(event);
    });

    this.renderer.listen(this.italicButton, 'click', (event) => {
      this.makeContentItalic(event);
    });

    this.renderer.listen(this.linkButton, 'click', (event) => {
      this.makecontentStrikeThrough(event);
    });

    this.renderer.listen(this.element.nativeElement, 'input', (event) => {
      this.renderer.setProperty(this.previewDiv, 'innerHTML', this.parseMarkdownTagToHTML(this.element.nativeElement.value));
    });

  }

  makecontentStrikeThrough(event: any) {
    const selectionStart = this.element.nativeElement.selectionStart;
    const selectionEnd = this.element.nativeElement.selectionEnd;
    const selectedString = this.element.nativeElement.value.slice(selectionStart, selectionEnd);

    // Empty string
    if (!selectedString) {
      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: this.element.nativeElement.value.substring(0, selectionEnd) + '~~strikethrough~~',
        // tslint:disable-next-line:max-line-length
        html: this.element.nativeElement.value.substring(0, selectionEnd) + '<del>strikethrough</del>'
      });

      // tslint:disable-next-line:max-line-length
      this.renderer.setProperty(this.previewDiv, 'innerHTML', this.element.nativeElement.value.substring(0, selectionEnd) + '<del>strikethrough</del>');

      this.element.nativeElement.value = this.element.nativeElement.value.substring(0, selectionEnd) + '~~strikethrough~~';
      this.element.nativeElement.focus();
      selectionStart === 0 ? this.element.nativeElement.selectionStart = 2 : this.element.nativeElement.selectionStart = selectionStart;
      selectionEnd === 0 ? this.element.nativeElement.selectionEnd = 15 : this.element.nativeElement.selectionEnd = selectionEnd;
    } else {
      let strikedString = this.element.nativeElement.value.slice(selectionStart - 2, selectionEnd + 2);
      if (strikedString.startsWith('~~') && strikedString.endsWith('~~')) {

        strikedString = strikedString.replace(/[~~]+/g, '');
        this.valueChange.emit({
          markDown: this.element.nativeElement.value.substring(0, selectionStart - 2) +
            strikedString +
            this.element.nativeElement.value.substring(selectionEnd + 2),

          html: this.element.nativeElement.value.substring(0, selectionStart - 2) +
            strikedString +
            this.element.nativeElement.value.substring(selectionEnd + 2)
        });

        this.renderer.setProperty(this.previewDiv, 'innerHTML',
          this.element.nativeElement.value.substring(0, selectionStart - 2) +
          strikedString +
          this.element.nativeElement.value.substring(selectionEnd + 2));

        this.element.nativeElement.value = this.element.nativeElement.value.substring(0, selectionStart - 2) +
          strikedString +
          this.element.nativeElement.value.substring(selectionEnd + 2);
      } else {

      }

      // else remove the tags

    }


  }

  makeContentBold(event: any) {
    let selectionStart = this.element.nativeElement.selectionStart;
    const selectionEnd = this.element.nativeElement.selectionEnd;
    let selectedStringMarkDown = '';
    let selectedStringHTML = '';
    if (selectionStart === selectionEnd) {
      selectionStart = 0;
    }
    let selectedString = this.element.nativeElement.value.slice(selectionStart, selectionEnd);

    if (!selectedString) {
      selectedString = this.element.nativeElement.value;
    }

    // Undo bold
    if (this.checkContentBold(selectedString)) {
      selectedString = selectedString.replace(/[**]+/g, '');
      selectedStringMarkDown = '' + selectedString + '';
      selectedStringHTML = '' + selectedString + '';
    } else {
      selectedStringMarkDown = '**' + selectedString + '**';
      selectedStringHTML = '<strong>' + selectedString + '</strong>';
    }

    if (this.checkContentItalic(selectedStringMarkDown)) {
      selectedStringHTML = this.updateHTMLTags(selectedStringMarkDown, '//', 'em', selectedStringHTML);
    }


    // tslint:disable-next-line:max-line-length
    if (selectionStart === 0 && selectionEnd === 0) {
      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: selectedStringMarkDown,
        // tslint:disable-next-line:max-line-length
        html: selectedStringHTML
      });

      this.element.nativeElement.value = selectedStringMarkDown;

      this.renderer.setProperty(this.previewDiv, 'innerHTML', selectedStringHTML);
    } else {

      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd),
        // tslint:disable-next-line:max-line-length
        html: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd)
      });

      this.renderer.setProperty(this.previewDiv, 'innerHTML',
        // tslint:disable-next-line:max-line-length
        this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd));
      // tslint:disable-next-line:max-line-length
      this.element.nativeElement.value = this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd);
      // tslint:disable-next-line:max-line-length

    }

  }

  makeContentItalic(event: any) {
    let selectionStart = this.element.nativeElement.selectionStart;
    const selectionEnd = this.element.nativeElement.selectionEnd;
    let selectedStringMarkDown = '';
    let selectedStringHTML = '';
    if (selectionStart === selectionEnd) {
      selectionStart = 0;
    }

    let selectedString = this.element.nativeElement.value.slice(selectionStart, selectionEnd);

    if (!selectedString) {
      selectedString = this.element.nativeElement.value;
    }

    // undo Italic tag
    if (this.checkContentItalic(selectedString)) {
      selectedString = selectedString.replace(/[//]+/g, '');
      selectedStringMarkDown = '' + selectedString + '';
      selectedStringHTML = '' + selectedString + '';
    }
    // tslint:disable-next-line:one-line
    else {
      selectedStringMarkDown = '//' + selectedString + '//';
      selectedStringHTML = '<em>' + selectedString + '</em>';
    }


    if (this.checkContentBold(selectedStringMarkDown)) {
      selectedStringHTML = this.updateHTMLTags(selectedStringMarkDown, '**', 'strong', selectedStringHTML);
    }

    if (selectionStart === 0 && selectionEnd === 0) {

      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: selectedStringMarkDown,
        // tslint:disable-next-line:max-line-length
        html: selectedStringHTML
      });
      this.renderer.setProperty(this.previewDiv, 'innerHTML', selectedStringHTML);

      this.element.nativeElement.value = selectedStringMarkDown;
    } else {
      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd),
        // tslint:disable-next-line:max-line-length
        html: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd)
      });
      // tslint:disable-next-line:max-line-length
      this.renderer.setProperty(this.previewDiv, 'innerHTML', this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd));
      // tslint:disable-next-line:max-line-length
      this.element.nativeElement.value = this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd);

    }

  }

  checkContentItalic(selectedString: any) {
    if (selectedString.startsWith('//') && selectedString.endsWith('//')) {
      return true;
    } else if (selectedString.includes('//')) {
      // Check if string starts and with bold
      return true;
    } else {
      return false;
    }
  }

  checkContentBold(selectedString: any) {
    // Check if string starts and with bold
    if (selectedString.startsWith('**') && selectedString.endsWith('**')) {
      return true;
    } else if (selectedString.includes('**')) {
      // Check if string starts and with bold
      return true;
    } else {
      return false;
    }
  }

  updateHTMLTags(selectedStringMarkDown, markDown, markDownHTML, selectedStringHTML) {
    // tslint:disable-next-line:max-line-length
    const markdownString = selectedStringMarkDown.slice(selectedStringMarkDown.indexOf(markDown) + 2, selectedStringMarkDown.lastIndexOf(markDown));
    selectedStringHTML = selectedStringHTML.replace(markDown + markdownString + markDown,
      '<' + markDownHTML + '>' + markdownString + '</' + markDownHTML + '>');
    return selectedStringHTML;
  }

  parseMarkdownTagToHTML(markDownString: String) {
    markDownString = markDownString.replace(/\*(\/+)(\w+)(\/?)\*/g, '<strong><em>$1$2$3</em></strong>');
    markDownString = markDownString.replace(/\/(\*+)(\w+)(\/?)\//g, '<em><strong>$1$2$3</strong></em>');

    markDownString = markDownString.replace(/\*(\w+)\*/g, '<strong>$1</strong>');
    markDownString = markDownString.replace(/\/(\w+)\//g, '<em>$1</em>');
    markDownString = markDownString.replace(/\~(\w+)\~/g, '<del>$1</del>');

    return markDownString;
  }
}
