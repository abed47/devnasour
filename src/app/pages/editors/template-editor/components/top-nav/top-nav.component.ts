import { Component, OnInit } from '@angular/core';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';

@Component({
  selector: 'two-d-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public fileTitle: string = "untitled";
  public titleEditingActive: boolean = false;
  
  constructor(
    private editorService: TwoDEditorService
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    this.fileTitle = this.editorService.getTitle();
  }

  public onEditClick(){
    this.titleEditingActive = true;
  }

  public onSaveClick(){
    this.fileTitle = this.fileTitle.replace(/\ /ig, "-");
    this.titleEditingActive = false;
    this.editorService.changeTitle(this.fileTitle);
  }

  public onDownloadClick(){
    this.editorService.generalEvent({type: 'action', name: 'download'})
  }

  public onPdfClick(){
    this.editorService.generalEvent({type: 'action', name: 'download-pdf'})
  }

}
