import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormControlName, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Input() IsFirstMove: true;
  @Output() xValueEvent = new EventEmitter<number>();
  @Output() yValueEvent = new EventEmitter<number>();
  @Output() facingValueEvent = new EventEmitter<string>();
  @Output() rptBtnClickedEvent = new EventEmitter<string>();
  @Output() lftBtnClickedEvent = new EventEmitter<string>();
  @Output() rhtBtnClickedEvent = new EventEmitter<string>();
  @Output() movBtnClickedEvent = new EventEmitter<string>();
  @Output() resBtnClickedEvent = new EventEmitter<string>();
  @Output() plcBtnClickedEvent = new EventEmitter<boolean>();
    
    
 controlPanelForm  = this.fb.group({
      placeX: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
      placeY: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
      radDirection: ['', Validators.compose([Validators.required])],     
      moveUnit: [''],
      moveLeft: [''],
      moveRight: [''],
      reportPosition: [''],     
   });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  newXItem(value: number): void {
    this.xValueEvent.emit(value);
   }
  newYItem(value: number): void {
    this.yValueEvent.emit(value);
   }
  newFacingItem(value: string): void {
    this.facingValueEvent.emit(value);
   }

  clickReport(value: string): void{
    this.rptBtnClickedEvent.emit(value);
  }

  rotateLeft(value: string): void{
    this.lftBtnClickedEvent.emit(value);
  }
  rotateRight(value: string): void{
    this.rhtBtnClickedEvent.emit(value);
  }

  clickMove(value: string): void{
    this.movBtnClickedEvent.emit(value);
  }
  clickReset(value: string): void{
    this.resBtnClickedEvent.emit(value);
  }
  
  onSubmit(): void {
   
    // tslint:disable-next-line: max-line-length
  
     if (this.controlPanelForm.controls.placeX.invalid)
    {
        alert(`X value invalid, valid selection is [0-5]`);
        this.plcBtnClickedEvent.emit(false);
    } 
    else if (this.controlPanelForm.controls.placeY.invalid)
    {
        alert(`Y value invalid, valid selection is [0-5]`);
        this.plcBtnClickedEvent.emit(false);
    }  
    else if (this.controlPanelForm.controls.radDirection.touched === false)
    {
        alert(`Please select any one direction`);
        this.plcBtnClickedEvent.emit(false);
    } 
     else if (this.controlPanelForm.valid){
      this.plcBtnClickedEvent.emit(true);
    }    
  }  
}
