import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionPage } from './edit-transaction.page';

describe('EditTransactionPage', () => {
  let component: EditTransactionPage;
  let fixture: ComponentFixture<EditTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransactionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
