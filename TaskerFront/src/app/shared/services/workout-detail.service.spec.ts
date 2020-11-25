import { HttpClient } from '@angular/common/http';
import { WorkoutDetailService } from './workout-detail.service';
import { autoSpy } from 'auto-spy';

describe('WorkoutDetailService', () => {
  it('when GetList is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.GetList();
    // assert
    // expect(w).toEqual
  });
  it('when Add is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.Add(null);
    // assert
    // expect(w).toEqual
  });
  it('when Update is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.Update(0, null);
    // assert
    // expect(w).toEqual
  });
  it('when get is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.get(0);
    // assert
    // expect(w).toEqual
  });
  it('when delete is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.delete(0);
    // assert
    // expect(w).toEqual
  });
  it('when AddExercise is called it should', () => {
    // arrange
    const { build } = setup().default();
    const w = build();
    // act
    w.AddExercise(0, null);
    // assert
    // expect(w).toEqual
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
      return new WorkoutDetailService(http);
    }
  };

  return builder;
}
