import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { fabric } from 'fabric';
import { CartService } from 'src/app/services/cart.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-mockup-add-to-cart',
  templateUrl: './mockup-add-to-cart.component.html',
  styleUrls: ['./mockup-add-to-cart.component.scss']
})
export class MockupAddToCartComponent implements OnInit, AfterViewChecked, AfterViewInit {

  mockup: any = {};

  product: any = {};
  sizedSelected: any = {};

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

  constructor(
    private request: RequestService,
    private layoutUtils: LayoutUtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
   }
  ngAfterViewChecked(): void {
    // this.buildSettings()
  }

  ngOnInit(): void {
    // this.buildSettings();
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  private async loadData() {

    try {
      const productId = await this.route.snapshot.params.id;
      const colorId = await this.route.snapshot.params.colorId;
      this.layoutUtils.showLoader();
      const data: any = await this.request.getMockups({
        mockup_id: productId,
      });

      if (data?.data?.length) {
        let res = data.data[0];
        const selectedColor = res?.colors?.filter((c) => {
          return c.color_id == colorId;
        });

        this.mockup = selectedColor[0]
        this.product = res;
      }
      this.layoutUtils.hidePreloader();
      this.buildSettings();
    } catch (err) {
      this.layoutUtils.hidePreloader();
      this.layoutUtils.showSnack("error", err?.message);
    }
  }
  private buildSettings() {
    fabric.Object.NUM_FRACTION_DIGITS = 10;

    const sides = Object.keys(this.mockup).map((i) => {
      if (i.includes("side")) {
        return i;
      }
    }).filter(i => {
      return i != null && i != undefined && this.mockup[i]
    });

    const basicFab = new fabric.Canvas("mainCan", {
      backgroundColor: '#EEEEFF',
      width: 400,
      height: 400,
    });

    this.selectedFab = basicFab;

    this.sides = sides;
    
    // this.sides = sides.map(s => s);
    this.sides.forEach(s => {
      this.mockup[s] = "data:image/jpeg;base64," + this.mockup[s];
    });

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

    const img2 = this.getCurrentImageObject();
    if (img2) {
      this.selectedFab.remove(img2);
      // this.selectedFab.dirt
      this.selectedFab.renderAll();
    }

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

  public onChangeImage(e) {
    this.imageUploadEl.nativeElement.click();
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

  public async confirmOrder(e) {
    this.fabs[this.selectedSide] = this.selectedFab.toJSON();
    if (!Object.keys(this.sizedSelected).length) {
      this.layoutUtils.showSnack("warn", "Please select a size first")
      return;
    }

    const cartItems: any[] = [];

    //convert
    for (let i = 0; i < Object.keys(this.sizedSelected).length; i++) {
      const currentSize = Object.keys(this.sizedSelected)[i];
      for (let j = 0; j < Object.keys(this.fabs).length; j++) {
        const currentKey = this.fabs[Object.keys(this.fabs)[j]];
        const files = [];
        let raw = this.selectedFab;
        raw.clear();
        raw.loadFromJSON(currentKey, async () => {
          raw.renderAll();
          const url = raw.toDataURL();
          //push to server
          const res: any = await this.request.uploadImage({
            extension: 'png',
            base64: url.split(",")[1]
          });
          files.push(res.link);
          if (j === Object.keys(this.fabs).length - 1){
            this.cartService.addItem({
              name: this.product.web_mockup_title,
              description: this.product.web_mockup_description,
              price: this.product.web_mockup_price * this.sizedSelected[currentSize],
              quantity: this.sizedSelected[currentSize],
              photo: res.link,
              discount: this.product.web_mockup_discount,
              id: this.route.snapshot.params.id,
              color: this.route.snapshot.params.colorId,
              file: res.link,
              size: currentSize,
              type: 'MOCKUP',
              files,
            })
            if (i === Object.keys(this.sizedSelected).length - 1){
              this.router.navigate(["/cart"]);
              if(window){
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }
          }
        });
      }
    }
    //upload

    // this.cartService.addItem({
    //   name: this.product.name,
    //   description: this.product.description,
    //   price: this.selectedPrice,
    //   quantity: this.selectedQuantity,
    //   photo: this.product.images[0].data.src,
    //   discount: this.product.discount,
    //   id: this.route.snapshot.params.id,
    //   color: this.selectedColor,
    //   file: fileUrl,
    //   quantities: this.product.priceList,
    //   size: this.selectedSize
    // });
  }
  
  private detectMimeType(b64) {
    var signatures = {
      JVBERi0: "application/pdf",
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      "/9j/": "image/jpg"
    };

    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }
}
