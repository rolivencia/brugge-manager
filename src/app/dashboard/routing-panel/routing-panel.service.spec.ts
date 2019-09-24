import { TestBed } from '@angular/core/testing';

import { RoutingPanelService } from './routing-panel.service';

describe('RoutingPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutingPanelService = TestBed.get(RoutingPanelService);
    expect(service).toBeTruthy();
  });
});
