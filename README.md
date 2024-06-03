Sure, here's a README file for a Next.js service with the provided pages:

````markdown
# Loyalty Points Management Service

This project is a Next.js application for managing loyalty points. It includes various pages for creating projects and managing points.

## Pages

### /points

This page allows users to manage loyalty points. Users can either get points or add points to a specific wallet address. The page includes input fields for entering the wallet address, API key, event name, and amount of points to add. It also provides options for selecting the endpoint type (GET or ADD) and displays the balance of the wallet address.

### /project

This page enables users to create a new project for managing loyalty points. Users need to enter a project identifier, and upon creation, they receive an API key for accessing the project's functionalities.

## Layout

The layout component (`layout.tsx`) provides a consistent layout for all pages in the application. It includes a header with the application name and navigation links to the `/points` and `/project` pages. The layout also contains a main content area where the child components are rendered.

## Usage

To run the application locally:

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```
````

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Dependencies

This project utilizes several dependencies, including:

- **Next.js**: The React framework for building server-side rendered and statically generated web applications.
- **@tanstack/react-query**: React hooks for fetching, caching, and updating asynchronous data.
- **react**: A JavaScript library for building user interfaces.
- **@next/navigation**: Next.js library for client-side navigation.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

## Author

This application was created by Gabriel Fialho.
