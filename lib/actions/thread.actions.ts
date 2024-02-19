"use server";

import User from "../models/user.model";
import { connectToDb } from "../mongoose";

type Params = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDb();

    /*const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });*/
    console.log(await User.findById(author));

    //update user model
    /* await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);*/
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}
