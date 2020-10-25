import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendDetailPage } from './spend-detail.page';

describe('SpendDetailPage', () => {
  let component: SpendDetailPage;
  let fixture: ComponentFixture<SpendDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
