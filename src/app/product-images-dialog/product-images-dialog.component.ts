import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent} from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.model';
@Component({
  selector: 'app-product-images-dialog',
  standalone: false,
  templateUrl: './product-images-dialog.component.html',
  styleUrl: './product-images-dialog.component.css'
})
export class ProductImagesDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void { 
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }

}
