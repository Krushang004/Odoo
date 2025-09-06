# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
     - `NEXTAUTH_URL`: Your Vercel app URL (e.g., https://your-app.vercel.app)
   - Deploy!

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Add to environment variables

### Option 2: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/ecofinds`

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofinds
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
```

For production:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofinds
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret-key
```

## Testing Deployment

1. **Local Testing**
   ```bash
   npm run dev
   ```

2. **Production Build Test**
   ```bash
   npm run build
   npm start
   ```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP is whitelisted in MongoDB Atlas
   - Verify database name

2. **NextAuth Issues**
   - Ensure NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain

3. **Build Errors**
   - Check TypeScript errors: `npm run lint`
   - Verify all dependencies are installed

### Support

- Check the [Next.js documentation](https://nextjs.org/docs)
- MongoDB Atlas [documentation](https://docs.atlas.mongodb.com)
- Vercel [documentation](https://vercel.com/docs)
