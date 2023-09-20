import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
// import { Cloudinary } from 'cloudinary-core';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent {
  selectedFile: File | undefined;

  @Output() fileUpload = new EventEmitter();

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');  // Replace with your Cloudinary upload preset

      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dlcmims3m/image/upload?upload_preset=xysn0jp7';  // Replace with your Cloudinary URL

      this.http.post(cloudinaryUrl, formData)
        .subscribe((response: any) => {
          const imageUrl = response.secure_url;
          console.log('Image uploaded successfully:', imageUrl);
          this.onFileUpload(imageUrl)
          // Handle storing the image URL in your database here

        }, (error) => {
          console.error('Error uploading image:', error);
        });
    }
  }
  onFileUpload(url: string){
    console.log(url)
  this.fileUpload.emit(url);
}


}
