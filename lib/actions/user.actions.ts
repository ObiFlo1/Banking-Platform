"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    //what we can do here: Mutation/Database/Make fetch request/
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    console.log("session response:", response); // log the reponse for inspection

    //set the session coockie
    (await cookies()).set("appwrite-session", response.secret, {
      path: "/", // make it available to all routes
      httpOnly: true, //Prevent client-side JS access
      sameSite: "strict", // prevent cross-site attacks
      secure: true, /// use only over HTTPS
    });
    console.log("Session coockie set successfuly");

    return parseStringify(response);
  } catch (error) {
    console.error("Error during sign-in", error); // log the error if any
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    //what we can do here: Mutation/Database/Make fetch request/
    const { account } = await createAdminClient();
    const { email, password, firstName, lastName } = userData;

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("error");
    console.error(error);
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
