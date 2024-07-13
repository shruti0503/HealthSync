import { users } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, databases, storage } from "../appwrite.config";
import { parseStringify } from "../utils";

// Import InputFile conditionally for server-side only
let InputFile: any;
if (typeof window === 'undefined') {
    InputFile = require('node-appwrite/file').InputFile;
}

export const createUser = async (user: CreateUserParams) => {
    try {
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        return parseStringify(newuser);
    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);
            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.log(error);
    }
}

export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserParams) => {
    console.log("BUCKET_ID", process.env.NEXT_PUBLIC_BUCKET_ID);
    try {
        let file;
        if (identificationDocument) {
            console.log("Identification Document:", identificationDocument);

            const inputFile =
                identificationDocument &&
                InputFile?.fromBuffer(
                    identificationDocument.get("blobFile") as Blob,
                    identificationDocument.get("fileName") as string
                );

            console.log("Input File:", inputFile);

            if (!inputFile) {
                throw new Error("Input file could not be created");
            }

            file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
            console.log("Uploaded file:", file);
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id ? file.$id : null,
                identificationDocumentUrl: file?.$id
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                    : null,
                ...patient,
            }
        );

        return parseStringify(newPatient);
    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);
    }
};
