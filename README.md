# Digital Travel Journal 🌎

A web application that transforms travel experiences into digital memories. Built with modern web technologies, this application allows users to document their journeys through an interactive map interface, create custom digital postcards, and manage their travel memories in an intuitive way.

  <a href="https://digital-travel-journal-wnb8.vercel.app/" target="_blank">View Live Demo</a>

  ## Preview

<div align="left">
  <img src="public/landing-page.png" alt="Landing page with 3D globe" width="300"/>
    <img src="public/map-view.png" alt="Interactive Map View" width="300"/>
</div>
<div align="left">
  <img src="public/postcard-creator.png" alt="Postcard Creator" width="300" height="320"/>
  <img src="public/trip-details.png" alt="Trip Details View" width="300" height="320"/>
</div>

## Features ✨

### Core Functionality

- **Interactive Map Integration**

  - Real-time location tracking
  - Custom marker placement
  - Location search functionality
  - Detailed location information with weather data
  - Trip photo geo-tagging
  - Offline functionality

- **Custom Postcard Creator** 

  - Multiple design templates
  - Personal message integration
  - Social media sharing

- **User Experience** 
  - Secure authentication system
  - Personalized dashboard


## Technologies 

- **Next.js 14** 
- **TypeScript**
- **Tailwind CSS**
- **SCSS**
- **Framer Motion** 

- **Firebase**
  - Authentication
  - Firestore Database
  - Storage
- **Zustand** - State management
- **Mapbox API** - Map functionality
- **Weather API** - Real-time weather data
- **Unsplash API** - Images

## Accessibility 

The application follows WCAG 2.1 guidelines:

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## Design  

The application follows a modern, clean design approach:

- Dark theme with carefully chosen purple/pink accents
- Consistent visual hierarchy
- Responsive layouts for all devices
- Attention to accessibility (WCAG 2.1 compliance)
- Smooth transitions and interactions

## Getting Started 

### Installation

1. Clone the repository
```bash
git clone https://github.com/CatAvadani/digital-travel-journal.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_KEY_AUTH=your_api_key
NEXT_PUBLIC_API_KEY_ID=your_api_key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_api_key
NEXT_PUBLIC_API_OPENWEATHERMAP_KEY=your_api_key
```

4. Start development server
```bash
npm run dev
```
## Acknowledgments 

- Built as final project for Frontend Development course
- Inspired by personal experiences from cruise ship work

## Author

**Catalina Avadani**
