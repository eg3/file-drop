import { Component } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const file of event.files) {
      const fileReader = new FileReader();
      fileReader.onload = _ => {
        // Read out file contents as a Data URL
        // Store Data URL in localStorage
        try {
            localStorage.setItem(file.fileEntry.name, fileReader.result);
        } catch (e) {
            console.log('Storage failed: ' + e);
        }
      };

      file.fileEntry.file(info => {
        fileReader.readAsDataURL(info);
        console.log(info);
      });
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}

