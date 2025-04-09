# Development Tools Documentation

## Overview
MyClean leverages modern development tools and practices to ensure efficient development, reliable deployment, and maintainable code. This document outlines our toolchain and justifies each technology choice.

## Tech Stack

### Frontend Technologies
1. **Core Technologies**
   - HTML5 for semantic markup
   - CSS3 for styling and animations
   - Vanilla JavaScript for interactivity
   ```html
   <!-- Example of modern HTML5 semantic structure -->
   <header>
     <nav class="main-nav">
       <!-- Navigation content -->
     </nav>
   </header>
   <main>
     <section class="booking-form">
       <!-- Form content -->
     </section>
   </main>
   ```

2. **CSS Architecture**
   - Custom design system
   - Mobile-first responsive design
   - CSS variables for theming
   ```css
   :root {
     --primary-color: #3a86ff;
     --secondary-color: #00c2a8;
     --background-light: #f8f9fa;
     --text-dark: #212529;
   }
   ```

### Backend Technologies
1. **Supabase Platform**
   - PostgreSQL database
   - Real-time subscriptions
   - Row-level security
   ```js
   const supabase = createClient(supabaseUrl, supabaseKey);
   ```

2. **AWS Services**
   - S3 for static hosting
   - CloudFront for CDN
   - Route 53 for DNS management

## Development Environment

### IDE Configuration
1. **Visual Studio Code**
   - Extensions Used:
     - Live Server
     - GitHub Copilot
     - ESLint
     - Prettier
   - Custom Settings:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

2. **Version Control**
   - GitHub for repository hosting
   - Git for version control
   - Branch Protection Rules:
   ```yaml
   main:
     required_reviews: 1
     enforce_admins: true
     required_status_checks:
       strict: true
   ```

## Build Tools & Automation

### Development Server
```bash
# Local development setup
npm install -g http-server
cd iteration2
http-server -p 8080
```

### Deployment Pipeline
1. **AWS S3 Deployment**
   ```bash
   # Deploy to S3 bucket
   aws s3 sync ./iteration2 s3://myclean-production --delete
   ```

2. **CloudFront Invalidation**
   ```bash
   # Invalidate CloudFront cache
   aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
   ```

## External Libraries & Services

### Payment Processing
1. **Stripe Integration**
   ```js
   const stripeLinks = {
     'light_clean': 'https://buy.stripe.com/test_8wMg0J5ln8WndHi3cc',
     'medium_clean': 'https://buy.stripe.com/test_cN215P9BDb4v0Uw145',
     'deep_clean': 'https://buy.stripe.com/test_eVadSBcNPegH8mY146'
   };
   ```

### Database Management
1. **Supabase Client**
   ```js
   const supabaseUrl = 'https://mgbekoeqtysnuoshxwup.supabase.co';
   const supabaseKey = 'your-key-here';
   const supabase = createClient(supabaseUrl, supabaseKey);
   ```

## Testing Tools

### Unit Testing
```js
// Example Jest test configuration
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  }
};
```

### Performance Testing
- Lighthouse for performance metrics
- WebPageTest for cross-browser testing
- Chrome DevTools for profiling

## Development Workflow

### Local Development
1. Clone repository:
   ```bash
   git clone https://github.com/sachhm/cp3407-project-v2024-main.git
   cd cp3407-project-v2024-main
   ```

2. Start development server:
   ```bash
   cd iteration2
   http-server
   ```

### Deployment Process
1. Build and test:
   ```bash
   # Run tests
   npm test
   ```

2. Deploy to production:
   ```bash
   # Deploy to AWS
   # Currently manually deployed. 
   ```

## Tool Selection Justification

### Development Tools
1. **VS Code**
   - Extensive extension ecosystem
   - Integrated Git support
   - Built-in terminal
   - GitHub Copilot integration

2. **GitHub**
   - Industry standard
   - CI/CD integration
   - Project management features
   - Code review capabilities

3. **NinjaMock**
   - https://ninjamock.com/s/H16S5Lx

### Cloud Services
1. **AWS**
   - Global CDN network
   - High availability
   - Cost-effective scaling
   - Comprehensive monitoring

2. **Supabase**
   - PostgreSQL compatibility
   - Real-time capabilities
   - Built-in authentication
   - Developer-friendly API

## Future Tool Considerations
1. **Build System**
   - Webpack for asset bundling
   - Babel for JS transpilation
   - PostCSS for CSS processing

2. **Monitoring**
   - Sentry for error tracking
   - DataDog for performance monitoring
   - LogRocket for session replay

## Conclusion
Our development toolchain enables:
1. Efficient development workflow
2. Reliable deployment process
3. Comprehensive testing capabilities
4. Scalable infrastructure
5. Maintainable codebase