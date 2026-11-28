"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

export const signIn = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    // Create a new user
    const { email, password, firstName, lastName } = userData;
    const name = `${firstName} ${lastName}`;
    const { account } = await createAdminClient();

    const newUser = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}
