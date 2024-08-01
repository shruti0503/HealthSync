'use server'

import { revalidatePath } from "next/cache"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, PATIENT_COLLECTION_ID } from "../appwrite.config"
import { ID, Query } from "node-appwrite"
import { parseStringify } from "../utils"

export const  createAppointment=async(appointment: CreateAppointmentParams)=>{
    try{
        console.log("appoinrmt calles",appointment)
        const  newAppointment= await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        )
       // revalidatePath("/admin");
        return parseStringify(newAppointment)
    }
    catch(error){
        console.log("An erro occurr while scheuling appointmet", error)
    }

}

export const getAppointment = async (appointmentId: string) => {
    try {
      const appointment = await databases.getDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId
      );
  
      return parseStringify(appointment);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the existing patient:",
        error
      );
    }
  };

export const updateAppointment=async({  appointmentId,
    userId,
    timeZone,
    appointment,
    type,
}:UpdateAppointmentParams)=>{

    try{
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        );

        if (!updatedAppointment) throw Error;

    }
    catch(error){
        console.log(error)
    }

}