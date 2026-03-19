<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ab8f7fa2-fd3a-4da2-ae31-0646bb9b5220

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Configure environment variables in `.env`:
   - `VITE_PRIVY_APP_ID` (required for auth UI)
   - `PRIVY_APP_SECRET` (required for backend token verification)
   - `FIREWORKS_API_KEY` (required for **server-side** Portfolio URL analysis)
   - Optional existing flows: `VITE_FIREWORKS_API_KEY` (for current client-side AI helpers)
3. Run the app:
   `npm run dev`

## Portfolio URL Builder (v1)

- Supports public `http/https` portfolio website URLs.
- AI analysis is executed on the backend (`/api/portfolio/analyze`) for better key security.
- Private/local network URLs are blocked.
