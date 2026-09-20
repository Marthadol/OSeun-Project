# O’Seun Foods — Next.js source project

An editable frontend built with standard Next.js App Router, React, TypeScript and Tailwind CSS. This copy runs independently from the earlier hosted Sites preview. That existing preview has not been updated by this source delivery.

## Start on Windows 11

1. Install Node.js LTS (22.13 or newer) from https://nodejs.org and VS Code from https://code.visualstudio.com.
2. Extract this ZIP using **Extract All**. Open the `oseun-nextjs` folder in VS Code. Make sure this is the folder containing `package.json`.
3. Open **Terminal → New Terminal**. Select **Command Prompt** from the terminal profile menu if PowerShell blocks `npm.ps1`; no security-policy changes are needed.
4. Run:

```cmd
npm ci
npm run dev
```

5. Open http://localhost:3000 in Edge or Chrome. Keep the terminal running; use Ctrl+C to stop.
6. Edit files and save to see changes. If port 3000 is occupied, use the address printed in the terminal.

No database, API key, payment account or environment file is required for this demo.

## Included

- Customer menu, search and filters, portion controls, extras, cart and checkout preview.
- Rice starts at two portions; each additional portion increases quantity by one.
- Jollof is ₦1,500 per portion. Two portions cost ₦3,000 plus the agreed flat demo delivery fee of ₦1,500, total ₦4,500.
- Selected rice extras are charged **per portion**. Two rice portions plus plantain at ₦1,000 per portion cost ₦5,000 plus delivery, total ₦6,500.
- Gift-card design/amount preview. No gift card is issued or redeemed.
- Six actor entry points: customer, admin/restaurant owner, staff, company, rider and logistics agency.
- Interactive sample inventory quantities, reorder indicators and in-memory stock movement display.
- Sample menu availability switches. These do not yet alter customer ordering.
- Responsive CSS for phone, tablet and desktop sizes.

## Routes

| URL path                      | Purpose                    |
| ----------------------------- | -------------------------- |
| `/`                           | Customer ordering UI       |
| `/workspaces`                 | Six actor entry points     |
| `/workspaces/admin`           | Admin/owner starter        |
| `/workspaces/staff`           | Staff starter              |
| `/workspaces/staff/inventory` | Interactive inventory demo |
| `/workspaces/staff/menu`      | Menu availability demo     |
| `/workspaces/company`         | Company starter            |
| `/workspaces/rider`           | Rider starter              |
| `/workspaces/logistics`       | Logistics agency starter   |

## Where to edit

- `components/customer/storefront.tsx`: customer UI and cart state.
- `lib/menu.ts`: sample menu, prices, extras and line totals.
- `app/globals.css`: theme and responsive styling.
- `public/oseun-logo.jpeg`: your original supplied logo, unchanged. `components/brand.tsx` displays it with CSS framing to reduce its white margins.
- `lib/roles.ts`: starter actor capabilities.
- `components/inventory-demo.tsx`: inventory sample data and interactions.
- `components/menu-management.tsx`: menu availability demo.
- `app/workspaces/`: dashboard routes to extend.
- `docs/IMPLEMENTATION.md`: backend integration plan and entity relationships.

Brand UI colours: red #C80019, orange #F39800, black #222222 and white #FFFFFF. These are approximations from the JPEG, not certified original brand colour codes. Orange is used for accents with dark text. The food photograph is an illustrative generated serving image carried over from the preview; replace it with actual menu photography before launch.

## Commands

```cmd
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves a completed production build; run `npm run build` first. Normal editing uses `npm run dev`. The build uses the standard Next.js webpack option for portability.

## Backend boundary

This is a frontend starter, not a production restaurant system. Workspace routes are public demo pages and are NOT access controls. Data and changes remain in React memory and reset on reload/navigation. Checkout does not submit data or collect payment. Use fictional details for testing.

Before production, implement server-verified sessions and role/organization permissions, database persistence, transaction-safe stock changes, pricing calculated on the server, payment verification and gift-card accounting. Admin and owner may share permissions but must use separate named accounts. Company representatives and logistics users must have individual accounts linked to their organization.

No claim of Nigerian data-protection compliance is made by this UI. Production needs a reviewed privacy/data-retention design, access controls and appropriate processing arrangements. Never put secret keys in frontend code or `NEXT_PUBLIC_` variables.

## Hosting your copy

Push this project to your own private GitHub repository, then import that repository into your selected Next.js hosting provider. For Vercel, select the Next.js framework and use the default install/build detection. Review its current commercial-use plan terms before running a restaurant business on it. Do not commit `.env.local`, `node_modules` or `.next`.

Official setup reference: https://nextjs.org/docs/app/getting-started/installation
