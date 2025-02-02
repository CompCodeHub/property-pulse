import { getServerSession } from "next-auth/next";
import authOptions from "@/utils/authOptions";

export const getSessionUser = async () => {
  // Get the user's session
  const session = await getServerSession(authOptions);

  // If the user is not logged in, return null
  if (!session || !session.user) {
    return null;
  }

  // Return the user's session
  return {
    user: session.user,
    userId: session.user.id,
  };
};
