import { Button } from "@/components/ui/button";
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PassKeyModel from "@/components/PassKeyModel";

export default function Home({searchParams}:SearchParamProps) {
  const isAdmin=searchParams?.admin==="true";
  
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModel />}
      {/* {to do otp varification} */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/" className="cursor-pointer">
            <div className="flex  items-center mb-10 ms-[-19px]">
              <Image
                  src="/assets/icons/logoFull.png"
                  height={100}
                // rem={true}
                  width={162}
                  alt="logo"
                  className="h-12 w-fit"
                />
              <p className="font-bold text-3xl mb-2">HealthSync</p>

            </div>
        
          </Link>
          <PatientForm />

          <div className="text-14-regular mt-10 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left"> 2024 HealthSync  </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image 
       src='/assets/images/homeboard.jpg'
       height={1000}
       width={1000}
       alt="patient"
       className="side-img max-w-[50%]"
       />
      
    </div>
   
  );
}
