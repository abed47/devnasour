import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TowDTool } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class TwoDEditorService {

  public selectedEl: any;
  public toolSelected: TowDTool = "select";
  private toolSubject: Subject<TowDTool> = new Subject();

  constructor() { }

  public getSelectedTool(){
    return this.toolSelected;
  }

  public changeTool(t: TowDTool){
    this.toolSelected = t;
    this.toolSubject.next(t);
  }
  
  public getToolSubject(){
    return this.toolSubject;
  }
}
