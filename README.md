# David Fischer Dev - Personal Website

A personal website built with React, TypeScript, Vite, and includes a Major System Mnemonics Generator.

## Environment Configuration

The application uses environment variables to configure the API endpoint:

- **Development**: `http://localhost:5000`
- **Production**: `https://api.davidfischer.dev`

## Development

```bash
npm install
npm run dev
```

## Production Build

### Local Build

```bash
npm run build-prod
```

### Docker Build

```bash
# Build for production
npm run docker:build-prod

# Run the container
docker run -p 3000:80 davidfischerdev-frontend
```

### Using Docker Compose

```bash
# Production
docker-compose up --build

# Development
docker-compose -f docker-compose.dev.yml up --build
```

## CI/CD

The project includes GitHub Actions workflow for automated building and deployment. The workflow:

1. Runs on pushes to `master`/`main` branches and pull requests
2. Installs dependencies and runs tests
3. Builds the application with production environment variables
4. Builds and pushes Docker images to GitHub Container Registry (ghcr.io)
5. Creates tagged images for different events (branch, PR, SHA, latest)

### Docker Images

Docker images are automatically built and pushed to GitHub Container Registry:

- **Registry**: `ghcr.io/theUpsider/davidfischerdev`
- **Tags**:
  - `latest` (for main/master branch)
  - `master` (for master branch pushes)
  - `pr-XX` (for pull requests)
  - `sha-XXXXXXX` (for specific commits)

### Pulling Docker Images

```bash
# Pull the latest image
docker pull ghcr.io/theUpsider/davidfischerdev:latest

# Run the pulled image
docker run -p 80:80 ghcr.io/theUpsider/davidfischerdev:latest
```

## Environment Variables

- `VITE_API_BASE_URL`: Base URL for API calls
  - Development: `http://localhost:5000`
  - Production: `https://api.davidfischer.dev`

## Docker Commands

```bash
# Build production image
docker build -t davidfischerdev-frontend \
  --build-arg VITE_API_BASE_URL=https://api.davidfischer.dev \
  --build-arg NODE_ENV=production .

# Run container
docker run -p 80:80 davidfischerdev-frontend
```

## Deployment

The application is containerized and ready for deployment to any Docker-compatible environment. The production build uses nginx to serve the static files with proper routing configuration for React Router.

### Deployment Options

1. **GitHub Container Registry** (Recommended for production):

   ```bash
   docker pull ghcr.io/theUpsider/davidfischerdev:latest
   docker run -p 80:80 ghcr.io/theUpsider/davidfischerdev:latest
   ```

2. **Local Docker Build**:

   ```bash
   docker build -t davidfischerdev-frontend .
   docker run -p 80:80 davidfischerdev-frontend
   ```

3. **Docker Compose** (uses local build):
   ```bash
   docker-compose up --build
   ```

### Production Deployment with GitHub Registry

Create a docker-compose.prod.yml for production deployment using GitHub Container Registry:

```yaml
version: '3.8'
services:
  frontend:
    image: ghcr.io/theUpsider/davidfischerdev:latest
    ports:
      - '80:80'
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Troubleshooting

### Recent Fixes (2025-08-07)

#### CORS Issues ✅ Fixed

- **Problem**: CORS errors when accessing API from development server
- **Solution**: Added Vite proxy configuration to forward `/api` requests to `localhost:5000`
- **Configuration**: Development uses `/api` proxy, production uses direct HTTPS calls

#### HTML Validation Warnings ✅ Fixed

- **Problem**: `<td>` elements directly under `<tbody>` without `<tr>` wrapper
- **Solution**: Fixed table structure in Major System reference table

#### User Experience Improvements ✅ Added

- **Loading States**: Button shows "Generating..." while fetching data
- **Error Handling**: Graceful fallback to mock data when API unavailable
- **Better Error Messages**: Styled error notifications with theme support

### Docker Build Issues

If you encounter crypto-related errors during Docker builds:

1. **Local builds work but Docker fails**: This is usually due to Node.js compatibility with Alpine Linux. The Dockerfile now uses `node:18-slim` instead of `node:18-alpine` to avoid these issues.

2. **Legacy OpenSSL errors**: If you still encounter issues, try the legacy build:

   ```bash
   npm run build-prod-legacy
   ```

3. **Memory issues**: The build process uses `--max-old-space-size=4096` to prevent memory-related build failures.

### Common Solutions

- Ensure you're using Node.js 18 or higher
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- For Docker: Ensure Docker has sufficient memory allocated (recommend 4GB+)

## Features

- **Blog System**: Full-featured blog with admin interface, markdown support, and SEO optimization
  - Public blog with search, tag filtering, and responsive design
  - Admin dashboard for creating, editing, and managing posts
  - Markdown support for rich content formatting
  - SEO-optimized with metadata, Open Graph tags, and structured data
  - Standalone layout separate from main portfolio (opens in new context)
  - JSON-based storage for simplicity and easy migration
- **Major System Mnemonics Generator**: Tool for generating mnemonic devices using the Major System
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Theme switching capability
- **Production Ready**: Environment-specific configuration and Docker support

## Blog Setup

The blog system is fully functional with JSON-based storage and admin authentication.

### Admin Access

1. Create a `.env.local` file in the root directory (copy from `.env.example`):

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
```

