# Z-Craft cv manager

CV Manager is a web application built with **React**, **TypeScript**, and **SCSS** that allows users to create, manage, and download CVs. It provides an intuitive interface for adding work experience, skills, and other relevant information to a CV. The app supports multiple themes, PDF generation, and state management through a custom store.

## Features

- Create, edit, and delete CVs.
- Generate CVs in PDF format.
- Multi-theme support (light and dark modes).
- Save data in the local store.
- Responsive and accessible interface.
- Lazy loading of components using `React.lazy` and `Suspense` for optimized load times.
- Error handling with an `ErrorBoundary`.

## Live Demo

A demo version of the application is available at: [Demo Link](https://www.example.com)

## Prerequisites

Before starting, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 16+)
- [npm](https://www.npmjs.com/) 

## Installation

Clone this repository, then install the dependencies:

```bash
# Clone the repository
git clone https://github.com/steeve0403/Z-Craft.git

# Navigate to the project directory
cd z-craft

# Install dependencies
npm install
```
## Available scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production-ready application
- `npm run lint`: Run ESLint to check for code style issues
- `npm run format`: Run Prettier to format code
- `npm test`: Run Jest tests

The tests are powered by Jest and React Testing Library to ensure that components work as expected.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Git Workflow

- `main`: Stable production branch
- `dev`: Development branch where new features are integrated
- `Features branches`: Each nex feature or bugfix should be developed in a dedicated branch (e.g., `feature/add-cv-editor)

## License

This project is licensed under the MIT License.

## Steeve Zych


### Explanation of the sections:
- **Project Description**: Provides a brief overview of the purpose of the application.
- **Features**: Lists the main features offered by the app.
- **Prerequisites**: Specifies the software dependencies needed to run the project.
- **Installation**: Explains how to clone the repository and install dependencies.
- **Available Scripts**: Describes the common npm/yarn scripts (start, build, test, lint, format).
- **Contribution**: Provides steps for contributing to the project.
- **Git Workflow**: Describes how to work with branches (main, dev, feature branches).
- **License**: Mentions the licensing under which the project is distributed.

This `README.md` should give users and contributors a clear understanding of the project and how to get involved. Feel free to adjust any specific details like links or project specifics!
