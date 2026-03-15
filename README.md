# HandinHand - Emergency Coordination Platform

HandinHand is a web-based Responder Dashboard built to help coordinate emergency efforts and track requests for help during critical situations such as natural disasters, accidents, or medical emergencies.

## Features

- **Real-Time Request Tracking**: Monitor incoming help requests with automatic status updates.
- **Urgency & Status Indicators**: Color-coded badges for request urgency (Critical, High, Medium) and current status (Pending, Acknowledged, Responding, Resolved).
- **Vulnerability Flags**: Critical information at a glance (e.g., Elderly, Mobility Issues, Children).
- **Location & Proximity**: Distance tracking and location mapping points for emergency responders.
- **Volunteer Assignment**: A feature for responders to assign tasks to themselves.
- **Direct Communication**: Initiate a phone call or SMS response directly from the dashboard.
- **List & Map Views**: Toggle between a detailed list view and an interactive map view (map integration pending).

## Tech Stack

- [React 19](https://react.dev/) - Frontend component library
- [Vite](https://vitejs.dev/) - Fast build tool and development server
- [TypeScript](https://www.typescriptlang.org/) - Static typing for JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [React Router v7](https://reactrouter.com/) - Declarative routing
- [Lucide React](https://lucide.dev/) - Beautiful, consistent icon set

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdul3532/hand-in-hand.git
   cd hand-in-hand
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

## Project Structure

```text
hand-in-hand/
├── src/
│   ├── components/
│   │   └── ResponderDashboard.tsx  # Main dashboard component displaying emergency requests
│   ├── App.tsx                     # Main layout and React Router configuration
│   ├── main.tsx                    # React application entry point
│   ├── index.css                   # Global Tailwind CSS directives
│   └── vite-env.d.ts               # Vite TypeScript environment variables
├── index.html                      # HTML entry point
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project metadata and dependencies
```

## Contributing

Contributions are always welcome. Please feel free to submit a Pull Request.

## License

This project is open-source and available under the terms of the MIT License.
