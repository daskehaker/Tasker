export enum MusculeGroup{
    Legs,
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