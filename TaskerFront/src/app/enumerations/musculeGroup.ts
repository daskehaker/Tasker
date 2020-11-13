export enum MusculeGroup{
    Legs = 0,
    Chest,
    Back,
    Biceps,
    Triceps,
    Abs,
    Cardio,
	Soulders
}

export namespace MusculeGroup {

    export function values() {
      return Object.keys(MusculeGroup).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }