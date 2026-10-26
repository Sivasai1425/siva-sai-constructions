# Deployment notes

## Vercel
Import the GitHub repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

## Netlify
Build command: `npm run build`; publish directory: `dist`. For client-side routing, add a `_redirects` file in `public/` containing:
```
/* /index.html 200
```

## Lead forms
The included form is client-side only. To receive enquiries, connect the submit handler in `src/components/LeadForm.jsx` to a secure server endpoint, CRM or form provider. Never place private API keys in client-side source code.
