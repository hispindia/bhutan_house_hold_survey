# Bhutan Household Survey PWA

A Progressive Web Application (PWA) for household surveys in Bhutan, built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [Vite Plugin PWA](https://github.com/antfu/vite-plugin-pwa), and [Workbox](https://developers.google.com/web/tools/workbox).

## Prerequisites

- Node.js (v14 or higher)
- pnpm (v6 or higher)

## Installation

```bash
# Install dependencies using pnpm
pnpm install
```

## Available Scripts

### Development
- `pnpm dev` - Run the development server to develop your PWA
- `pnpm preview` - Preview your production build locally

### Build
- `pnpm build` - Create a production build of your site (auto-bumps patch version)
  - Automatically runs version bump before build
  - Output directory: `dist/`
  - Creates `pwa_dhis2.zip` file after build

### Version Management
- `pnpm run bump:patch` - Bump patch version (0.0.1 → 0.0.2) for bug fixes
- `pnpm run bump:minor` - Bump minor version (0.0.1 → 0.1.0) for new features
- `pnpm run bump:major` - Bump major version (0.0.1 → 1.0.0) for breaking changes

### Assets
- `pnpm run generate-pwa-assets` - Generate PWA assets from logo

## Current Version
**v0.0.4**

## Technology Stack

### Core
- **React 18.2.0** - UI framework
- **Vite 3.2.5** - Build tool and dev server
- **Redux 4.0.5** - State management
- **Redux Saga 1.1.3** - Side effects management
- **React Router 5.2.0** - Navigation and routing

### UI Components
- **Ant Design 5.17.0** - Primary UI component library
- **Material-UI 4.11.4** - Additional UI components
- **React Bootstrap 2.9.2** - Bootstrap components

### Data & Storage
- **Dexie 3.2.5** - IndexedDB wrapper for offline storage
- **XLSX 0.18.5** - Excel file handling
- **Axios 1.2.2** - HTTP client

### Maps & Charts
- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 4** - React bindings for Leaflet
- **Chart.js 2.9.3** - Data visualization
- **Highcharts 8.2.0** - Advanced charting

### Utilities
- **Moment.js 2.27.0** / **Day.js 1.11.13** - Date manipulation
- **Lodash 4.17.20** - Utility functions
- **i18next 19.6.3** - Internationalization

### PWA Features
- **Workbox** - Service worker and offline capabilities
- **Vite Plugin PWA 0.19.7** - PWA integration

## Project Structure

```
bhtan_house_hold_survey/
├── public/              # Static assets
├── src/
│   ├── api/            # API integrations
│   ├── components/     # Reusable UI components
│   ├── containers/     # Container components
│   ├── hooks/          # Custom React hooks
│   ├── indexDB/        # IndexedDB managers and schemas
│   ├── redux/          # Redux store, actions, reducers, sagas
│   ├── utils/          # Utility functions
│   └── main.jsx        # Application entry point
├── scripts/            # Build and utility scripts
├── dist/               # Production build output
└── package.json        # Project dependencies and scripts
```

## Building for Production

```bash
# Build the application (includes version bump)
pnpm build

# The build process will:
# 1. Automatically bump the patch version
# 2. Build the application
# 3. Create a zip file (pwa_dhis2.zip) in the dist folder
```

## Offline Capabilities

This PWA includes comprehensive offline support:
- **IndexedDB Storage** - Local data persistence using Dexie
- **Service Worker** - Automatic caching and offline functionality
- **Data Sync** - Import/export Excel files for data transfer
- **Progressive Enhancement** - Works online and offline

## Learn More

- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [DHIS2 Documentation](https://docs.dhis2.org/)

