import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to your database
      await connectDB();
      // 2. Check if the user exists in your database
      const user = await User.findOne({ email: profile.email });
      // 3. If it doesn't, create a new user
      if (!user) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get the user from the database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id from the session
      session.user.id = user._id.toString();
      // 3. Return the session object
      return session;
    },
  },
};

export default authOptions;
