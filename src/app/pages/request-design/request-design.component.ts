import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-design',
  templateUrl: './request-design.component.html',
  styleUrls: ['./request-design.component.scss']
})
export class RequestDesignComponent implements OnInit {

  public designForm: FormGroup;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.designForm = this.fb.group({
      phone: ['+96176402090', []],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', []]
    })
  }

}
