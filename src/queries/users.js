import { User } from "@/model/user-model";

export async function createUser(user) {
  try{
    await User.create(user);
  } catch(e){
    throw new Error(e)
  }
}

export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).select("-password").lean();
  return user;
}