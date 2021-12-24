import { Directive } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Directive({
  selector: '[appFileSelector]'
})
export class FileSelectorDirective {

  constructor() { }

}
