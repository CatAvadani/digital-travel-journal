# Digital Travel Journal

Digital Travel Journal is a modern, interactive web application designed with a focus on user experience, performance, and accessibility. Inspired by a passion for travel and personal experiences working on cruise ships, its purpose is to transform travel memories into timeless digital stories.

Users can explore new destinations, document their journeys with interactive maps, and turn cherished moments into beautifully designed, shareable postcards. From interactive maps that let you add locations and track your trips, to a fully customizable postcard creator, the app combines functionality with modern design to make capturing travel experiences fun and meaningful. 

<a href="https://digital-travel-journal-wnb8.vercel.app/" target="_blank">View Live Demo</a>

## Preview

<div align="left">
  <img src="public/landing-page.png" alt="Landing page with 3D globe" width="200"/>
    <img src="public/map-view.png" alt="Interactive Map View" width="200"/>
</div>
<div align="left">
  <img src="public/postcard-creator.png" alt="Postcard Creator" width="200" height="220"/>
  <img src="public/trip-details.png" alt="Trip Details View" width="200" height="220"/>
</div>

## Features ✨

### Core Functionality

- **Interactive Map Integration**

  - Real-time location tracking
  - Custom marker placement
  - Location search functionality
  - Detailed location information 
  - Trip photo geo-tagging
  - Offline functionality

- **Weather Integration**
  
  - Real-time weather data for selected locations

- **Custom Postcard Creator**

  - Multiple design templates
  - Personal message integration
  - CSS filters for tone adjustments

- **User Experience**
  
  - Secure authentication system (Firebase)
  - Personalized dashboard
  - Smooth animations and transitions

## Technologies

### Frontend
  
- **Next.js 15** - Modern React framework (server-side rendering)
- **TypeScript** - Type safe development
- **Tailwind CSS/SCSS** - For styling and responsivness
- **Framer Motion** - Smooth animations

### Backend && Database
  
- **Firebase**
  - Authentication
  - Firestore Database
  - Storage
    
### APIs

- **Mapbox API** - Interactive map
- **Weather API** - Real-time weather data
- **Unsplash API** - Images
  
### State Management
  
- **Zustand** - Lightweight state management solution

## Tech Stack Motivation

1. **Next.js**: Improved performance compare with other React solutions, including its SSR capabilities and support modern routing and SEO.
2. **TypeScript**: Adds strong typing for fewer bugs and clearer code, scalability.
3. **Firebase**: Quick setup for authentication and database storage.
4. **Mapbox**: Offers interactive map functionalities with great documentation.

## Accessibility

The application follows WCAG 2.1 A and AA standards:

  - Semantic HTML 
  - ARIA labels for accessibility
  - Keyboard navigation 
  - Color contrast for text readability
  - Screen reader compatibility

## Design

The design is inspired by Glassmorphism and modern trends:

 - Clean, dark theme with purple/pink accents
 - Consistent visual hierarchy
 - Responsive layouts for desktop and mobile devices
 - Smooth transitions and engaging UI interactions

## Checklist: Requirements for G & VG  

### Planning & Research
- ✅ **Target Audience Analysis**: Conducted a detailed analysis, identifying user needs and pain points through research and interviews with travelers.
- ✅ **Project Management Tool**: Used GitHub Projects for backlog management.

### Design & Prototyping
- ✅ **Wireframes and Prototypes**: Created wireframes and interactive prototypes in Figma, adhering to UX/UI principles.
- ✅ **Responsive Design**: Ensured the application is responsive for at least two screen sizes (mobile and desktop).
- ✅ **WCAG 2.1 Compliance**: Followed Level A/AA standards, incorporating semantic HTML, ARIA labels, keyboard navigation, and sufficient color contrast.

### Application Development
- ✅ **Modern JavaScript Framework**: Built the application using **Next.js** and **TypeScript** for a scalable and maintainable codebase.
- ✅ **Database Integration**: Used **Firebase** for secure storage, authentication, and real-time data retrieval.
- ✅ **State Management**: Implemented **Zustand** for lightweight and efficient state handling.
- ✅ **Dynamic Components**: Created interactive features such as a customizable postcard creator and interactive map functionality.
- ✅ **Accessibility**: Ensured the use of semantic HTML and accessibility features to meet WCAG 2.1 standards.
- ✅ **Responsiveness**: Designed and tested the application to work seamlessly across different devices (mobile and desktop), adapting the layout for user-friendly experiences.

### Optimization 
- ✅ **Performance Optimizations**: 
  - Lazy loading for images and components to improve load times.
  - Code-splitting with Next.js to reduce the initial bundle size.
  - Optimized API requests to minimize data transfer.
- ✅ **Reusable Code**: Developed reusable components and a consistent design system for maintainability.

### CRUD Operations
- ✅ **Secure Implementation**: 
  - Used Firebase for CRUD (Create, Read, Update, Delete) operations with strict authentication and security rules.
  - Ensured only authorized users can manage travel entries, protecting user data.

### Deployment & Version Control
- ✅ **Version Control with Git**: 
  - Maintained a GitHub repository with clear commit messages, feature branches, and pull requests for development.
- ✅ **Hosting on Vercel**: Deployed the application on Vercel with an automated CI/CD pipeline, ensuring a smooth and reliable deployment process.

### Final Submission
- ✅ **README File**: Included all required sections:
  - Tech stack and motivations for tool choices.
  - Installation and setup instructions.
  - Overview of features and technologies used.
- ✅ **Slutrapport**: A detailed report covering:
  - Planning and research.
  - Design and prototyping.
  - Development process and optimizations.
  - Reflections on challenges, solutions, and lessons learned.

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

## Credits & Attributions

### Media Assets
- Landing page video licensed from Vecteezy.com
  - Created by: motionlantern
  - License Type: Pro License
  - Licensed On: 2024-11-21

## What I Learned

This project gave me valuable hands-on experience with modern web development tools, including: Next.js for building a performant, server-side rendered application,
Firebase for authentication and data storage, Mapbox API for integrating interactive map features, and Zustand for efficient state management.

Additionally, I gained deeper insights into:
 - Applying responsive design principles to ensure a seamless experience across devices.
 - Following WCAG 2.1 accessibility standards to make the app usable for everyone.
 - Managing the entire development lifecycle, from planning and prototyping to deployment.
Beyond technical skills, I learned the importance of adaptability, problem-solving, and attention to detail. This project has strengthened my confidence as a developer and reinforced my belief in continuous growth.

