# Ticketly - Ticket Management Web Application

A modern, responsive ticket management application built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing tickets with authentication, dashboard analytics, and full CRUD operations.

## 🚀 Features

- **Landing Page** with wavy SVG background and decorative elements
- **Authentication System** with login/signup and session management
- **Dashboard** with ticket statistics and quick navigation
- **Complete CRUD Operations** for ticket management
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Responsive Sidebar** with mobile hamburger menu
- **Form Validation** with real-time error handling
- **Toast Notifications** for user feedback
- **Protected Routes** with session-based authentication

## 📋 Requirements Met

- ✅ Max-width 1440px centered layout
- ✅ Wavy background hero section
- ✅ Decorative circle elements
- ✅ Card-style boxes with shadows and rounded corners
- ✅ Responsive mobile/tablet/desktop layouts
- ✅ Complete authentication with localStorage session management
- ✅ Full ticket CRUD with validation
- ✅ Status-based color coding (green/amber/gray)
- ✅ Accessibility compliance with semantic HTML
- ✅ Error handling for all scenarios

## 🛠️ Technologies Used

### Core Framework

- **React 19.2.0** - Main UI framework
- **TypeScript 5.9.3** - Type safety and developer experience
- **Vite 7.1.12** - Build tool and development server

### Styling & UI Components

- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **shadcn/ui Components** - Pre-built accessible UI components
- **Lucide React 0.546.0** - Icon library
- **Class Variance Authority** - Component variant management

### Routing & Navigation

- **React Router DOM 7.9.4** - Client-side routing and navigation

### Forms & Validation

- **React Hook Form 7.65.0** - Form state management
- **Zod 4.1.12** - Schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### State Management

- **React Context API** - Global state for authentication and tickets
- **localStorage** - Data persistence

### User Experience

- **Sonner 2.0.7** - Toast notifications
- **Next Themes 0.4.6** - Theme management support

### Development Tools

- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation

1. **Clone or download the project**

   ```bash
   cd /path/to/stage2-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components (CreateTicketForm, EditTicketForm)
│   ├── layout/         # Layout components (AppLayout, Sidebar, Footer)
│   └── ui/             # shadcn/ui components and custom UI elements
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   ├── TicketContext.tsx # Ticket data management
│   └── AppProviders.tsx # Combined context providers
├── pages/              # Page components
│   ├── LandingPage.tsx # Marketing/landing page
│   ├── LoginPage.tsx   # User login
│   ├── SignupPage.tsx  # User registration
│   ├── Dashboard.tsx   # Main dashboard
│   └── TicketManagement.tsx # Ticket CRUD interface
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── lib/                # Shared libraries and configurations
```

## 🎨 UI Components Architecture

### Layout Components

- **AppLayout**: Wrapper component that includes sidebar navigation
- **Sidebar**: Responsive navigation with desktop/mobile variants
- **Footer**: Consistent footer across all pages

### Form Components

- **CreateTicketForm**: Modal form for creating new tickets
- **EditTicketForm**: Modal form for updating existing tickets
- **Validation**: Real-time validation with error messages

### UI Components (shadcn/ui)

- **Button**: Various button variants and sizes
- **Card**: Container component for content sections
- **Input**: Form input fields with validation states
- **Sheet**: Mobile slide-out navigation
- **Badge**: Status indicators for tickets
- **Toast**: Notification system via Sonner

### Custom Components

- **WaveBackground**: SVG wave pattern for hero section
- **DecorativeCircle**: Floating decorative elements
- **ProtectedRoute**: Route guard for authenticated pages

## 🔐 State Management

### Authentication Context (`AuthContext`)

- **User State**: Current logged-in user information
- **Session Management**: localStorage-based session tokens
- **Methods**: `login()`, `signup()`, `logout()`
- **Data**: Stored in `ticketapp_session`, `ticketapp_user`, `ticketapp_users`

### Ticket Context (`TicketContext`)

