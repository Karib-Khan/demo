# Responsive update

- New collapsible navigation for mobile/tablet; the header no longer forces the full logo text and phone number into a narrow row.
- Layout and palette demo controls scroll horizontally on small screens rather than stretching the page.
- Global RTL/LTR overflow protection, fluid mobile typography, tighter mobile spacing, and responsive media/forms.
- Safer mobile sticky Call/WhatsApp bar and vertically scrollable image modal.
- esbuild dependency updated to match Vite 8 peer range for npm deployments.

## Build and deploy

Install dependencies with your preferred package manager and run `npm run build` (or `bun run build`). Deploy the generated `dist` directory to Render as a Static Site. To avoid duplicate lockfile workflows, use one package manager consistently.

## Important demo limitation

The quotation form currently displays an in-browser confirmation but does not send lead details to a server. It offers a WhatsApp handoff. A production lead-management backend is a separate integration and must be completed before treating form submissions as received.

This update was syntax-checked locally, but a full production build / visual cross-device browser QA could not be run in the current environment because package installation stalled.
