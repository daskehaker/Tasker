import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/shared/services/project.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        ProjectComponent,
        {provide: ProjectService, useClass: MockProjectService},
        {provide: ToastrService, useClass: MockTosterClass}
      ]
    });
    component = TestBed.inject(ProjectComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockProjectService{
  resetForm(): void{

  }
}

class MockTosterClass {

}