import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MdSectionPage } from './md-section.page';

describe('MdSectionPage', () => {
  let component: MdSectionPage;
  let fixture: ComponentFixture<MdSectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdSectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MdSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
