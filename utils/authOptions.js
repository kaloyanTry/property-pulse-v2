import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from 'next-auth/providers/github';

import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // 1. Connect to the DB
      await connectDB();
      // 2. Check if user exist
      const existingUser = await User.findOne({ email: profile.email });
      // 3. If not, create a user
      if (!existingUser) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sing in
      return true;
    },
  },
  async session({ session }) {
    // 1. Get user from Db
    const user = await User.findOne({ email: session.user.email });
    // 2. Assign user id from the session
    session.user.id = user._id.toString();
    // 3. Return session
    return session;
  },
};
