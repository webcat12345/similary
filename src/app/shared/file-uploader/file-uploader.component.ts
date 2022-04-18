import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { FileType } from '../../core/models/file';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  @Input() type: FileType = FileType.Image;
  @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();

  FileType = FileType;
  base64Output: string | undefined;
  rawFile: File | undefined;
  videoFormat = '';

  private unsubscribeAll: Subject<any> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onFileSelected(event: any) {
    this.convertFile(event.target.files[0])
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((base64: string | undefined) => {
        this.base64Output = base64;
        this.uploaded.emit(this.rawFile);
      });
  }

  convertFile(file: File): Observable<string> {
    if (this.type === FileType.Video) {
      this.videoFormat = file.type;
    }
    this.rawFile = file;
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = event => {
      if (event && event.target && event.target.result) {
        result.next(btoa(event.target.result.toString()));
      }
    };
    return result;
  }
}
