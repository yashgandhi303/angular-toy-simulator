import { Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {environment} from '../shared/environment';
import {ControlPanelService} from '../services/ControlPanelService';
import {ReportComponent} from '../report/report.component';

@Component({
  selector: 'app-table-area',
  templateUrl: './table-area.component.html',
  styleUrls: ['./table-area.component.scss']
})
export class TableAreaComponent implements OnInit, AfterViewInit {
  @Input() cmdX = 0;
  @Input() cmdY = 0;
  @Input() cmdFacing: string = null;
  @Input() newDirection: string = null;
  @Input() pixX: number;
  @Input() pixY: number;
  @Input() newFacing: string = null;
  @Input() RotationDegreeForPlace: number = null;
  @Input() IsFirstMove = true;
  @Input() unitOfMeasurement: number;

  resultString = '';
  commandString = '';
  logMessage = '';
  currRotationDegree = 0;


  @ViewChild('r') rptComp: ReportComponent;

  constructor(public cpService: ControlPanelService ) {}

   ngOnInit(): void {
    const el = document.querySelector('#tbl-area');
    this.unitOfMeasurement = el.clientWidth;
   // this.IsFirstMove = true;
  }

  ngAfterViewInit(): void{
  }

  getFacingValue(value: string): void
  {
    this.cmdFacing = value;
  }

  getXValue(value: number): void
  {
    this.cmdX = value;
  }

  getYValue(value: number): void
  {
    this.cmdY = value;
  }

  getFormValidValue(value: boolean): void {
    if (value)
    {
      this.place();
    }
  }

  rotate(direction: string): void{
   // const positions: number[] = this.cpService.getPositionToPlace(this.cmdX, this.cmdY, this.unitOfMeasurement, this.cmdFacing);
    this.logCommands(direction);
    this.currRotationDegree = this.cpService.getRotationDegreeAsPerLeftRight(this.newFacing, direction);
    this.newFacing = this.cpService.getNewFacingAfterLeftRight(this.currRotationDegree);
    const elRobot = document.getElementById('robot');
    elRobot.style.transform = `translate(${this.pixX}px,-${this.pixY}px) rotate(${this.currRotationDegree}deg)`;
    this.logResult();
  }

  move(): void {
    let rotationDegree = 0;
    this.logCommands(environment.CMDMOVE);
    const positions: number[] = this.cpService.getPositionForMove(this.pixX, this.pixY, this.newFacing, this.unitOfMeasurement);
    this.pixX = positions[0];
    this.pixY = positions[1];

    const elRobot = document.getElementById('robot');
    rotationDegree = this.cpService.getRotationDegreeAsPerFacing(this.newFacing);

    if (this.newFacing === environment.E || this.newFacing === environment.W){
        elRobot.style.transform = `translate(${this.pixX}px,-${this.pixY}px) rotate(${rotationDegree}deg)`;
    }
   else {
        elRobot.style.transform = `translate(${this.pixX}px,-${this.pixY}px) rotate(${rotationDegree}deg)`;
   }


    const elTD = document.getElementById('tbl-column');
    elTD.appendChild(elRobot);
    this.logResult();
  }
    place(): void
   {
    this.logCommands(environment.CMDPLACE);
    const elTD = document.getElementById('tbl-column');
    const elRobot = document.getElementById('robot');

    elTD.appendChild(elRobot);
    const positions: number[] = this.cpService.getPositionToPlace(this.cmdX, this.cmdY, this.unitOfMeasurement, this.cmdFacing);

    this.pixX = positions[0];
    this.pixY = positions[1];

    this.placeRobot();
    this.IsFirstMove = false;
    this.newFacing = this.cmdFacing;
    this.logResult();
   }

   placeRobot(): void
   {
    const elRobot = document.getElementById('robot');
    elRobot.style.visibility = 'visible';
    const elTD = document.getElementById('tbl-column');
    elTD.appendChild(elRobot);

    this.RotationDegreeForPlace = this.cpService.getRotationDegreeForPlace(this.cmdFacing);

    elRobot.style.transform = `translate(${this.pixX}px,-${this.pixY}px) rotate(${this.RotationDegreeForPlace}deg)`;
    elRobot.style.transform = `rotate(${this.RotationDegreeForPlace}deg translate(${this.pixX}px,-${this.pixY}px)`;

   }

  logResult(): void
  {
    this.resultString = ` X:${this.pixX}px Y:${this.pixY}px Facing:${this.newFacing}`;
    this.logMessage += this.resultString + ' ';
    const elTxtA = document.getElementById('scroll-log');
    elTxtA.innerText = this.logMessage;
  }

  logCommands(cmd: string): void
  {
    this.commandString = `${cmd} X:${this.cmdX} Y:${this.cmdY} Facing:${this.cmdFacing}`;
    this.logMessage +=  this.commandString + ' ** ';
    const elTxtA = document.getElementById('scroll-log');
    if (elTxtA && elTxtA.innerText) {
      elTxtA.innerText = this.logMessage;
    }
  }

  clearLog(): void{
    const elTxtA = document.getElementById('scroll-log');
    const elBtn = document.getElementById('close');
    const elDiv = document.getElementById('log-div');
    elTxtA.innerText = '';
    this.logMessage = '';
  }
}
