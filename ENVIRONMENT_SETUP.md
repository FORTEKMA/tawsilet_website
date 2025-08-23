# Environment Configuration Setup

This project automatically uses different API URLs based on the current Git branch.

## How it works

The system uses environment-specific files and automatically copies the appropriate one to `.env` based on your current branch:

- **`dev` branch** → Uses `.env.development` (Development API URLs)
- **`main` branch** → Uses `.env.production` (Production API URLs)
- **Any other branch** → Uses `.env.development` (Development API URLs by default)

## Environment Files

### `.env.development`
```
GENERATE_SOURCEMAP=false
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyA0JbWwMvbJ7IYcL4_cagsFQLyLqXHA7xs
REACT_APP_BASE_URL=https://dev-api.tawsilet.com/api
REACT_APP_FRONT_URL=http://dev.tawsilet.com/
REACT_APP_DOMAIN_URL=https://dev-api.tawsilet.com
REACT_APP_DASH_URL=http://dev.tawsilet.com/
REACT_APP_PASSWORD=Sheelni12345678910
```

### `.env.production`
```
GENERATE_SOURCEMAP=false
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyA0JbWwMvbJ7IYcL4_cagsFQLyLqXHA7xs
REACT_APP_BASE_URL=https://api.tawsilet.com/api
REACT_APP_FRONT_URL=http://tawsilet.com/
REACT_APP_DOMAIN_URL=https://api.tawsilet.com
REACT_APP_DASH_URL=http://tawsilet.com/
REACT_APP_PASSWORD=Sheelni12345678910
```

## Usage

### Automatic Setup
The environment is automatically set up when you run:
- `npm start` (development)
- `npm run build` (production)

### Manual Setup
You can manually set up the environment for your current branch:
```bash
npm run setup-env
```

### Switching Branches
When you switch branches, you need to run the setup again:
```bash
git checkout main
npm run setup-env
```

## Available Scripts

- `npm run setup-env` - Manually set up environment for current branch
- `npm start` - Start development server (automatically sets up environment)
- `npm run build` - Build for production (automatically sets up environment)

## Customizing API URLs

To change the API URLs for different environments, edit the corresponding environment file:

1. **For development**: Edit `.env.development`
2. **For production**: Edit `.env.production`

## Important Notes

- The `.env` file is automatically generated and should not be edited directly
- Always edit the source files (`.env.development` or `.env.production`) instead
- The system will automatically copy the correct environment file when you run `npm start` or `npm run build`
- Make sure to commit the environment files to your repository so other developers can use them 