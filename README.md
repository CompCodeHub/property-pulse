# Property Pulse

Property Pulse is a modern real estate platform built with **Next.js**, **Tailwind CSS**, and **MongoDB**. The app allows users to list properties, view listings, send and receive messages, authenticate with Google, and more. 

## Features

- 🏡 **List Properties** – Add and manage property listings with details and images.
- 🔍 **View Properties** – Browse available properties with an intuitive UI.
- ✉️ **Messaging System** – Send and receive messages for listed properties.
- 🔑 **OAuth Authentication** – Secure login via Google using **Next Auth**.
- 🗺 **Live Map Location** – View property locations on an interactive map.
- 📸 **Cloudinary Integration** – Upload and manage property images seamlessly.
- 📌 **Bookmarks** – Save favorite properties for easy access later.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API Routes (Serverless Functions)
- **Database:** MongoDB
- **Authentication:** NextAuth.js (Google OAuth)
- **File Storage:** Cloudinary
- **Maps Integration:** (e.g., Maptiler API)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/property-pulse.git
   cd property-pulse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   NEXT_PUBLIC_API_DOMAIN=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_secret
   NEXTAUTH_INTERNAL_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NEXT_PUBLIC_OPENCAGE_API_KEY=your_opencage_api_key
   NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

You can deploy this project on platforms like **Vercel**, **Netlify**, or any cloud hosting service that supports Next.js.

### Deploying on Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` and follow the setup instructions.
3. Set environment variables in Vercel dashboard.
4. Deploy your project with `vercel --prod`.

## License

This project is licensed under the [MIT License](LICENSE).
