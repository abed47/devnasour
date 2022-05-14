import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Subscription } from 'rxjs';
import { TwoDEditorService } from 'src/app/services/two-d-editor.service';
import { TowDTool } from 'src/app/shared/types';
import FontPicker from 'font-picker';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/services/helper.service';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { BgSelectDialogComponent } from './components/bg-select-dialog/bg-select-dialog.component';
import { jsPDF } from "jspdf";
import { degrees, PDFDocument, rgb, rotateInPlace } from 'pdf-lib';

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
  private canvasWidth = 500;
  private canvasHeight = 500;
  @ViewChild('imageUploader') private imageUploaderRef;
  @ViewChild('fileUploader') private fileUploader;
  

  constructor(
    private editorService: TwoDEditorService,
    private helper: HelperService,
    private dialog: MatDialog
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

    fabric.Object.NUM_FRACTION_DIGITS = 10;

    this.fab = new fabric.Canvas('fabricSurface', {
      backgroundColor: '#EEEEEE',
      width: this.canvasHeight,
      height: this.canvasWidth,
    });

    // this.fab.font

    
    // this.fab.on("object:scaling", e => {
    //   // console.log("scaling object: ", e)
    //   // e.target.dirty = true;
    //   // e.target.width = e.target.getScaledWidth();
    //   // e.target.height = e.target.getScaledHeight();
    //   // e.target.set({
    //   //   scaleX: 1,
    //   //   scaleY: 1
    //   // })
    // })

    this.fab.on('mouse:down', e => this.onCanvasClick(e));

    // this.openBgDialog()
    //add event subscriptions
    this.subscriptions.push(this.editorService.getToolSubject().subscribe(r => {
      if(r !== "brush") this.exitBrushMode();
      if(r === "brush") {
        this.enterBrushMode();
        this.selectedTool = r;
        return;
      }
      if(r === "background"){
        this.openBgDialog(this.fab);
        this.editorService.changeTitle('selection');
        return;
      }
      if(r === "upload-photo"){
        this.imageUploaderRef.nativeElement.click();
        this.editorService.changeTool('selection');
        return;
      }
      if(r === "upload"){
        this.fileUploader.nativeElement.click();
        this.editorService.changeTool('selection');
        return;
      }
      this.selectedTool = r;
    }));

    this.subscriptions.push(this.editorService.getObjectSubject().subscribe((res) => {
      this.handleObjectEvent(res)
    }));

    this.subscriptions.push(this.editorService.getGeneralSubject().subscribe(r => this.handleGeneralEvents(r)));

    this.initListeners();

    

    // this.handleFonts();
  }

  private onCanvasClick(e: fabric.IEvent<MouseEvent> | any){

    // this.fab._objects.forEach(o => o.render(this.fab.getContext()));
    // this.fab.renderAndReset();
    // this.fab.renderAll();

    if(this.fab.isDrawingMode) return;
    
    if(e.target == null && this.selectedTool === "selection") {
      this.editorService.changeTool('selection');
      this.editorService.selectObject(null, null, null);
      this.selectedObject = null;
    }

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

    if(!this.selectedObject && !this.fab.isDrawingMode) return;

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
    if(e.object.type === "brush-size") this.fab.freeDrawingBrush.width = e.object.value;
    if(e.object.type === "brush-color") this.fab.freeDrawingBrush.color = e.object.value;
    if(e.object.type === "path-fill") {
      this.selectedObject.fill = e.object.value;
      if(this.selectedObject?._objects?.length){
        this.selectedObject._objects.forEach(el => el.fill = e.object.value)
      }
    }

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
      this.selectedObject.fill = e.object.value
      this.selectedObject.dirty = true;
    }
    if(this.selectedObject) this.selectedObject.dirty = true;



    this.fab.renderAll();
    if(e.object?.height) this.selectedObject.height = +e.object.height;
    if(e.object?.width) this.selectedObject.width = +e.object.width;
    this.fab.renderAll();
    // this.fab.renderAndReset()
  }

  public handleImageSelected(e) {
    if(e?.target?.files?.[0]){
      let isSvg = e?.target?.files?.[0]?.name?.match(/\.svg/ig)?.length > 0 ? true : false

      if(isSvg){
        let el = document.createElement('object');
        el.type = "image/svg+xml";
        el.data = URL.createObjectURL(e.target.files[0]);
        fabric.loadSVGFromURL(URL.createObjectURL(e.target.files[0]), (i) => {
          let g = new fabric.Group(i);
            g.scaleToHeight(300, true);
            g.scaleToWidth(300, true)
            this.fab.add(g);
            this.fab.renderAll();
            this.imageUploaderRef.nativeElement.value = ""
        })
        return
      }

      this.helper.imgToBase64(e.target.files[0]).then(res => {

        // let i = new Image();
        // i.src = res;
        // i.onload = e => {
        //   let im = new fabric.Image(i, {
        //     originX: 'center',
        //     originY: 'center',
        //     left: 20,
        //     top: 20,
        //   });
          
        //   im.set({
        //     scaleX: 200 / im.width,
        //     scaleY: 200 / im.height,
        //     left: 20 + (im.width / 2),
        //     top: 20 + (im.height / 2)
        //   })
        //   this.fab.add(im)
        // }
        // return 
        // let sv = document.createElement()
        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttributeNS('http://www.w3.org/2000/svg','xlink','http://www.w3.org/2000/xlink');
        svg.setAttributeNS('http://www.w3.org/2000/svg','height','200');
        svg.setAttributeNS('http://www.w3.org/2000/svg','width','200');
        svg.setAttributeNS('http://www.w3.org/2000/svg','id','test2');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        svg.setAttributeNS('http://www.w3.org/2000/svg','viewBox','0 0 200 200');
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
        svgimg.setAttributeNS(null,'height','200');
        svgimg.setAttributeNS(null,'width','200');
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href', res);
        svgimg.setAttributeNS(null,'x','10');
        svgimg.setAttributeNS(null,'y','10');
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.appendChild(svgimg)
        
      //   fabric.loadSVGFromString( `
      //   <?xml version="1.0" encoding="utf-8"?>
      //   <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      //   <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"     viewBox="0 0 250 250" enable-background="new 0 0 250 250" xml:space="preserve" width="250px" height="250px">
      //   <image 
      //   width="250px" 
      //   height="250px" 
      //   x="0"
      //   y="0"
      //   xlink:href="${res}" 
      // />
      //   </svg>
      //   `, (i)=> {
      //     let g = new fabric.Group(i, {
      //       width: 250,
      //       height: 250,
      //     });
      //       // g.scaleToHeight(300, true);
      //       // g.scaleToWidth(300, true)
      //       g.set({
      //         scaleX: 1,
      //         scaleY: 1,
      //         width: 250,
      //         height: 250
      //       })

      //       // g.transform(this.fab.cave)

      //       // this.fab.transform

      //       this.fab.add(g);
      //       this.fab.renderAll();
      //   })
        // $('svg').append(svgimg);
        fabric.Image.fromURL(res, i => {
          i.scaleToWidth(100)
          this.fab.add(i);
          this.imageUploaderRef.nativeElement.value = ""
        });
      })
    }
    this.editorService.getToolSubject().next("selection");
  }

  private enterBrushMode(){
    this.fab.isDrawingMode = true;
  }

  private exitBrushMode(){
    this.fab.isDrawingMode = false;
  }

  private handleGeneralEvents(e:any){
    if(e?.type === "action"){
      if(e?.name === "download") this.onDownload();
      if(e?.name === "download-pdf") this.onDownloadPdf();
      if(e?.name === "delete-object") {
        if(this.selectedObject){
          this.fab.remove(this.selectedObject)
        }
      }
    }
  }

  private onDownload(){
    let fName = this.editorService.getTitle();
    let dataJson = this.fab.toJSON();
    let dataBlob = new Blob([JSON.stringify(dataJson)], { type: 'text/plain;charset=utf-8'})
    saveAs(dataBlob, fName + '.devnasour')
  }

  private calcRotatedDimensions(angle, w, h){
    let radialAngle = angle * (Math.PI/180);
    if(angle < 90){
      let newW = ((w * Math.sin(radialAngle)) + (h * Math.cos(radialAngle)));
      let newH = ((w * Math.cos(radialAngle)) + (h * Math.sin(radialAngle)));
      return {w: newW, h: newH}
    }
    let newW = ((w * Math.sin(angle)) + (h * Math.cos(angle)));
    let newH = ((w * Math.cos(angle)) + (h * Math.sin(angle)));
    return {w: newW, h: newH}
  }

  private async onDownloadPdf(){

    this.fab.forEachObject(o => {
      o.calcOwnMatrix();
      o.calcTransformMatrix();
      // o.noScaleCache();
      // o.scale()?
    })
    
    // this.fab.setDimensions({width: 500, height: 500})
    let f = this.fab.toSVG({height: 500, width: 500, viewBox: { height: 500, width: 500, x: 0, y: 0}})
    f = f.replace(/\<defs\>\n\<\/defs\>/ig, `
    <defs>
      <style type="text/css">@import url(http://fonts.googleapis.com/css?family=Pacifico);</style>
    </defs>
`)
    // return;
    // this.fab._objects.forEach(o => {
    //   let reg = new RegExp(o.scaleX.toString(),'g');
    //   let reg2 = new RegExp(o.scaleY.toString(), 'g');
    //   f.replace(reg2, '1')
    //   f.replace(reg, '1')
    // })
    // return;
    var svgBlob = new Blob([f], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = 'fsdklj';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // saveAs([f], 'test.svg')
    return;
    try{
      let pdfDoc = await PDFDocument.create({});
      let page = await pdfDoc.addPage([500, 500]);
      // page.resetPosition()

      let f: any = this.fab.toJSON();
      
      // let formatted = JSON.parse(f);

      f.objects.forEach(async item => {

        page.drawText('hello world', {
          x: 15,
          y: 5
        })
        if(item?.type === "image"){
          // page.drawPage()
          let img = await pdfDoc.embedPng(item.src);
          if(item?.angle !== 0) {
            let newD = this.calcRotatedDimensions(item.angle, item.width * item.scaleX,  item.height * item.scaleY);
            page.drawImage(img, {
              width: item.width * item.scaleX,
              height: item.height * item.scaleY,
              x: item.left - ((item.width  * item.scaleX)/ 2),
              y: 500 - (newD.h + (item.top - ((item.height * item.scaleY) / 2))),
              rotate: degrees(item.angle * -1)
            })
            return
          }
          page.drawImage(img, {
            width: item.width * item.scaleX,
            height: item.height * item.scaleY,
            x: item.left - ((item.width * item.scaleX) / 2),
            y: 500 - ((item.height * item.scaleY) + (item.top - ((item.height * item.scaleY) / 2))),
            rotate: degrees(item.angle * -1)
          })
        }


        if(item?.type === "i-text"){
          page.drawText(item.text, {
            x: item.left,
            y: 500 - (item.height + item.top),
            size: item.fontSize,
            font: item.font,
            // color: rgb()
          })
        }

        if(item.type === "circle"){
          page.drawCircle({
            x: item.left,
            y: 500 - (item.top + item.width),
            size: item.width / 2,
          })
        }
      })

      // return;
      let pdf = await pdfDoc.save();
      saveAs(new Blob([pdf]), 'try.pdf')
      // pdfDoc.down
    }catch(err){
      console.log(err);
    }
  }

  public handleUploadFile(e: any){
    if(e?.target?.files[0]){
      let f = e.target.files[0];
      this.helper.readTextFile(f).then((r: any) => {
        this.fab.loadFromJSON(r, () => {});
      })
    }
  }

  private openBgDialog(fab){
    
    // return;
    //@ts-ignore
    let dialogRef = this.dialog.open<any, any>(BgSelectDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if(res !== undefined){
        switch (res.type){
          case 'image':
            fabric.Image.fromURL(res.value, img => {
              this.fab.setBackgroundImage(img, this.fab.renderAll.bind(this.fab), {
                scaleX: this.canvasWidth / img.width,
                scaleY: this.canvasHeight / img.height
              })
            });
            break;
          case 'color':
            this.fab.setBackgroundColor(res.value, this.fab.renderAll.bind(this.fab))
            break;
          default:
            this.fab.setBackgroundImage(null, this.fab.renderAll.bind(this.fab))
            this.fab.setBackgroundColor(null, this.fab.renderAll.bind(this.fab))
        }
      }
    })
  }
}
