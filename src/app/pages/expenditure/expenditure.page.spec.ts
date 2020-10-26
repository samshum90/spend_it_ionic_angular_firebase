import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpenditurePage } from './expenditure.page';

describe('ExpenditurePage', () => {
  let component: ExpenditurePage;
  let fixture: ComponentFixture<ExpenditurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenditurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
