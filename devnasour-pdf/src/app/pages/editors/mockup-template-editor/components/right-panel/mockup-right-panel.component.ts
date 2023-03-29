import { Color } from '@angular-material-components/color-picker';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';
import { MockupBgSelectDialogComponent } from '../bg-select-dialog/mockup-bg-select-dialog.component';

@Component({
  selector: 'mockup-right-panel',
  templateUrl: './mockup-right-panel.component.html',
  styleUrls: ['./mockup-right-panel.component.scss']
})
export class MockupRightPanelComponent implements OnInit, OnDestroy {

  public selectedObjectType: "text" | "image" | "shape" | "brush" | "path" | "group" | null = null;

  public fontList = [
    'Dancing Script',
    'Lato',
    'Acme',
    'Roboto',
    'Montserrat',
    'Oswald',
    'Amiri',
    'Ubuntu',
    'Raleway',
    'Playfair Display',
    'Lora',
    'Inconsolata',
    'Lobster',
    'Smokum',
    'Syne',
    'Pacifico',
    'Shadows',
    'Permanent Marker',
    'Caveat',
    'Poppins'
  ];

  public subscriptions: Subscription[] = [];

  public selectedFont = 'Poppins';
  public fontSize = 15;
  public opacity = 100;
  public color = '';
  public backgroundColor = '#000080';
  public touchUi = false;
  public selectedType = "";
  public objWidth = 0;
  public objHeight = 0;
  public ObjX = 0;
  public ObjY = 0;
  public brushColor = "#000000";
  public brushWidth = 3;
  public pathFill = "#000000";

  public colorFc: AbstractControl = new FormControl(null);

  constructor(
    private editorService: TwoDEditorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public loadSettings(){
    this.subscriptions.push(this.editorService.getObjectSubject().subscribe((r: any) => this.handleObjectEvent(r)));
    this.subscriptions.push(this.editorService.getSelectionSubject().subscribe((r: any) => this.handleObjectSelection(r)));
    this.subscriptions.push(this.editorService.getToolSubject().subscribe(r => {
      if(r === "brush") this.selectedObjectType = "brush"
    }))
    // this.subscriptions.push(this.)
  }

  public handleObjectSelection(e: {action: string, object: any, type: "text" | "image" | "shape" | "path" | null}){
    
    if(e.type === null){
      this.objHeight = 0;
      this.objWidth = 0;
      this.ObjX = 0;
      this.ObjY = 0;
      this.color = "#000000";
      this.selectedObjectType = null;
      return
    }

    if(e.action === "selection"){
      this.objHeight = e.object.height;
      this.objWidth = e.object.width;
      this.ObjY = e.object.top;
      this.ObjX = e.object.left;
      if(e.object?.fontSize) this.fontSize = e.object.fontSize;
      if(e?.object?.fontFamily) this.selectedFont = e.object.fontFamily;
      this.opacity = e.object.opacity * 100;
      this.selectedObjectType = this.handleFormatObjectType(e.type);
      this.color = e.object?.fill || '#000000';
      return;
    }
  }
  
  public handleObjectEvent(e: {action: string, object: any, type: 'text' | 'image'| 'shape' | "path" | "group"}){
    // if(e.action === "text")
    if(e.action === "selection" && e.type === "text") this.selectedObjectType = "text";
    if(e.action === "selection" && e.type === "shape") this.selectedObjectType = "shape";
    if(e.action === "selection" && e.type === "image") this.selectedObjectType = "image";
    if(e.action === "selection" && e.type === "path") this.selectedObjectType = "path";
    if(e.action === "selection" && e.type === "group") this.selectedObjectType = "group";
    
  }
  
  public onWidthChange(e){
    this.objWidth = e.target.value;
    this.editorService.updateObject("update", "update", {type: "width", value: e.target.value});
  }
  
  public onHeightChange(e){
    this.objHeight = e.target.value;
    this.editorService.updateObject("update", "update", {type: "height", value: e.target.value});
  }
  
  public onXChange(e){
    this.ObjX = e.target.value;
    this.editorService.updateObject("update", "update", {type: "left", value: e.target.value});
  }
  
  public onYChange(e){
    this.ObjY = e.target.value;
    this.editorService.updateObject("update", "update", {type: "top", value: e.target.value});
  }
  
  public onFontChange(e){
    this.selectedFont = e;
    this.editorService.updateObject("update", "update", {type: "font", value: e, width: this.objWidth, height: this.objHeight});
  }
  
  public onFontSizeChange(e){
    this.fontSize = e?.target?.value || e?.value || 0;
    this.editorService.updateObject("update", "update", {type: "font-size", value: e?.target?.value || e?.value || 0, width: this.objWidth, height: this.objHeight})
  }
  
  public onOpacityChange(e){
    this.opacity = e?.target?.value || e?.value || 0;
    this.editorService.updateObject("update", "update", {type: "opacity", value: e?.target?.value || e?.value || 0})
  }
  
  public onTextAlignChange(e){
    this.editorService.updateObject("update", "update", {type: "text-align", value: e.value, width: this.objWidth, height: this.objHeight});
  }
  
  public onAlignChange(e){
    this.editorService.updateObject("update", "update", {type: "align", value: e.value, width: this.objWidth, height: this.objHeight});
  }
  
  public handleColorChange(e){
    this.editorService.updateObject("update", "update", { type: "color", value: e, width: this.objWidth, height: this.objHeight, stroke: false});
  }

  public onBrushWidthChange(e){
    this.brushWidth = e?.target?.value || e?.value || 0;
    this.editorService.updateObject("update", "update", {type: "brush-size", value: e?.target?.value || e?.value || 0})
  }

  public onBrushColorChange(e){
    this.editorService.updateObject("update", "update", { type: "brush-color", value: e, width: this.objWidth, height: this.objHeight, stroke: false});
  }

  public onPathFillChange(e){
    this.editorService.updateObject("update", "update", { type: "path-fill", value: e, width: this.objWidth, height: this.objHeight, stroke: false});
  }
  
    private handleFormatObjectType (e){
      if(e === null) return null;
      if(e === "text") return "text";
      if(e === "rect" || e === "circle" || e === "triangle") return "shape"
      if(e === "image") return "image";
      if(e === "path") return "path";
      if(e === "group") return "group";
      return null
    }

  public onDeleteClick(){
    this.editorService.generalEvent({type: "action", name: "delete-object"})
  }

  public onChangeableChange(e) {
    this.editorService.updateObject("update", "update", { type: "image-changeable"});
  }
}
