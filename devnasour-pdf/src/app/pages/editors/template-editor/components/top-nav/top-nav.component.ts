import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';

@Component({
  selector: 'two-d-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public fileTitle: string = "untitled";
  public titleEditingActive: boolean = false;
  private currentUser = null;
  public loggedIn = false;
  
  constructor(
    private editorService: TwoDEditorService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    this.fileTitle = this.editorService.getTitle();
    const currentUser = this.auth?.getAuthStatus()?.currentUser;

    if(currentUser) {
      this.currentUser = currentUser;
      this.loggedIn = true;
    }
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

  public onSaveDesign(){
    this.editorService.generalEvent({type: 'action', name: 'save-design'})
  }

}
