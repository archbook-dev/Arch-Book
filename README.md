# ArchBook website

A responsive static storefront concept for six ArchBook laptop models, with a configurable Arch-based Linux selection, hardware options, colour finishes, a checkout review page, and a copyable enquiry summary.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this ZIP directly to the repository root, including both `archlinux-mark-black.svg` and `archlinux-mark-white.svg`. There is no `assets` folder.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

No build step, package manager, or backend is required.

## Before publishing

- In `index.html`, the order flow uses `orders.archbook@outlook.com`. Update this address in `index.html` and `script.js` if it changes.
- Prices are concept pricing in AUD. The base price of ArchBook One is A$599; other models and upgrades have illustrative prices.
- Non-AUD prices use a fixed indicative FX snapshot dated 16 October 2026, not a live rate feed. Change the `FX` object in `script.js` to refresh it. The AUD price is the base price.
- The checkout-page Purchase button remains disabled. The code `DHBXBC` opens the order summary and copyable enquiry text. The separate Purchase button on that order summary opens a thank-you / order-request screen and prepares an email to `orders.archbook@outlook.com`; it does not process payment or create a confirmed order.
- The operating-system catalog includes current, specialist and historical projects. It is not a claim that every entry is actively maintained or compatible with every laptop. Verify project status, licensing and hardware support before offering installation.
- Product names, prices, specs and configurations are concept details and are not connected to inventory, payment processing or an actual manufacturing system.

## Linux distribution and trademark note

ArchBook is an independent concept. Names and related marks belong to their respective owners. Some catalog entries are historical, specialist, architecture-specific or installer/rescue projects rather than currently maintained general-purpose laptop distributions; these are labelled where known.


- The official Arch Linux monochrome logo mark is included as two SVG files in the repository root: black for the top navigation and footer, white for laptop product renderings. Read `THIRD-PARTY-NOTICES.md` before reusing the mark. Arch Linux retains its trademark and ownership rights.
