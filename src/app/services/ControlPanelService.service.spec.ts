import { TestBed } from '@angular/core/testing';

import { ControlPanelService } from './ControlPanelService';

describe('ControlpanelService', () => {
  let service: ControlPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get RotationDegreeAsPerFacing', () => {
    expect(service.getRotationDegreeAsPerFacing('North')).toBe(360);
  });

  it('should get calculatePixelForOneUnit', () => {
    expect(service.calculatePixelForOneUnit(500)).toBe(100);
  });

  it('should getPositionForMove', () => {
    expect(service.getPositionForMove(100, 200, 'North', 500)).toContain(100, 300);
  });

  it('should getPositionToPlace', () => {
    expect(service.getPositionToPlace(2, 3, 500, 'East')).toContain(200, 300);
  });

  it('should getPositionToPlace', () => {
    expect(service.getRotationDegreeAsPerLeftRight('North', 'Left')).toBe(-90);
  });

  it('should getNewFacingAfterLeftRight', () => {
    expect(service.getNewFacingAfterLeftRight(90)).toBe('East');
  }); 


});
