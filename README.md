<img width="1174" alt="Sahha_logo_llm2" src="https://github.com/user-attachments/assets/ad622de4-69a9-4b13-88e0-dd4619432025">

# Sahha LLM Demo

This repository contains the code for the **Sahha LLM Demo**, a Next.js project using TypeScript. The goal of this project is to create a web-based platform to compare the explainability and reliability of outputs provided by GPT models, with one GPT enabled by **Sahha** data and another using only smartphone/wearable data.

## 🚀 Project Overview

The web application provides:

- 📝 **Recommendation/Explainability Table**: Displays a list of health-related recommendations based on various criteria (severity, demographics, etc.) along with reference papers.
- 📊 **Sahha Product Reference Table**: Provides a detailed description of how Sahha's score and biomarker data are structured and how they should be used by the GPT for decision-making.
- 🔄 **Comparison**: Allows users to toggle between GPT models that either consider Sahha data or use raw device data alone, enabling a comparison of the outputs.

### ✨ Features

- 🎨 **TailwindUI**: A clean and simple user interface with TailwindCSS components.
- ☁️ **Platform**: Designed to be hosted on Netlify for easy deployment.
- 🤖 **GPT Integration**: Leverages GPT-4 or GPT-3.5 models to generate health insights based on user inputs and provided data.

### 📚 Technical Scope

- Integration of Sahha's health data (scores, score-factors, biomarkers) and raw device data.
- Prompting the GPT to consider the data from different sources and generate responses for **Health Insight** and **Health Explanation** requests.
- Toggles for comparing GPT model outputs between Sahha-augmented data and regular raw device data.

## 🗂️ Data and Inputs

- **Data Provided**: Sahha Score JSON, Sahha Biomarker JSON, and Raw Device Data JSON.
- **GPT with Sahha Data**: Prompts the GPT to consider raw device data alongside Sahha scores, score-factors, and biomarkers of the same time/date period before generating a recommendation.
- **GPT without Sahha Data**: Prompts the GPT to use only raw device data (no Sahha context) and generates a recommendation.

---

## ⚙️ Installation Instructions

### Prerequisites
- 🛠️ **Node.js** (v16.x or higher)
- 🚀 **pnpm** (preferred package manager)

To install `pnpm` globally, run:

```bash
npm install -g pnpm
```

### Step-by-Step Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/Sahha-LLM-Demo.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd Sahha-LLM-Demo
    ```

3. **Install dependencies using `pnpm`**:

    ```bash
    pnpm install
    ```

4. **Run the development server**:

    ```bash
    pnpm dev
    ```

    This will start the Next.js development server. By default, it should be available at `http://localhost:3000` 🌐.

5. **Build for production**:

    To build the project for production:

    ```bash
    pnpm build
    ```

6. **Run the production server**:

    After building, you can run the project in production mode:

    ```bash
    pnpm start
    ```
