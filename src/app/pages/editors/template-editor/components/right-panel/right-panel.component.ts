import { Color } from '@angular-material-components/color-picker';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';

@Component({
  selector: 'two-d-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit, OnDestroy {

  public selectedObjectType: "text" | "photo" | "shape" | null = null;

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
  public color = new Color(0,0,80,1);
  public backgroundColor = '#000080';
  public touchUi = false;
  public selectedType = "";
  public objWidth = 0;
  public objHeight = 0;
  public ObjX = 0;
  public ObjY = 0;

  public colorFc: AbstractControl = new FormControl(null);

  constructor(private editorService: TwoDEditorService) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public loadSettings(){
    this.subscriptions.push(this.editorService.getObjectSubject().subscribe((r: any) => this.handleObjectEvent(r)));
    this.subscriptions.push(this.editorService.getSelectionSubject().subscribe((r: any) => this.handleObjectSelection(r)));
  }

  public handleColorChange(e){
    console.log(e);
  }

  public handleObjectSelection(e: {action: string, object: any, type: 'text' | 'image'| 'shape'}){
    if(e.action === "selection"){
      console.log('selected object: ', e)
      this.objHeight = e.object.height;
      this.objWidth = e.object.width;
      this.ObjY = e.object.top;
      this.ObjX = e.object.left;
      if(e.object?.fontSize) this.fontSize = e.object.fontSize;
      if(e?.object?.fontFamily) this.selectedFont = e.object.fontFamily;
      this.opacity = e.object.opacity * 100;
      return;
    }
  }

  public handleObjectEvent(e: {actions: string, object: any, type: 'text' | 'image'| 'shape'}){
    // console.log(e);
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

}
