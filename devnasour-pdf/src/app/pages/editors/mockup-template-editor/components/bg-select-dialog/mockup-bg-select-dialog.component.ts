import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'mockup-editor-bg-select-dialog',
  templateUrl: './mockup-bg-select-dialog.component.html',
  styleUrls: ['./mockup-bg-select-dialog.component.scss']
})
export class MockupBgSelectDialogComponent implements OnInit {

  @ViewChild('imageUpload') private imageUploadRef: ElementRef;
  public selected: "image" | "none" | "color" = "none";
  public file = null;
  public color = "#000080";

  constructor(
    public dialogRef: MatDialogRef<MockupBgSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
  }

  public onImageClick(){
    this.imageUploadRef.nativeElement.click();
  }

  public onImageUpload(e: any){
    if(e?.target?.files?.[0]){
      this.helper.imgToBase64(e.target.files[0]).then(r => {
        this.file = r;
        this.selected = "image";
      });
    }
  }

  public onColorChange(e){
    this.selected = "color"
    this.color = e;
  }

  public onNoneClick(){
    this.selected = "none"
  }

  public onApplyClick(){
    this.dialogRef.close({type: this.selected, value: this.selected === "image" ? this.file : this.color})
  }

  public onCloseClick(){
    this.dialogRef.close(undefined);
  }

  public onColorClick(){
    this.selected = "color"
  }
}
