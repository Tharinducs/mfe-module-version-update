# MFE Module Version Update

A React-based tool for managing and automating Micro Frontend (MFE) module version updates across multiple repositories.

## Features

- **User Input Interface**: Simple form to input module names and version details
- **Automatic PR Generation**: Automatically creates pull requests with version updates
- **Multi-Repository Support**: Update versions across multiple repositories at once
- **Version Tracking**: Keep track of module versions and update history
- **GitHub Integration**: Direct integration with GitHub API for seamless PR creation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- GitHub Personal Access Token (for PR creation)

## Installation

```bash
# Clone the repository
git clone https://github.com/Tharinducs/mfe-module-version-update.git

# Navigate to the project directory
cd mfe-module-version-update

# Install dependencies
npm install
# or
yarn install
```

## Configuration

1. Create a `.env.local` file in the root directory
2. Add your GitHub Personal Access Token:
   ```
   REACT_APP_GITHUB_TOKEN=your_personal_access_token_here
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Fill in the form with:
   - Module name
   - New version number
   - Target repositories
   - Branch details (if applicable)

4. Click "Generate PR" to create pull requests automatically

## Project Structure

```
mfe-module-version-update/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## Available Scripts

### `npm start`
Runs the app in development mode

### `npm run build`
Builds the app for production

### `npm test`
Launches the test runner

## API Integration

This application integrates with the GitHub REST API to:
- Authenticate users
- Create branches
- Generate pull requests with version update content
- Manage repository operations

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue in the repository.
