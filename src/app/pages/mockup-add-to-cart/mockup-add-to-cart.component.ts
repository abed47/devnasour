import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
@Component({
  selector: 'app-mockup-add-to-cart',
  templateUrl: './mockup-add-to-cart.component.html',
  styleUrls: ['./mockup-add-to-cart.component.scss']
})
export class MockupAddToCartComponent implements OnInit, AfterViewChecked, AfterViewInit {

  mockup = {
    side0: "https://dsadmin.octasolutions.co/upload/web_product/2022-06/web_product_attachment_1_17.jpg",
    side1: "https://dsadmin.octasolutions.co/upload/web_product/2022-06/web_product_attachment_1_12.jpg",
    side3: "https://secure-cdn.uprinting.com/personalize/functions_image/bgimage_wrapper.php?placement_id=27565&product_id=49349&color=593D88&colorname=Court%20Purple&designer_type=clipart&width=300&height=300&pt=1597156665&exp=691200&new_designer=1",
  
    sizes: [
      { sizeId: 1, sizeTitle: "Xl" },
      { sizeId: 2, sizeTitle: "X" },
      { sizeId: 3, sizeTitle: "M" },
      { sizeId: 4, sizeTitle: "S" },
      { sizeId: 5, sizeTitle: "XS" }
    ]
  };

  fabs = {};
  selectedFab: fabric.Canvas = null;
  selectedSide = "";
  sides = [];
  quotas: any = [];
  color = "#FFFFFF";
  font = "Lato";

  currentText = "";

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

  @ViewChild("canvasHolder") canvasContainer: ElementRef<HTMLDivElement>;
  @ViewChild("imageHolder") imageHolder: ElementRef<HTMLDivElement>;
  @ViewChild("mainCan") mainCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild("imageUpload") imageUploadEl: ElementRef<HTMLInputElement>;

  constructor() {
   }
  ngAfterViewChecked(): void {
    // this.buildSettings()
  }

  ngOnInit(): void {
    // this.buildSettings();
  }

  ngAfterViewInit(): void {
    this.buildSettings();
  }

  private buildSettings() {
    fabric.Object.NUM_FRACTION_DIGITS = 10;

    const sides = Object.keys(this.mockup).map((i) => {
      console.log(i, i.includes("side"));
      if (i.includes("side")) {
        return i;
      }
    }).filter(i => i != null && i != undefined);

    const basicFab = new fabric.Canvas("mainCan", {
      backgroundColor: '#EEEEFF',
      width: 400,
      height: 400,
    });

    this.selectedFab = basicFab;

    this.sides = sides;

    sides.forEach((s, i) => {

      this.quotas[s] = { text: false, image: false }

      // this.mainCanvas.nativeElement.id = s;

      let fab = new fabric.Canvas(s, {
        backgroundColor: '#EEEEFF',
        width: 400,
        height: 400,
      });

      fabric.Image.fromURL(this.mockup[s], (img) => {
        img.scaleToHeight(400);
        img.scaleToWidth(400)
        fab.setBackgroundImage(img, () => {});
        // fab.add(tx);
        this.fabs[s] = fab.toJSON();
        fab.clear();
        this.selectFab();
      });
      

    });
    
    // this.selectFab();
  }

  public selectFab(){
    const keys = Object.keys(this.fabs);
    this.selectedSide = keys[0];
    this.selectedFab.loadFromJSON(this.fabs[keys[0]], () => {});
    this.selectedFab.renderAll()
  }

  public onFabChange (fabName) {
    this.fabs[this.selectedSide] = this.selectedFab.toJSON();
    let nextFab = this.fabs[fabName];
    this.selectedFab.loadFromJSON(nextFab, (f) => {
      this.selectedFab.forEachObject((o: any) => {
        if (o.type === "text") {
          this.color = o.fill.toString();
          this.font = o.fontFamily;
          this.currentText = o.text;
        }
      })
    });
    this.selectedSide = fabName;
    
  }

  public onAddText () {
    let tx = new fabric.Text(this.currentText, {
      text: this.currentText,
    });
    this.color = ("rgba(0,0,0,1)");
    this.font = "lato";
    tx.fill = "rgba(0,0,0,1)";
    tx.fontFamily = "lato";
    tx.text = this.currentText;
    tx.dirty = true;
    this.selectedFab.add(tx);
    this.selectedFab.renderAll();
    this.quotas[this.selectedSide].text = true;
    tx.set("text", this.currentText);
    this.selectedFab.renderAll();
  }

  public selectImage(){
    this.imageUploadEl.nativeElement?.click();
  }

  public onImageChange(e) {
    let f = e.target.files[0];
    if (f && window){
      let url = window.URL.createObjectURL(f);
      fabric.Image.fromURL(url, (img) => {
        img.scaleToHeight(200);
        img.scaleToWidth(200);
        this.selectedFab.add(img);
        this.selectedFab.renderAll();
        this.quotas[this.selectedSide].image = true;
      });
    }
  }

  public bringImageToFront() {
    let obj = this.getCurrentImageObject();

    if (obj) {
      obj.bringToFront();
      this.selectedFab.renderAll();
    }
  }

  public bringImageToBack() {
    let obj = this.getCurrentImageObject();

    if (obj) {
      obj.sendToBack();
      this.selectedFab.renderAll();
    }
  }
  
  public rotateImage() {
    let obj: fabric.Image = this.getCurrentImageObject();

    if (obj) {
      obj.rotate(obj.angle + 90);
      this.selectedFab.renderAll();
    }
  }
  
  public changeImage() {}

  public onTextChange (e) {
    console.log(e.target.value, this.currentText, this.currentText);
    let txtObj = this.getCurrentTextObject();
    if (txtObj) {
      // console.dir(txtObj);
      // txtObj.set("text", "lsdjkfljk")
      // this.currentText = e.target.value;
      txtObj.text = e.target.value;
      this.selectedFab.renderAll()
    }
  }

  public onFontChange(e) {
    let tx = this.getCurrentTextObject();
    if (tx) {
      tx.fontFamily = e;
      tx.dirty = true;
      this.selectedFab.renderAll();
    }
  }

  public handleColorChange(e) {
    let tx = this.getCurrentTextObject();
    if (tx) {
      tx.fill = e;
      tx.dirty = true;
      this.selectedFab.renderAll();
    }
  }

  private getCurrentTextObject(): any | null {
    let objs = this.selectedFab.getObjects().filter(t => t.type === "text");
    if (!objs?.length) return null;
    return objs[0];
  }

  private getCurrentImageObject(): any | null {
    let objs = this.selectedFab.getObjects().filter(t => t.type === "image");
    if (!objs?.length) return null;
    return objs[0];
  }
}
