import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';
import { BgSelectDialogComponent } from '../bg-select-dialog/bg-select-dialog.component';

@Component({
  selector: 'two-d-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  public selectedTool: "templates" | "text" | "upload-photo" | "elements" | "background" | "upload" | "brush" | "selection" = "selection";
  public subscriptions: Subscription[] = [];
  public selectedShape: "square" | "circle" | "star" | "triangle" = "square";

  constructor(private editorService: TwoDEditorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(this.editorService.getToolSubject().subscribe((res: any) => this.selectedTool = res));
    this.subscriptions.push(this.editorService.getShapeSubject().subscribe((res: any) => this.selectedShape = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public changeTool (t) {
    this.selectedTool = t;
    this.editorService.changeTool(t);
  }

  public onShapeSelected(t){
    this.editorService.shapeChange(t);
  }

  public openBgDialog(){
    // let mDialog = this.dialog.open(BgSelectDialogComponent, { width: 300, height: 300 });
    // mDialog.afterClosed().subscribe(r => {
    //   console.log(r);
    // })
  }
}
