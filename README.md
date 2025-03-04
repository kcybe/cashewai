# CashewAI

CashewAI is an artificial intelligence-powered assistant that simplifies the management of finances through the Cashew App.

## What Problem Does CashewAI Solve?

Tracking receipts and managing expenses can be tedious and time-consuming. CashewAI simplifies the process by:

- Scanning receipt photos automatically and sorting them
- Translating free-form natural language transaction descriptions into structured data
- Seamlessly integrating into the Cashew App with native app links
- Removing manual input for tracking finances

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd cashewai
    ```

2.  **Set up your environment variables:**

    - Create a `.env` file in the root directory of the project.
    - Add your OpenRouter API key to the `.env` file:

      ```
      OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
      ```

    _Note: Replace `YOUR_OPENROUTER_API_KEY` with your actual API key from OpenRouter._

3.  **Install dependencies:**

    ```bash
    npm install # or yarn install, pnpm install, bun install
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

Upload receipts or describe your transactions in your own words, and our AI assistant will:

1.  Extract relevant transaction data for you
2.  Categorize expenses automatically
3.  Generate transaction links for the Cashew App
4.  Make it easy to track finances

## Features

- **AI-Powered Processing**: Automatically extract and categorize expense data
- **Natural Language Support**: Describe transactions in your own words
- **Cashew App Integration**: Seamless integration with pre-installed app links
- **User-Friendly Interface**: Sleek, responsive interface for all devices

## Technologies

This project is built with [Next.js](https://nextjs.org), using [Turbopack](https://turbo.build/pack) for enhanced development experience, and leverages the latest React features.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