- **Ticket State**: Array of all tickets
- **CRUD Operations**: `addTicket()`, `updateTicket()`, `deleteTicket()`
- **Statistics**: `getTicketStats()` for dashboard metrics
- **Data**: Persisted in `ticketapp_tickets` localStorage key

### Data Persistence

All data is stored in localStorage with the following keys:

- `ticketapp_session`: Current user session token
- `ticketapp_user`: Current user information
- `ticketapp_users`: Database of all registered users
- `ticketapp_tickets`: Array of all tickets

## 🎯 Authentication System

### User Registration

- Form validation for email, password, and name
- Duplicate email prevention
- Automatic login after successful registration

### User Login

- Email and password validation
- Session token generation and storage
- Redirect to dashboard on success

### Session Management

- Protected routes check for valid session token
- Automatic logout and redirect for invalid sessions
- Session persistence across browser refreshes

### Test User Credentials

For testing purposes, you can use these credentials or create new accounts:

**Pre-seeded Test User:**

- **Email**: `admin@ticketly.com`
- **Password**: `password123`
- **Name**: `Admin User`

**Or create a new account:**

- Use any valid email format
- Password must be at least 6 characters
- Full name is required

## 📱 Responsive Design

### Mobile (< 768px)

- Stacked layout with hamburger menu
- Full-width cards and forms
- Touch-friendly button sizes
- Collapsible sidebar with slide-out sheet

### Tablet (768px - 1024px)

- Two-column grid layouts
- Optimized spacing and typography
- Responsive sidebar behavior

### Desktop (> 1024px)

- Three-column layouts where appropriate
- Fixed sidebar navigation
- Max-width 1440px container
- Hover states and interactions

## ♿ Accessibility Features

### Semantic HTML

- Proper heading hierarchy (h1, h2, h3)
- Semantic elements (`<main>`, `<section>`, `<nav>`)
- Form labels and associations

### Keyboard Navigation

- Tab order and focus management
- Visible focus indicators
- Skip links where appropriate

### Color & Contrast

- WCAG-compliant color contrast ratios
- Status colors with sufficient contrast:
  - Open tickets: Green (#16a34a)
  - In Progress: Amber (#d97706)
  - Closed: Gray (#6b7280)

### Screen Reader Support

- ARIA labels and descriptions
- Alternative text for decorative elements
- Meaningful link text

## 🧪 Data Validation

### Ticket Validation Rules

- **Title**: Required, 1-100 characters
- **Description**: Optional, max 500 characters
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Priority**: Optional, must be one of: `low`, `medium`, `high`

### Authentication Validation

- **Email**: Valid email format required
- **Password**: Minimum 6 characters
- **Name**: Required for registration

### Error Handling

- Real-time validation with inline error messages
- Toast notifications for system-level errors
- Graceful fallbacks for failed operations

## 🔧 Known Issues & Limitations

### Data Persistence

- Uses localStorage instead of a real database
- Data is limited to single browser/device
- No data synchronization across devices

### Authentication

- Session tokens are simple strings, not JWT
- No password reset functionality
- No email verification process

### Performance

- No pagination for large ticket lists
- All data loaded into memory at once
- No image optimization for decorative elements

### Browser Support

- Modern browsers only (ES2022+ features)
- No Internet Explorer support
- Requires JavaScript to be enabled

## 🔄 Future Enhancements

### Potential Improvements

- Real backend API integration
- JWT-based authentication
- Data export functionality
- Drag-and-drop ticket management
- Real-time notifications
- Dark mode support
- Pagination for large datasets
- Advanced filtering and search

### Framework Compatibility

This application is designed to be easily portable to:

- **Vue.js**: Component structure maps well to Vue components
- **Twig/PHP**: Server-side rendering with similar layouts
- **Other frameworks**: Clean separation of concerns

## 📄 License

This project is part of the HNG Frontend Stage 2 requirements.

## 🤝 Contributing

This is a learning project for the HNG internship program. Follow the established patterns for:

- Component structure
- State management
- Styling conventions
- TypeScript usage

---

**Built with ❤️ for the HNG Internship Program**
