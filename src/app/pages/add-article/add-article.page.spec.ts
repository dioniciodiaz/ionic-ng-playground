import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddArticlePage } from './add-article.page';

describe('AddArticlePage', () => {
  let component: AddArticlePage;
  let fixture: ComponentFixture<AddArticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
