# Denga Sense  
A modern, accessible, and AI-powered weather dashboard built with Next.js 14 (App Router), TypeScript, and React.  
Denga Sense combines **real-time weather data** with **AI-driven insights** to make forecasts feel more personal and practical.  
It’s designed to be **fast, intuitive, and inclusive**—balancing developer best practices with a smooth, human-friendly experience.  

## Motivation & Background  
This project was created as part of the **Frontend Mentor Hackathon**, but also as a way for me to push beyond just building “another weather app.”  

I wanted to explore:  
- How AI can enhance simple data into **useful stories and suggestions**.  
- How accessibility and performance can coexist with sleek UI.  
- How to design a dashboard that feels less like a utility and more like a **companion**.  

The experience was equal parts technical challenge and creative exploration—refining APIs, caching strategies, and state management, while also thinking about **UX, mood, and connection**. It taught me how small design choices (like insights phrasing or background animations) can change how people interact with data. 
 
## Frontend Mentor Hackathon Submission
This project was built for the [Frontend Mentor #FM30Hackathon](https://www.frontendmentor.io/challenges/weather-app-hackathon) challenge.  
- 🌐 Solution link: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/denga-sense-weather-dashboard-xxxxxx)  
- 🚀 Live site: [denga-sense.victorkevz.com](https://denga-sense.victorkevz.com)

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Accessibility & SEO](#accessibility--seo)
- [AI & Insights](#ai--insights)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Weather Data**: Real-time weather from Open-Meteo API with caching and freshness checks.
- **AI Insights & Recommendations**: Vercel AI SDK + Groq for personalized summaries, activity ideas, and smart place suggestions.
- **Favorites & Places**: Save, manage, and explore favorite and recently searched locations.
- **Accessibility**: Semantic HTML, ARIA patterns, keyboard navigation, and screen reader support throughout.
- **SEO Optimized**: Dynamic metadata, semantic structure, alt text, and best practices.
- **Customizable Themes & Units**: Light/dark mode, metric/imperial toggles, and localization options.
- **Responsive Design**: Mobile-first, adaptive layouts, and polished UI.
- **Hackathon Requirements**: Covers all core features (search, current weather, 7-day & hourly forecast, units toggle, responsiveness).

## Bonus Features
- Geolocation detection for automatic local weather
- Saved & favorite places management
- AI-powered insights and smart recommendations
- Animated weather backgrounds
- Light/Dark mode themes

## Demo
[DengaSense Website](https://denga-sense.victorkevz.com/)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
$ git clone https://github.com/VictorKevz/denga-sense.git
$ cd denga-sense

# Install dependencies
$ npm install
# or
yarn install
```

### Environment Variables
Create a `.env.local` file in the root directory and add your API keys:
```env
```

### Running the App
```bash
# Start the development server
$ npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
```
📦app
 ┣ 📂api
 ┃ ┣ 📂insights
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂places
 ┃ ┃ ┗ 📜route.ts
 ┃ ┗ 📂weather
 ┃ ┃ ┗ 📜route.ts
 ┣ 📂components
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜ErroUI.tsx
 ┃ ┃ ┗ 📜LoadingGrid.tsx
 ┃ ┣ 📜DailyForecastCard.tsx
 ┃ ┣ 📜DropDown.tsx
 ┃ ┣ 📜HourlyForecastCard.tsx
 ┃ ┣ 📜MetricCard.tsx
 ┃ ┣ 📜Navbar.tsx
 ┃ ┣ 📜SearchBar.tsx
 ┃ ┣ 📜ThemeButton.tsx
 ┃ ┣ 📜VideoBackground.tsx
 ┃ ┣ 📜WeatherIcon.tsx
 ┃ ┗ 📜WeatherOverviewCard.tsx
 ┣ 📂context
 ┃ ┣ 📜PlacesContext.tsx
 ┃ ┣ 📜SettingsContext.tsx
 ┃ ┗ 📜WeatherContext.tsx
 ┣ 📂dashboard
 ┃ ┣ 📂insights
 ┃ ┃ ┣ 📜InsightsView.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂places
 ┃ ┃ ┣ 📜PlacePreviewCard.tsx
 ┃ ┃ ┣ 📜PlacesManager.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂settings
 ┃ ┃ ┣ 📜AppearanceManager.tsx
 ┃ ┃ ┣ 📜LocalizationManager.tsx
 ┃ ┃ ┣ 📜SettingsSelector.tsx
 ┃ ┃ ┣ 📜UnitsManager.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂weather
 ┃ ┃ ┣ 📜WeatherView.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜layout.tsx
 ┣ 📂data
 ┃ ┣ 📜backgrounds.ts
 ┃ ┗ 📜weatherIcons.ts
 ┣ 📂hooks
 ┃ ┣ 📜useInsights.tsx
 ┃ ┣ 📜useRecommendedPlaces.tsx
 ┃ ┗ 📜useWeatherData.tsx
 ┣ 📂lib
 ┃ ┗ 📜weather.ts
 ┣ 📂types
 ┃ ┣ 📜insights.ts
 ┃ ┣ 📜settings.ts
 ┃ ┗ 📜weather.ts
 ┣ 📂utils
 ┃ ┗ 📜formatters.ts
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┣ 📜page.tsx
 ┗ 📜variants.ts
```
## Core Concepts

### State Management
- **React Context API** for weather, places, and settings state.
- **Custom Hooks** for fetching, caching, and updating data.
- **LocalStorage** for client-side caching and persistence.

### Data Fetching & Caching
- **Server-side API routes** for weather, places, and insights.
- **Staleness checks** to avoid unnecessary requests.
- **Hydration** of state on SSR/CSR boundaries.

### Weather & Places
- **Weather Data**: Fetched from OpenWeatherMap (or similar), normalized and cached.
- **Places**: Search, preview, and favorite locations using Nominatim and custom logic.

### AI-Powered Insights
- **Vercel AI SDK + Groq**: Generate personalized recommendations and insights based on weather and user preferences.
- **API Route**: `/api/insights` for AI-powered suggestions.

## Accessibility & SEO
- **Semantic HTML**: Proper use of `<main>`, `<section>`, `<header>`, `<nav>`, and heading levels.
- **ARIA Roles & Attributes**: Combobox pattern in SearchBar, aria-labels, aria-pressed, aria-activedescendant, etc.
- **Screen Reader Support**: `sr-only` classes, descriptive labels, and focus management.
- **Keyboard Navigation**: Full support for tab, arrow keys, and enter/escape in interactive components.
- **SEO**: Dynamic metadata via Next.js metadata API, descriptive alt text, and logical content structure.

## AI & Insights
- **/api/insights**: Serverless route for generating recommendations using Vercel AI SDK and Groq.
- **useInsights Hook**: Fetches and caches AI-generated insights for the current weather and location.
- **Personalization**: Recommendations adapt to user preferences, weather, and favorites.

## Customization
- **Themes**: Light/dark mode toggle via `ThemeButton` and `SettingsContext`.
- **Units**: Metric/imperial toggle via `UnitsManager` and `SettingsContext`.
- **Localization**: Support for different locales and units.
- **Favorites**: Add/remove favorite places, managed in `PlacesContext`.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -m 'Add feature' && git push`)
5. Open a Pull Request

### Code Style
- Follow the existing ESLint and Prettier rules.
- Use TypeScript and strict types.
- Write accessible, semantic, and well-documented code.

## License
[MIT](LICENSE)


## Credits
- Frontend Mentor (FEM): [https://www.frontendmentor.io](https://www.frontendmentor.io)
- Weather data: [OpenWeatherMap](https://openweathermap.org/) or your provider
- Place search: [Nominatim](https://nominatim.org/)
- AI: [Vercel AI SDK](https://sdk.vercel.ai/), [Groq](https://groq.com/)


## Contact
For questions, suggestions, or support, open an issue or contact [VictorKevz](https://github.com/VictorKevz).
