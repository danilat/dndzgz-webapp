# DNDzgz

> 🚌 Citizen transport services in Zaragoza

A progressive web application to check real-time information about public transport in Zaragoza, Spain. Built with [Quasar Framework](https://quasar.dev/) and Vue 3.

## Features

- 🚍 **Bus** - Real-time bus stop estimations and map
- 🚲 **Bizi** - Bike sharing stations with availability info
- 🚊 **Tram** - Tram stop estimations and route map
- 🚕 **Taxi** - Taxi stand locations
- ⭐ **Favorites** - Save your frequent stops for quick access
- 📍 **Geolocation** - Automatically centers maps on your location (within Zaragoza area)

## Requirements

- Node.js >= 20
- npm >= 6.13.4

## Setup

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file with:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Development

### Start the dev server

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Lint files

```bash
npm run lint
```

### Format code

```bash
npm run format
```

## Production

### Build for production

```bash
npm run build
```

### Deploy to Netlify

```bash
npm run deploy
```

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) + [Quasar v2](https://quasar.dev/)
- **Maps**: [vue3-google-map](https://github.com/inocan-group/vue3-google-map)
- **Testing**: [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/)
- **Hosting**: [Netlify](https://www.netlify.com/)

## Author

**Dani Latorre** - [dani@danilat.com](mailto:dani@danilat.com)
