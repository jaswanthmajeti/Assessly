import { Inngest } from 'inngest'
import {connectDB} from './db.js'
import User from '../models/User.js'


export const inngest = new Inngest({id:"Assessly"});

const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  async ({ event}) => {
    await connectDB();
    const {id,email_address,first_name,last_name,image_url} = event.data;
    const email = email_address?.[0]?.email_address;
    if (!email) {
      throw new Error(`No email found for Clerk user ${id}`);
    }
    const newUser = {
      clerkId:id,
      email,
      name:`${first_name || ""} ${last_name || ""}`,
      profileImage:image_url
    }
    
    await User.updateOne(
      { clerkId: id },
      { $set: newUser },
      { upsert: true }
    );
  },
);


const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event}) => {
    await connectDB();
    const {id} = event.data;

    await User.deleteOne({clerkId:id});
  },
);

export const functions = [syncUser,deleteUserFromDB];