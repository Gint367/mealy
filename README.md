# Mealy - Your Meal Planner

Mealy is a meal planner application that helps you plan your meals for the week. It includes features such as a calendar, recipes, shopping list, and user authentication. This app uses PostgreSQL as database. the current configuration is for remote database on Neon

## Features

- **Calendar**: View and manage your meal plans for the week.
- **Recipes**: Browse and manage your recipes.
- **Shopping List**: Create and manage your shopping list.
- **User Authentication**: Sign in and sign out using your account.
- **Theme Toggle**: Switch between light, dark, and system themes.

## Project Structure

The project is structured as follows:

```
mealy/
├── app/
│   ├── components/
│   │   ├── Calendar.tsx
│   │   ├── Header.tsx
│   │   ├── ModeToggle.tsx
│   │   └── ...
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css // styles
│   └── ...
├── prisma/
│   ├── schema.prisma
│   └── ...
├── public/
│   ├── favicon.ico
│   ├── mealy.webp
│   └── ...
├── .env
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── middleware.js
└── ...

```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/mealy.git
cd mealy
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a 

.env

 file in the root directory and add the necessary environment variables. Refer to 

.env.example

 for the required variables.

4. Set up the database:

```bash
npx prisma migrate dev --name init
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Calendar**: Navigate to the home page to view and manage your meal plans.
- **Recipes**: Navigate to the recipes page to browse and manage your recipes.
- **Shopping List**: Navigate to the shopping list page to create and manage your shopping list.
- **User Authentication**: Sign in and sign out using the authentication links in the header.
- **Theme Toggle**: Use the theme toggle button in the header to switch between light, dark, and system themes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.