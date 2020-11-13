export class WorkoutDetail{
    WorkoutId: 0;
    Title: "";
    Type: 0;
    Date: Date;
    Exercises: WorkoutExercise[];
}

export class WorkoutExercise{
    ExerciseId: 0;
    Name: string = "";
    Sets: 0;
    Reps: 0;
    VideoUrl?: string = "";
    Index:number = 0;
}

export class WorkoutInfo{
    Title: "";
    Exercises: WorkoutExercise[];
}