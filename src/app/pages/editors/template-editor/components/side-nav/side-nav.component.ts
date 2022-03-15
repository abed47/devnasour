import { Component, OnInit } from '@angular/core';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';

@Component({
  selector: 'two-d-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public selectedTool: "templates" | "text" | "upload-photo" | "elements" | "background" | "upload" | "brush" = "text";

  constructor(private editorService: TwoDEditorService) { }

  ngOnInit(): void {
  }

  public changeTool (t) {
    this.selectedTool = t;
    this.editorService.changeTool(t);
  }
}
