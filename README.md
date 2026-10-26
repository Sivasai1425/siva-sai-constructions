# Siva Sai Constructions

A responsive React + Tailwind CSS real estate and construction website for **Siva Sai Constructions — We Build Your Dreams**.

## Included

- Responsive Home, Properties, Property Detail, About, Services and Contact pages
- Search and filters for location, property type, budget and bedrooms
- Sample properties with architectural photography
- Enquiry and contact lead forms with validation and success states
- Construction packages: ₹1,850, ₹2,150, ₹2,450 and ₹2,850 per sq. ft.
- Construction estimate calculator
- Separate Vastu-oriented floor-plan generator brief builder
- Mobile navigation, reusable cards and shared layout components
- WhatsApp enquiry shortcut
- GitHub-ready source and Vite build

> **Important:** This is a front-end starter. Enquiries currently show a success message in the browser and are not saved to a database or sent to an inbox. Connect a backend, CRM, email service or form provider before publishing for live lead capture. Property listings and prices are demonstration data and should be verified before going live.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this ZIP and open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Publish to GitHub

Create an empty repository on GitHub, then run from this project directory:

```bash
git init
git add .
git commit -m "Build Siva Sai Constructions website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository URL.

## Before launch

- Update phone number, WhatsApp number, email, office address and social links in `src/data/site.js`.
- Verify property details, prices, availability and images/usage rights.
- Connect forms in `src/components/LeadForm.jsx` to a backend or CRM.
- Add a privacy policy and consent text for lead collection.
- Have local planning rules, setbacks and construction rates reviewed before using generated estimates as formal quotations.

## Construction package rates

The package cards are editable in `src/data/site.js`. The requested ₹1,850 / ₹2,150 / ₹2,450 / ₹2,850 per sq. ft. tiers are used as configurable sample rates. Confirm final inclusions and commercial terms before making them public.
