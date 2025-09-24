import { GeneratedPlan, UserData } from '../types';

// This utility assumes jspdf is loaded from a CDN in index.html
declare const jspdf: any;

export const downloadPlanAsPDF = async (plan: GeneratedPlan, userData: UserData): Promise<void> => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = margin;

    const checkPageBreak = (currentY: number, spaceNeeded: number = 20) => {
        if (currentY > pageHeight - margin - spaceNeeded) {
            doc.addPage();
            return margin;
        }
        return currentY;
    };

    // --- Title Page ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(`Personalized Plan for ${userData.name}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 30;

    // --- User Profile Section ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Your Profile', margin, yPos);
    yPos += 8;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos); // Draw line at current yPos
    yPos += 6; // Add vertical space to prevent text overlap

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    // Removed indentation from template literal for clean PDF output
    const profileText = `Age: ${userData.age}
Gender: ${userData.gender}
Height: ${userData.height} cm
Weight: ${userData.weight} kg
Goal: ${userData.goal}`;
    doc.text(profileText.trim(), margin, yPos);
    yPos += 30;


    // --- Dietary Plan Section ---
    yPos = checkPageBreak(yPos, 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Dietary Plan', margin, yPos);
    yPos += 10;

    plan.dietaryPlan.forEach(day => {
        yPos = checkPageBreak(yPos, 30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(day.day, margin, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.text(
            `Total Calories: ${day.totalCalories} kcal | Protein: ${day.macronutrients.protein}, Carbs: ${day.macronutrients.carbs}, Fat: ${day.macronutrients.fat}`,
            margin, yPos
        );
        yPos += 8;

        doc.setFont('helvetica', 'normal');
        day.meals.forEach(meal => {
            yPos = checkPageBreak(yPos, 15);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(`${meal.meal} (${meal.calories} kcal)`, margin + 2, yPos);
            yPos += 5;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const mealDescription = doc.splitTextToSize(meal.description, pageWidth - (margin * 2) - 5);
            doc.text(mealDescription, margin + 5, yPos);
            yPos += (mealDescription.length * 4) + 2;
        });
        yPos += 5;
    });


    // --- Workout Plan Section ---
    doc.addPage();
    yPos = margin;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Workout Plan', margin, yPos);
    yPos += 10;

    plan.workoutPlan.forEach(day => {
        yPos = checkPageBreak(yPos, 30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(`${day.day} - ${day.focus}`, margin, yPos);
        yPos += 8;

        if (day.exercises.length > 0) {
            day.exercises.forEach(ex => {
                yPos = checkPageBreak(yPos, 20);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.text(ex.name, margin + 2, yPos);
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.text(`Sets: ${ex.sets} | Reps: ${ex.reps} | Rest: ${ex.rest}`, margin + 2, yPos + 5);
                yPos += 10;
                
                const exerciseDesc = doc.splitTextToSize(ex.description, pageWidth - (margin * 2) - 5);
                doc.text(exerciseDesc, margin + 5, yPos);
                yPos += (exerciseDesc.length * 4) + 4;
            });
        } else {
            yPos = checkPageBreak(yPos);
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(11);
            doc.text("Rest Day", margin + 2, yPos);
            yPos += 10;
        }
        yPos += 5;
    });

    doc.save(`${userData.name.replace(/\s+/g, '_')}_Fitness_Plan.pdf`);
};