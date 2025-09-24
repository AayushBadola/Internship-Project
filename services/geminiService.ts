import { GoogleGenAI, Type } from "@google/genai";
import { UserData, GeneratedPlan } from '../types';

// This function safely retrieves the API key and initializes the AI client.
// It prevents the app from crashing in a browser environment where `process` is not defined.
const initializeAiClient = () => {
    try {
        // This line is designed for environments where `process` is defined.
        // In a browser, it will throw a ReferenceError, which we catch.
        // The user must configure their environment variables correctly on their hosting platform (e.g., Vercel).
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            return {
                ai: new GoogleGenAI({ apiKey: process.env.API_KEY }),
                error: null,
            };
        }
    } catch (e) {
        // Catches the "process is not defined" ReferenceError in the browser.
    }
    
    // If we've reached this point, the API key was not found.
    return {
        ai: null,
        error: "API key is not configured. Please set up the API_KEY environment variable in your deployment platform.",
    };
};

const { ai, error: initError } = initializeAiClient();

const planSchema = {
    type: Type.OBJECT,
    properties: {
        workoutPlan: {
            type: Type.ARRAY,
            description: "A 7-day workout plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
                    focus: { type: Type.STRING, description: "Main muscle group or focus for the day (e.g., Chest & Triceps, Full Body, Rest)." },
                    exercises: {
                        type: Type.ARRAY,
                        description: "List of exercises for the day. Should be empty if it is a rest day.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Name of the exercise." },
                                sets: { type: Type.STRING, description: "Number of sets (e.g., 3, 4, 3-4)." },
                                reps: { type: Type.STRING, description: "Number of repetitions per set (e.g., 8-12, 15)." },
                                rest: { type: Type.STRING, description: "Rest time between sets (e.g., 60s, 90s)." },
                                description: { type: Type.STRING, description: "A brief, simple description of how to perform the exercise." },
                            },
                            required: ["name", "sets", "reps", "rest", "description"],
                        },
                    },
                },
                required: ["day", "focus", "exercises"],
            },
        },
        dietaryPlan: {
            type: Type.ARRAY,
            description: "A 7-day dietary plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
                    meals: {
                        type: Type.ARRAY,
                        description: "List of meals for the day (e.g., Breakfast, Lunch, Dinner, Snack 1).",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                meal: { type: Type.STRING, description: "Name of the meal (e.g., Breakfast)." },
                                description: { type: Type.STRING, description: "Description of the food items." },
                                calories: { type: Type.INTEGER, description: "Estimated calories for the meal." },
                            },
                            required: ["meal", "description", "calories"],
                        },
                    },
                    totalCalories: { type: Type.INTEGER, description: "Total estimated calories for the day." },
                    macronutrients: {
                        type: Type.OBJECT,
                        description: "Estimated macronutrient breakdown for the day.",
                        properties: {
                            protein: { type: Type.STRING, description: "Grams of protein (e.g., 150g)." },
                            carbs: { type: Type.STRING, description: "Grams of carbohydrates (e.g., 200g)." },
                            fat: { type: Type.STRING, description: "Grams of fat (e.g., 70g)." },
                        },
                        required: ["protein", "carbs", "fat"],
                    },
                },
                required: ["day", "meals", "totalCalories", "macronutrients"],
            },
        },
    },
    required: ["workoutPlan", "dietaryPlan"],
};


export const generatePlan = async (userData: UserData): Promise<GeneratedPlan> => {
    // If initialization failed, throw the captured error.
    if (initError || !ai) {
        throw new Error(initError || "AI client failed to initialize.");
    }
    
    const additionalInfoPrompt = userData.additionalInfo
        ? `- Additional Considerations: ${userData.additionalInfo} (Please take these into account, especially for the dietary plan, avoiding specified allergens and considering any physical limitations for the workout plan).`
        : '';
    
    const prompt = `
    You are an expert fitness coach and world-class nutritionist. Generate a comprehensive, personalized, and structured 7-day workout and dietary plan based on the following user data:
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - Height: ${userData.height} cm
    - Weight: ${userData.weight} kg
    - Fitness Level: ${userData.fitnessLevel}
    - Primary Goal: ${userData.goal}
    - Workout Preference: ${userData.workoutPreference} (Plan exercises accordingly. For 'Home', suggest exercises with minimal or no equipment. For 'Gym', include machine and free-weight exercises. For 'Hybrid', provide a mix).
    - Workout Days Per Week: ${userData.daysPerWeek} (The other days should be rest days in the workout plan).
    - Dietary Preference: ${userData.dietaryPreference} (The entire dietary plan must adhere to this).
    ${additionalInfoPrompt}

    Instructions:
    1.  **Workout Plan:** Create a 7-day schedule. For each workout day, provide a clear focus and a list of specific exercises with sets, reps, rest time, and a brief description. Ensure the number of workout days matches the user's preference. Rest days should be clearly marked with an empty exercise list.
    2.  **Dietary Plan:** Create a 7-day meal plan. For each day, provide suggestions for breakfast, lunch, dinner, and two snacks. Include estimated calorie counts for each meal and a daily total. Also, provide an estimated macronutrient breakdown (protein, carbs, fat) for each day.
    3.  **Realism:** The plan must be realistic, safe, and effective for the user's profile and goals.
    4.  **Format:** Adhere strictly to the provided JSON schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: planSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const planData = JSON.parse(jsonText);

        return planData as GeneratedPlan;

    } catch (error) {
        console.error("Error generating plan from Gemini:", error);
        throw new Error("Failed to generate the fitness plan. The model may be overloaded or the request was invalid. Please check your inputs and try again.");
    }
};