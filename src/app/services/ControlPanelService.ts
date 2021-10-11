import { Injectable } from '@angular/core';
import { environment } from '../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelService {
  oneUnitInPixels: number;
  borderUpperLimit: number;
  borderLowerLimit = 0;
  newFacing: string;
  pixX = 0;
  pixY = 0;

  constructor() {}
  calculatePixelForOneUnit(unitMeasurement: number): number {
    const oneUnitPixelCount: string = (
      unitMeasurement / environment.UnitUpperLimit
    ).toString();

    const oneUnit: number =
      oneUnitPixelCount.indexOf('.') !== -1
        ? // tslint:disable-next-line: radix
          parseInt(
            oneUnitPixelCount.substring(0, oneUnitPixelCount.indexOf('.') - 1)
          )
        : // tslint:disable-next-line: radix
          parseInt(oneUnitPixelCount);
    return oneUnit;
  }

  getRotationDegreeForPlace(cmdFacing: string): number {
    let rotationDegree: number;
    switch (cmdFacing) {
      case environment.W: {
        rotationDegree = -90;
        break;
      }
      case environment.N: {
        rotationDegree = 360;
        break;
      }
      case environment.E: {
        rotationDegree = 90;
        break;
      }
      case environment.S: {
        rotationDegree = 180;
        break;
      }
      default:
        rotationDegree = 360;
        break;
    }
    this.newFacing = cmdFacing;
    return rotationDegree;
  }

  getPositionToPlace(
    cmdX: number,
    cmdY: number,
    unitMeasurement: number,
    cmdFacing: string
  ): number[] {
    const posCordinates: number[] = [0, 0];
    this.oneUnitInPixels = this.calculatePixelForOneUnit(unitMeasurement);

    posCordinates[0] = cmdX * this.oneUnitInPixels;
    posCordinates[1] = cmdY * this.oneUnitInPixels;

    this.pixX = posCordinates[0];
    this.pixY = posCordinates[1];

    this.borderUpperLimit =
      this.oneUnitInPixels * environment.UnitUpperLimit -
      environment.ImageLength;

    this.borderLimitCheck(cmdFacing);
    posCordinates[0] = this.pixX;
    posCordinates[1] = this.pixY;

    return posCordinates;
  }
  // tslint:disable-next-line: align
  // tslint:disable-next-line: no-unused-expression
  // tslint:disable-next-line: align
  getPositionForMove(
    pixX: number,
    pixY: number,
    newFacing: string,
    unitMeasurement: number
  ): number[] {
    const posCordinates: number[] = [0, 0];
    this.oneUnitInPixels = this.calculatePixelForOneUnit(unitMeasurement);

    posCordinates[0] = pixX;
    posCordinates[1] = pixY;

    switch (newFacing) {
      case environment.N: {
        posCordinates[1] = pixY + this.oneUnitInPixels;
        break;
      }
      case environment.S: {
        posCordinates[1] = pixY - this.oneUnitInPixels;
        break;
      }
      case environment.E: {
        posCordinates[0] = pixX + this.oneUnitInPixels;
        break;
      }
      case environment.W: {
        posCordinates[0] = pixX - this.oneUnitInPixels;
        break;
      }
      default: {
        posCordinates[0] = 0;
        posCordinates[1] = 0;
        break;
      }
    }
    this.borderUpperLimit =
      this.oneUnitInPixels * environment.UnitUpperLimit -
      environment.ImageLength;
    this.pixX = posCordinates[0];
    this.pixY = posCordinates[1];
    this.borderLimitCheck(newFacing);
    posCordinates[0] = this.pixX;
    posCordinates[1] = this.pixY;

    return posCordinates;
  }

  borderLimitCheck(newFacing: string): void {
    if (newFacing === environment.N) {
      this.pixY =
        this.pixY >= this.borderUpperLimit ? this.borderUpperLimit : this.pixY;

      this.pixY =
        this.pixY < this.borderLowerLimit ? this.borderLowerLimit : this.pixY;

      this.pixX =
        this.pixX >= this.borderUpperLimit ? this.borderUpperLimit : this.pixX;

      this.pixX =
        this.pixX < this.borderLowerLimit ? this.borderLowerLimit : this.pixX;
    } else if (newFacing === environment.E) {
      this.pixX =
        this.pixX >= this.borderUpperLimit ? this.borderUpperLimit : this.pixX;

      this.pixX =
        this.pixX < this.borderLowerLimit ? this.borderLowerLimit : this.pixX;

      this.pixY =
        this.pixY < this.borderLowerLimit ? environment.ImageLength : this.pixY;

      this.pixY =
        this.pixY >= this.borderUpperLimit ? this.borderUpperLimit : this.pixY;
    } else if (newFacing === environment.W) {
      this.pixX =
        this.pixX >= this.borderUpperLimit ? this.borderUpperLimit : this.pixX;

      this.pixX =
        this.pixX < this.borderLowerLimit ? this.borderLowerLimit : this.pixX;

      this.pixY =
        this.pixY < this.borderLowerLimit ? this.borderLowerLimit : this.pixY;

      this.pixY =
        this.pixY >= this.borderUpperLimit ? this.borderUpperLimit : this.pixY;
    } else if (newFacing === environment.S) {
      this.pixY =
        this.pixY < this.borderLowerLimit ? this.borderLowerLimit : this.pixY;

      this.pixY =
        this.pixY >= this.borderUpperLimit ? this.borderUpperLimit : this.pixY;

      this.pixX =
        this.pixX >= this.borderUpperLimit ? this.borderUpperLimit : this.pixX;

      this.pixX =
        this.pixX < this.borderLowerLimit ? environment.ImageLength : this.pixX;
    }
  }

  getRotationDegreeAsPerFacing(currFacing): number {
    let newRotationDegree = 0;

    switch (currFacing) {
      case environment.N: {
        newRotationDegree = 360;
        break;
      }
      case environment.S: {
        newRotationDegree = 180;
        break;
      }
      case environment.E: {
        newRotationDegree = 90;
        break;
      }
      case environment.W: {
        newRotationDegree = -90;
        break;
      }
      default: {
        newRotationDegree = 0;
        break;
      }
    }
    return newRotationDegree;
  }
  getRotationDegreeAsPerLeftRight(
    currFacing: string,
    direction: string
  ): number {
    let newRotationDegree = 0;

    switch (currFacing) {
      case environment.N: {
        newRotationDegree = direction === environment.DIRECTIONLEFT ? -90 : 90;
        break;
      }
      case environment.S: {
        newRotationDegree = direction === environment.DIRECTIONLEFT ? 90 : -90;
        break;
      }
      case environment.E: {
        newRotationDegree = direction === environment.DIRECTIONLEFT ? 360 : 180;
        break;
      }
      case environment.W: {
        newRotationDegree = direction === environment.DIRECTIONLEFT ? 180 : 360;
        break;
      }
      default: {
        newRotationDegree = 0;
        break;
      }
    }
    return newRotationDegree;
  }

  getNewFacingAfterLeftRight(newRotationDegree: number): string {
    let newFacingAfterLeftRight: string = null;

    switch (newRotationDegree) {
      case 180: {
        newFacingAfterLeftRight = environment.S;
        break;
      }
      case 90: {
        newFacingAfterLeftRight = environment.E;
        break;
      }
      case 360: {
        newFacingAfterLeftRight = environment.N;
        break;
      }
      case -90: {
        newFacingAfterLeftRight = environment.W;
        break;
      }
      default: {
        newFacingAfterLeftRight = 'ERROR';
        break;
      }
    }
    this.newFacing = newFacingAfterLeftRight;
    return newFacingAfterLeftRight;
  }
}