2. Access the admin interface at `/blog/admin`
3. Use your credentials to log in

### Blog Features

#### Public Features
- **Browse Posts**: View all published blog posts at `/blog`
- **Search**: Real-time search across titles, content, excerpts, and tags
- **Tag Filtering**: Filter posts by tags at `/blog/tag/{tagname}`
- **Individual Posts**: Read full posts at `/blog/{slug}`
- **Responsive Design**: Optimized for all screen sizes
- **Theme Toggle**: Light/dark mode support

#### Admin Features
- **Dashboard**: Manage all posts at `/blog/admin/dashboard`
- **Create Posts**: Write new posts with markdown support at `/blog/admin/editor`
- **Edit Posts**: Update existing posts at `/blog/admin/editor/{id}`
- **Publish/Unpublish**: Toggle post visibility
- **Delete Posts**: Remove posts permanently
- **Preview**: See how posts will look before publishing

### Blog Data

Blog posts are stored in `data/blog-posts.json`. The file includes:
- Post metadata (title, slug, excerpt, tags, dates)
- Full markdown content
- Author information
- Publication status

### Creating Blog Posts

1. Log in to the admin interface
2. Click "Create New Post"
3. Fill in the required fields:
   - **Title**: Post title (slug auto-generated)
   - **Slug**: URL-friendly identifier (editable)
   - **Excerpt**: Short description for previews
   - **Content**: Full post content in Markdown
   - **Tags**: Comma-separated tags
   - **Author**: Post author name
   - **Published**: Toggle to publish immediately

#### Markdown Support

The blog supports standard Markdown syntax:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link text](https://example.com)

- Bullet point
- Another point

1. Numbered list
2. Second item

`inline code`

\`\`\`javascript
// Code block
const hello = 'world'
\`\`\`

> Blockquote
```

### SEO Features

The blog includes comprehensive SEO optimization:

- **Dynamic Sitemap**: Automatically includes all blog posts at `/sitemap.xml`
- **Robots.txt**: Configured to allow indexing (blocks `/blog/admin/`)
- **Meta Tags**: Title, description, and keywords for each post
- **Open Graph**: Social media preview cards
- **Twitter Cards**: Optimized sharing on Twitter
- **Structured Data**: JSON-LD schema for search engines
- **Semantic HTML**: Proper heading hierarchy and structure

### Blog Architecture

The blog uses a standalone layout separate from the main portfolio:

- **Separate Layout**: Blog pages use their own layout (`/blog/layout.tsx`)
- **Independent Theming**: Blog has its own monochrome theme system
- **Isolated Navigation**: Blog header with dedicated navigation
- **Server Actions**: All data operations use Next.js server actions
- **File-based Storage**: JSON file for easy backup and migration

### Security

- **HTTP-only Cookies**: Session tokens stored securely
- **Server-side Authentication**: All admin routes protected
- **Environment Variables**: Credentials stored in `.env` files
- **Input Validation**: All user inputs validated and sanitized

### Migration to Database (Optional)

The current JSON-based storage works well for personal blogs. To migrate to a database:

1. Install your preferred database client (e.g., Prisma, MongoDB driver)
2. Update `/src/lib/db.ts` to use database queries instead of file operations
3. Migrate existing posts from `data/blog-posts.json` to your database
4. Server actions in `/src/app/actions/blogActions.ts` remain unchanged
