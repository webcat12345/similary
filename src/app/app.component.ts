import { Component } from '@angular/core';
import { FileType, Result } from './core/models/file';
import { DetectService } from './core/services/detect.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  FileType = FileType;

  face = null;
  card = null;
  result: Result | undefined = undefined;
  isLoading = false;
  error = '';

  constructor(private detectService: DetectService) {}

  faceUploaded(face: any) {
    this.face = face;
    this.error = '';
    this.result = undefined;
  }

  cardUploaded(card: any) {
    this.card = card;
    this.error = '';
    this.result = undefined;
  }

  async compare() {
    if (!this.face || !this.card) {
      alert('Please upload face video and ID card image.');
      return;
    }
    try {
      this.isLoading = true;
      this.result = await firstValueFrom(
        this.detectService.getFRResult(this.face, this.card)
      );
    } catch (e) {
      this.error = 'Comparison failed due to server error.';
    } finally {
      this.isLoading = false;
    }
  }
}
