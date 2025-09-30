# AI Fitness Planner

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)

A smart, personalized fitness planner that uses the Google Gemini API to generate custom workout and dietary plans based on your unique profile and goals.

**[View Live Demo](https://internship-project-phi-eight.vercel.app/)**

## Description

This application acts as your personal AI fitness coach. By providing details about your physical stats, fitness level, goals, and preferences, you receive a comprehensive 7-day workout and diet plan. The generated plan is tailored to you and can be downloaded as a PDF for easy access anytime, anywhere.

## Features

- **AI-Powered Personalization**: Leverages the Google Gemini API to create workout and dietary plans tailored to your specific profile, goals, and preferences.
- **Comprehensive User Profile**: Input details like age, gender, fitness level, dietary restrictions, and more for a highly customized plan.
- **Dynamic Plan Display**: View your generated workout and diet schedules in a clean, tabbed interface.
- **Download as PDF**: Easily download your complete fitness plan as a professionally formatted PDF to use offline.
- **Responsive Design**: A fully responsive interface that works beautifully on desktops, tablets, and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini API (`@google/genai`)
- **PDF Generation**: jsPDF, html2canvas

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- A package manager like npm, yarn, or pnpm
- A Google Gemini API key

### Local Setup

1.  **Clone the repository**
    -   Clone the project to your local machine.
    -   Navigate into the project directory.

2.  **Install dependencies**
    -   Run the following command to install the required packages.
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    -   This application requires a Google Gemini API key to function.
    -   Create a file named `.env` in the root of the project directory.
    -   Add your API key to this file as shown below:
    ```env
    API_KEY="YOUR_GEMINI_API_KEY"
    ```
    -   You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server**
    -   Start the local development server with the following command:
    ```bash
    npm run dev
    ```
    -   If the above command doesn't work, try `npm start`.
    -   Open your browser and navigate to `http://localhost:5173` or the address provided in your terminal.

## Author

- **Aayush Badola**
