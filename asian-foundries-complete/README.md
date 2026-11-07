# Asian Foundries Private Limited — Complete Website

Premium industrial-luxury corporate website built with React, Vite, React Router, Three.js / React Three Fiber, GSAP and responsive CSS.

## Included

- Eight complete routes: Home, Company, Products, Applications, Manufacturing, Quality, Infrastructure and Contact.
- Responsive desktop, tablet and mobile navigation.
- Real photographs and product-category artwork extracted from the Asian Foundries brochure supplied for this project.
- Horizontal, swipeable product catalogue.
- Interactive procedural 3D casting study: orbit/rotation, zoom, auto-rotate and exploded presentation.
- Company profile, facilities, manufacturing process, quality and enquiry content.
- Contact enquiry form that prepares an email to `info@asianfoundries.com` in the visitor's configured email application. The site does not store or transmit enquiries to a server.
- Vercel SPA rewrite configuration, metadata and reduced-motion support.

## Run the website

Requirements: Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy to Vercel

1. Upload/import this complete folder into a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. `vercel.json` already includes SPA route rewrites so all eight pages work when opened directly or refreshed.
5. Add the company's domain in Vercel and update DNS at the domain registrar if required.

No environment variables or database are required for this front-end build.

## Important content and accuracy notes

- Company facts and facility specifications shown on the site are transcribed from the seven-page Asian Foundries brochure provided in this project. Confirm that figures and certification status are current before using them in formal customer or tender submissions.
- The brochure states: established 2016; ISO 9001:2015; 2,000+ MT annual capacity; 16,000 sq ft manufacturing area; 750 KVA medium-frequency induction furnace; 1-tonne dual-track crucible furnace; 600 MT/month melting capacity; moulding capacity 1,200 moulds/day/machine; 60 TPH sand plant; moulding casting weight range 0.1–30 kg/pc; sand plant casting weight up to 40 kg/pc.
- The Products page's six families follow the brochure's product range: Truck spares, Tractor spares, Industrial castings, Automotive spares, Hub & rear covers and Elevator spares.
- The interactive 3D viewer contains a procedural conceptual casting model. It is not a certified or measured Asian Foundries production part. Replace it with a customer-approved CAD-derived GLB/GLTF model when exact geometry is available.
- No unverified heat resistance, pressure rating, tensile strength, hardness, dimensional tolerance, customer name or customer approval is claimed.
- Images in `public/images/` are the brochure visuals supplied by the user. The product-family images are crops of the brochure's product range page.
- The brochure itself contains some inconsistencies between its pages; this website uses the figures from the supplied brochure's corresponding facility sections. Please have the company confirm all current facts before public launch.

## Contact form behaviour

The contact form opens the visitor's default email application with a prefilled message addressed to `info@asianfoundries.com`. It does not silently claim to submit or store a message. To enable server-side form delivery, CRM integration, spam filtering or enquiry tracking, a separately configured backend/service would be needed.

## Main file structure

```text
asian-foundries-complete/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
├── README.md
├── public/
│   └── images/                 # brochure photographs and product imagery
└── src/
    ├── main.jsx
    ├── App.jsx                 # all 8 page routes and shared site sections
    ├── styles.css              # full responsive visual system
    └── components/
        └── CastingViewer.jsx   # interactive Three.js casting study
```
