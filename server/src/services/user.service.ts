import { db } from "../db/db.config";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "./password.service";

const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await hashPassword(password);

  console.log("hashedPassword : ", hashedPassword);

  const user = await db
    .insert(userTable)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning();

  console.log("created_user : ", user);
  return user;
};

const getUserById = async (id: string) => {
  const user = await db.select().from(userTable).where(eq(userTable.id, id));

  console.log("get user by Id: ", user);
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  console.log("getUserBYEmail : ", user);
  return user;
};

const getUsers = async () => {
  const users = await db.select().from(userTable);

  console.log("get all users : ", users);
  return users;
};

export { createUser, getUserById, getUsers, getUserByEmail };
