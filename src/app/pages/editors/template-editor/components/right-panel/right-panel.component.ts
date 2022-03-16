import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'two-d-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

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
  ]

  public selectedFont = 'Poppins';
  public fontSize = 15;
  public opacity = 100;
  public color = new Color(0,0,80,1);
  public backgroundColor = '#000080';
  public touchUi = false;

  public colorFc: AbstractControl = new FormControl(null);

  constructor() { }

  ngOnInit(): void {
  }

  public handleColorChange(e){
    console.log(e);
  }

}
