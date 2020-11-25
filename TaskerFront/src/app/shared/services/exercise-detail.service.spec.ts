import { ExerciseDetail } from './../models/exercise-detail.model';
import { HttpClient } from '@angular/common/http';
import { ExerciseDetailService } from './exercise-detail.service';
import { autoSpy } from 'auto-spy';
import { of, throwError } from 'rxjs';

describe('ExerciseDetailService', () => {
  it('when post is called it should', () => {
    // arrange
    const { build, http } = setup().default();
    const e = build();
    http.post.and.returnValue(of([new ExerciseDetail()]))
    // act
    let result = e.post();
    // assert
    expect(result).toBeTruthy();
  });
  it('when put is called it should', () => {
    // arrange
    const { build, http } = setup().default();
    const e = build();
    http.put.and.returnValue(of([new ExerciseDetail()]))
    // act
    e.formData=new ExerciseDetail();
    let result = e.put();
    // assert
    expect(result).toBeTruthy();
  });
  it('when delete is called it should', () => {
    // arrange
    const { build, http } = setup().default();
    const e = build();
    http.delete.and.returnValue(of([new ExerciseDetail()]))
    // act
    let result = e.delete(1);
    // assert
    expect(result).toBeTruthy();
  });
  it('when get is called it should', () => {
    // arrange
    const { build, http } = setup().default();
    const e = build();
    http.get.and.returnValue(of([new ExerciseDetail()]))
    // act
    let result = e.get(1);
    // assert
    expect(result).toBeTruthy();
  });
  it('when refreshList is called it should', () => {
    // arrange
    const { build, http } = setup().default();
    const e = build();
    http.get.and.returnValue(of([new ExerciseDetail()]))// = () => {}//.returnValue([new ExerciseDetail()])

    // act
    e.refreshList();
    // assert
    expect(e.list).toBeUndefined()
  });
  
});

function setup() {
  const http = autoSpy(HttpClient);
  const builder = {
    http,
    default() {
      return builder;
    },
    build() {
      return new ExerciseDetailService(http);
    }
  };

  return builder;
}
