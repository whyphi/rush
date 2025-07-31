import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
export const dynamic = "force-dynamic";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      // Create user in database
    },
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) return false;

      const isEdu = profile.email.endsWith(".edu");
      if (!isEdu) return false;

      const { data: existing, error } = await supabase
        .from("rushees")
        .select("id")
        .eq("email", profile.email)
        .single();

      // PGRST116 = result contains 0 rows (create new user)
      if (error && error.code !== "PGRST116") {
        console.error("Supabase error:", error);
        return false;
      }

      if (!existing) {
        const { error: insertErr } = await supabase.from("rushees").insert([
          {
            id: uuidv4(),
            email: profile.email,
            name: profile.name,
          },
        ]);

        if (insertErr) {
          console.error("Failed to create new rushee:", insertErr);
          return false;
        }
      }

      return true;
    },
  },
  // pages: {
  //   error: "/authError"
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
