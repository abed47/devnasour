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
  private selectionSubject: Subject<{
    action: string,
    type: "text" | "shape" | "image",
    object: any
  }> = new Subject();
  public objectEvent: Subject<{
    action: string,
    type: "text" | "shape" | "image",
    object: any
  }> = new Subject();

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

  public selectObject(type, action, o){
    this.selectionSubject.next({type, object: o, action});
  }

  public updateObject(type, action, o){
    this.objectEvent.next({type, action, object: o});
  }
  
  public deleteObject(type, action, o){
    this.objectEvent.next({type, action, object: o});
  }

  public getObjectSubject(){
    return this.objectEvent;
  }

  public getSelectionSubject(){
    return this.selectionSubject;
  }
}
