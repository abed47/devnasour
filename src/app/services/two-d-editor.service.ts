import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwoDEditorService {

  public selectedEl: any;
  public toolSelected: "templates" | "text" | "image-upload" | "elements" | "background" | "folders" | "brush";

  constructor() { }
}
