# EcoFinds - Sustainable Second-Hand Marketplace

A full-stack Next.js application for buying and selling second-hand items sustainably.

## Features

- 🔐 User Authentication (Register/Login)
- 👤 User Profile Management
- 📦 Product Listing CRUD Operations
- 🔍 Product Search and Filtering
- 🛒 Shopping Cart and Order Management
- 📱 Responsive Design (Mobile + Desktop)
- 🚀 Deploy-ready (Vercel/Render)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ecofinds
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/ecofinds
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ecofinds/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── orders/            # Order pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/                # MongoDB models
└── public/                # Static assets
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - Get user orders (buyer/seller)
- `POST /api/orders` - Create new order

### Authentication
- `POST /api/auth/register` - Register new user

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your production URL
4. Deploy!

### Other Platforms

The app is also deployable on:
- Render
- Railway
- Netlify (with serverless functions)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_URL` | Your app URL | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@ecofinds.com or create an issue in the repository.
