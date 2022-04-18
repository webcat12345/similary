import { Component } from '@angular/core';
import { FileType } from './core/models/file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  FileType = FileType;

  constructor() {}
}
