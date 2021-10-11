import { Component, OnInit, Input } from '@angular/core';
import {ControlPanelService} from '../services/ControlPanelService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit { 
  @Input() IsFirstMove: boolean;
  @Input() resultStr  = '';

  constructor(private cpService: ControlPanelService) { }

  ngOnInit(): void {
     }
  
  clearRpt(): void{
    const elLbl = document.getElementById('report');
    const elBtn = document.getElementById('close');
    const elDiv = document.getElementById('rpt-div');
    

    elLbl.innerText = '';
    elLbl.style.visibility = 'hidden';
    elBtn.style.visibility = 'hidden';
    elDiv.style.visibility = 'hidden';   
 }

  displayReport(): void {
    const elLbl = document.getElementById('report');
    const elDiv = document.getElementById('rpt-div');
    const elBtn = document.getElementById('close');
   
    elLbl.innerText = `Your Robot is at ${this.resultStr}`;
    
    elLbl.style.visibility = 'visible';
    elBtn.style.visibility = 'visible';
    elDiv.style.visibility = 'visible';
    
    setTimeout(() => { 
      elLbl.style.visibility = 'hidden';
      elBtn.style.visibility = 'hidden';
      elDiv.style.visibility = 'hidden';
       }, 10000);

  }
 
}
