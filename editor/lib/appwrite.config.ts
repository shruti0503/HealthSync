
import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

//console.log("all process", process.env.NEXT_PUBLIC_BUCKET_ID)
const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6689214e003d946e799d').setKey('c7a8c9ae46742012f756f78c9beced2e323a280f464f08d56e8227a9e3e5bcd03ca29cffcfd7e29f4416a26ed16ee14a5f0d3441354b3191365085d3820bb6a1e554ea63692d1bf44ed33287a90c83d53ffaab834f6171d1c5a0c72a105c994a8872dcf7f1368fdb3f39df8c81ca2480bd73890c6f1fd2dc55bf3c2f3dd7a3e4');

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);