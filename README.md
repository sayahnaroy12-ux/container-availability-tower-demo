<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/64ee825e-407f-4749-a432-9010cafa3826

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Public demo

The public demo is deployed from the `main` branch to GitHub Pages:

https://arunshankar07.github.io/container-availability-tower-demo/

The demo contains seeded sample data and local browser-based authentication. It is not connected to Maersk systems or live carrier data and must not be used for real shipment operations.

GitHub Actions runs type validation and builds the site on each push to `main`, then publishes the `dist` directory to GitHub Pages.
