"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import CustomFormField from "../ui/customFormField"
import { UserFormValidation } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SubmitButton from "../ui/submitButton"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
// Enums are a feature in TypeScript that allow you to define a set of named constants.
export enum FormFieldType{
    INPUT= 'input',
    TEXTAREA='textarea',
    PHONE_INPUT='phoneInput',
    CHECKBOX='datePicker',
    SELECT="select",
    SKELETON='skeleton'

}



const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const PatrientForm=() =>{
    const router=useRouter();

    const [isLoading, setisLoading] = useState(false)


  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  // 2. Define a submit handler.
 async function onSubmit({name,email, phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true);
    try{

    //     const userData={name, email, phone}
    //    const user= await createUser(userData);


    //    if(user){
    //     router.push(`/patients/dashboard/${user.$id}/register`)

    //    }
        
    }
    catch(err){
        console.log(err);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  //  console.log(values)
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋🏻</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Shruti"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="xyz@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
        />

       <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(557) 124-5667"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
        />
     
     <SubmitButton
      isLoading={isLoading}
     >
        Get Started
        </SubmitButton>
    </form>
  </Form>
  )
}

export default PatrientForm
