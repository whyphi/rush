import { DefaultUser, NextAuth } from "next-auth";
/**
 * Use this type interface to extend user session as needed.
 */
declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      rushee_id?: string;
    };
  }
}
