import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Subscription } from 'rxjs';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';
import { TowDTool } from 'src/app/shared/types';
import FontPicker from 'font-picker';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit, OnDestroy, AfterViewChecked {

  private fab: fabric.Canvas;
  private subscriptions: Subscription[] = [];
  private selectedTool: TowDTool = "selection";
  public selectedObject: fabric.Object | fabric.IText | any = null;
  @ViewChild('imageUploader') private imageUploaderRef;
  

  constructor(
    private editorService: TwoDEditorService,
    private helper: HelperService
    ) { }

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
      if(r === "upload-photo"){
        this.imageUploaderRef.nativeElement.click();
        this.editorService.changeTool('selection');
        return;
      }
      this.selectedTool = r;
    }));

    this.subscriptions.push(this.editorService.getObjectSubject().subscribe((res) => {
      this.handleObjectEvent(res)
    }))

    this.initListeners();

    

    // this.handleFonts();
  }

  private onCanvasClick(e: fabric.IEvent<MouseEvent> | any){
    
    if(e.target == null && this.selectedTool === "selection") {
      this.editorService.changeTool('selection');
      this.editorService.selectObject(null, null, null);
      this.selectedObject = null;
    }

    if(e.target !== null) {
      this.selectedObject = e.target;
      console.log( e.target.type)
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

    if(this.selectedTool === "elements"){
      let s = this.editorService.getCurrentShape();

      if(s === "circle"){
        let c = new fabric.Circle({
          fill: '#FF5E00', 
          top: e.e.offsetY,
          left: e.e.offsetX,
          radius: 50
        });

        this.fab.add(c);
      }

      if(s === "square"){
        let sq = new fabric.Rect({
          width: 50,
          height: 50,
          fill: '#FF5E00', 
          top: e.e.offsetY,
          left: e.e.offsetX,
        })

        this.fab.add(sq);
      }

      if(s === "triangle"){
        let st = new fabric.Triangle({
          width: 50,
          height: 50,
          fill: '#FF5E00', 
          top: e.e.offsetY,
          left: e.e.offsetX,
        })

        this.fab.add(st);
      }
    }

    this.editorService.getToolSubject().next("selection");
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

    if(!this.selectedObject) return;

    if(e.object?.height) this.selectedObject.height = +e.object.height;
    if(e.object?.width) this.selectedObject.width = +e.object.width;

    if(e.object.type === "width") this.selectedObject.width = +e.object.value;
    if(e.object.type === "height") this.selectedObject.height = +e.object.value;
    if(e.object.type === "top") this.selectedObject.top = +e.object.value;
    if(e.object.type === "left") this.selectedObject.left = +e.object.value;
    if(e.object.type === "font") this.selectedObject.fontFamily = e.object.value;
    if(e.object.type === "font-size") this.selectedObject.fontSize = +e.object.value;
    if(e.object.type === "opacity") this.selectedObject.opacity = +(e.object.value / 100);
    if(e.object.type === "text-align") this.selectedObject.textAlign = e.object.value;
    
    if(e.object.type === "align") {
      if(e.object.value === "left") this.selectedObject.left = 0;
      if(e.object.value === "center") this.selectedObject.left = (this.fab.width / 2) - (this.selectedObject.width / 2)
      if(e.object.value === "right") this.selectedObject.left = this.fab.width - this.selectedObject.width;
      if(e.object.value === "top") this.selectedObject.top = 0;
      if(e.object.value === "bottom") this.selectedObject.top = this.fab.height - this.selectedObject.height;
    }

    if(e.object.type === "text-align"){
      if(e.object.value === "right" && this.selectedObject?.styles?.textAlign) this.selectedObject.styles.textAlign = "right";
      if(e.object.value === "left") this.selectedObject.styles.textAlign = "left";
      if(e.object.value === "justify") this.selectedObject.styles.textAlign = "justify";
      if(e.object.value === "center") this.selectedObject.styles.textAlign = "center";
    }

    if(e.object.type === "color"){
      // console.log("color options: ",e.object)
      this.selectedObject.fill = e.object.value
      this.selectedObject.dirty = true;
    }
    this.selectedObject.dirty = true;


    // if(e.object?.height) console.log(e.object, 'hello')

    this.fab.renderAll();
    if(e.object?.height) this.selectedObject.height = +e.object.height;
    if(e.object?.width) this.selectedObject.width = +e.object.width;
    this.fab.renderAll();
    // this.fab.renderAndReset()
  }

  public handleImageSelected(e) {
    if(e?.target?.files?.[0]){
      this.helper.imgToBase64(e.target.files[0]).then(res => {
        let cImg = fabric.Image.fromURL(res, i => {
          i.scaleToHeight(300);
          i.scaleToWidth(300);
          this.fab.add(i);
          console.log(this.fab.toJSON())
        });
      })
    }
    this.editorService.getToolSubject().next("selection");
  }

}
