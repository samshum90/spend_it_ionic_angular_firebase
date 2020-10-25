import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendCreatePage } from './spend-create.page';

describe('SpendCreatePage', () => {
  let component: SpendCreatePage;
  let fixture: ComponentFixture<SpendCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
