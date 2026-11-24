# Vaishnavi Darla · Portfolio

A static React portfolio for Vaishnavi Darla, Senior Agentic AI Engineer. It includes selected work, a career timeline, technical skills, education, and contact links. The site uses Vite, Tailwind CSS, Lucide, and locally bundled fonts.
Use the sun or moon button in the header to switch themes. The site starts with your system theme and remembers your selection. Animations follow your reduced-motion preference.

## Run locally

Use Node.js 24 (the version used by CI) and npm.

```sh
npm ci
npm run dev
```

Open <http://localhost:5173/my-portfolio/>. In a cloud workspace, use `npm run dev -- --host 0.0.0.0` and open port 5173 with the `/my-portfolio/` path.

## Check the production build

```sh
npm run lint
npm run build
npm run preview
```

Open <http://localhost:4173/my-portfolio/> to review the built site. Production files are written to `dist/`. Edit `src/content.js` to update case studies, work history, skills, and contact details.

## Publish on GitHub Pages

1. Review the portfolio and approve the pull request.
2. In the GitHub repository, open **Settings → Pages**, and set **Build and deployment → Source** to **GitHub Actions**. This requires repository admin access. Confirm that repository or organization settings allow the workflow's actions and its Pages and OIDC permissions.
3. Merge into `main` to trigger **Deploy portfolio to GitHub Pages**. If the portfolio is already on `main`, run the workflow there manually from the **Actions** tab.
4. Check the workflow’s deploy job. If the `github-pages` environment requires approval, an authorized reviewer must approve the deployment.
5. Open <https://vaishnavi-2708.github.io/my-portfolio/> and verify the page, case studies, and contact links.

The Vite base path is `/my-portfolio/`. If you rename the repository, update the base in `vite.config.js` and the canonical and Open Graph URLs in `index.html`.
