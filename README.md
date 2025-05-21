# LinkedCraft

LinkedCraft is a professional networking platform project that helps users create, schedule, and manage LinkedIn content using modern web technologies and AI assistance.

## Project Overview

LinkedCraft is built with a modern tech stack to provide a seamless experience for managing your LinkedIn presence:

- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **Backend Integration**: Supabase
- **State Management**: React Query

## Features

- Professional UI/UX designed for content creators
- LinkedIn integration capabilities
- Content creation and scheduling
- Analytics and performance tracking
- User authentication and profile management

## Getting Started

To run this project locally:

```sh
# Clone the repository
git clone https://github.com/Chris-cobeng/linkedcraft.git

# Navigate to the project directory
cd linkedcraft

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:8080

## Project Structure

```
linkedcraft/
├── public/           # Static assets
├── src/              # Source files
│   ├── components/   # UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── index.html        # HTML entry point
└── README.md         # Project documentation
```

## Building for Production

```sh
npm run build
```

This will generate optimized production files in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.