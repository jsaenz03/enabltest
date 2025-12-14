<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based nursing workflow management dashboard designed for mobile-first responsive design. The application serves as a comprehensive management system for nursing operations including client management, staff coordination, appointments, incidents, invoices, and messaging.

**Technology Stack:**
- React 18.2.0 with Create React App (react-scripts 5.0.1)
- Tailwind CSS (via CDN) for styling
- Lucide React icons (0.344.0)
- Mobile-first responsive design (max-width container)

## Development Commands

### Basic Commands
- `npm start` - Start development server (default port 3000)
- `npm run build` - Build for production
- `npm test` - Run tests in watch mode
- `npm run eject` - Eject from Create React App (irreversible)

### Development Workflow
- Development server supports hot reload
- Build process optimized for Create React App configuration
- ESLint configured with react-app preset

## Architecture

### Core Application Structure
The application follows a single-page application (SPA) pattern with tab-based navigation:

**App.js (Root Component)**
- Central state management for active tab, dark mode, and notifications
- Notification system with 3-second auto-dismiss
- Conditional rendering of views based on active tab
- Dark mode support with CSS classes and Tailwind integration

**Navigation System**
- Bottom navigation bar with 4 primary tabs: Home (Dashboard), Clients, Staff, Settings
- Additional views accessible through interface elements
- Mobile-optimized touch targets and responsive layout

### View Architecture
**Primary Views (in src/views/):**
- `DashboardView` - Overview with stats, appointments, and activity
- `ClientsView` - Client management and records
- `StaffView` - Staff coordination and management
- `SettingsView` - App configuration and dark mode toggle
- `InvoicesView` - Invoice management and tracking
- `IncidentsView` - Incident reporting and resolution
- `AppointmentsView` - Scheduling and calendar management
- `MessagesView` - Internal communication system
- `StorageView` - Inventory and supply management
- `ProfileView` - User profile management
- `TasksView` - Task assignment and tracking
- `SBARView` - SBAR (Situation, Background, Assessment, Recommendation) documentation
- `ChatView` - Real-time messaging interface

### Component Architecture
**Components (in src/components/):**
- `Navigation.js` - Bottom navigation with icon-based tabs and active state styling

### Styling Architecture
**Tailwind CSS Integration:**
- Custom Tailwind config in `public/index.html`
- Dark mode support via 'class' strategy
- Responsive breakpoints optimized for mobile-first design
- CSS animations defined in `src/index.css` (fadeIn, slideDown)
- Design system uses slate color palette for consistency

### State Management
- Local component state with React hooks (useState, useEffect)
- Parent-child prop drilling for view communication
- Global app state managed in App.js (dark mode, active tab, notifications)
- No external state management library (Redux, Context API, etc.)

### Mobile-First Design Patterns
- Max-width container (max-w-md) centered on larger screens
- Touch-friendly UI elements with appropriate sizing
- Bottom navigation for easy thumb access
- Viewport optimization with `h-[100dvh]` for full-screen mobile experience
- Responsive grid layouts that adapt from mobile to desktop

### Key Design Decisions
- Lucide React for consistent iconography
- Tailwind via CDN for rapid development
- Single-file component structure (no TypeScript)
- Inline notification system for user feedback
- CSS custom animations for smooth transitions
- Dark mode support with comprehensive theme switching

### File Organization
```
src/
├── components/     # Reusable UI components
├── views/         # Main application views/pages
├── App.js         # Root component with app state
├── index.js       # React entry point
└── index.css      # Global styles and animations
```

## Development Notes

### Code Patterns
- Functional components with hooks throughout
- Props-based communication between components
- Consistent use of Tailwind CSS classes for styling
- Lucide React icons imported as needed per component
- Dark mode classes applied using conditional rendering

### Styling Conventions
- Slate color palette for UI consistency
- Consistent spacing using Tailwind's spacing scale
- Responsive design with mobile-first approach
- Custom animations for transitions and notifications
- Dark mode variants provided throughout the interface

### Component Naming
- PascalCase for component files
- Descriptive names ending with 'View' for main views
- Clear prop naming (showNotification, darkMode, setDarkMode)