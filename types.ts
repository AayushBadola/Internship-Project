export enum FitnessLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum Goal {
  WeightLoss = 'Weight Loss',
  MuscleGain = 'Muscle Gain',
  GeneralFitness = 'General Fitness',
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
}

export enum WorkoutPreference {
  Gym = 'Gym',
  Home = 'Home',
  Hybrid = 'Hybrid (Gym & Home)',
}

export enum DietaryPreference {
  None = 'None',
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
  Keto = 'Keto',
  Paleo = 'Paleo',
}

export interface UserData {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  fitnessLevel: FitnessLevel;
  goal: Goal;
  workoutPreference: WorkoutPreference;
  daysPerWeek: number;
  dietaryPreference: DietaryPreference;
  additionalInfo?: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  description: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface Meal {
  meal: string;
  description: string;
  calories: number;
}

export interface DietaryDay {
  day: string;
  meals: Meal[];
  totalCalories: number;
  macronutrients: {
    protein: string;
    carbs: string;
    fat: string;
  }
}

export interface GeneratedPlan {
  workoutPlan: WorkoutDay[];
  dietaryPlan: DietaryDay[];
}