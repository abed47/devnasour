import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Subscription } from 'rxjs';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';
import { TowDTool } from 'src/app/shared/types';
import FontPicker from 'font-picker';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit, OnDestroy, AfterViewChecked {

  private fab: fabric.Canvas;
  private subscriptions: Subscription[] = [];
  private selectedTool: TowDTool = "select";
  public selectedObject: fabric.Object | fabric.IText = null;
  

  constructor(private editorService: TwoDEditorService) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(){
    this.subscriptions.forEach(e => e.unsubscribe());
    this.fab.removeListeners();
    this.destroyListeners();
  }

  ngAfterViewChecked(): void {
    
  }

  private loadSettings(){

    this.fab = new fabric.Canvas('fabricSurface', {
      backgroundColor: '#EEEEEE',
      width: 500,
      height: 500
    });

    this.fab.on('mouse:down', e => this.onCanvasClick(e));

    //add event subscriptions
    this.subscriptions.push(this.editorService.getToolSubject().subscribe(r => {
      this.selectedTool = r;
      console.log(this.selectedTool)
    }));

    this.subscriptions.push(this.editorService.getObjectSubject().subscribe((res) => {
      this.handleObjectEvent(res)
    }))

    this.initListeners();

    

    // this.handleFonts();
  }

  private onCanvasClick(e: fabric.IEvent<MouseEvent>){
    
    if(this.selectedObject !== null) return this.selectedObject = null;

    if(e.target !== null) {
      this.selectedObject = e.target;
      this.editorService.selectObject(e.target.type === "i-text" ? "text" : e.target.type,'selection', e.target)
      return
    };

    if(this.selectedTool === "text") {
      let t = new fabric.IText('Your text here', {
        top: e.e.offsetY,
        left: e.e.offsetX,
        fontFamily: "Pacifico"
      });

      this.fab.add(t);
    }
  }

  private initListeners(){
    // document.addEventListener('keydown', this.handleDeleteObject)
  }

  private destroyListeners(){
    // document.removeEventListener('keydown', this.handleDeleteObject);
  }

  public handleDeleteObject(e: KeyboardEvent){
    if(e.code === "Delete" && this.selectedObject !== null && this.selectedObject !== undefined){
      this.fab.remove(this.selectedObject);
    }
  }

  public handleObjectEvent(e){
    if(e.action === "update") this.handleObjectUpdate(e);
  }

  private handleObjectUpdate(e){
    // this.selectedObject.setCoords(true);
    // this.selectedObject.dirty = true;
    let obj: any = this.selectedObject;
    if(e.object.type === "width") this.selectedObject.width = +e.object.value;
    if(e.object.type === "height") this.selectedObject.height = +e.object.value;
    if(e.object.type === "top") this.selectedObject.top = +e.object.value;
    if(e.object.type === "left") this.selectedObject.left = +e.object.value;
    if(e.object.type === "font") obj.fontFamily = e.object.value;
    // if(e.object.type === "font") this.selectedObject.set("font", "Dancing Script")
    // console.log(this.selectedObject);
    this.fab.renderAll();
    // this.fab.renderAndReset()
  }

}
