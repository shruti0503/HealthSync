

import React from 'react'
import Image from 'next/image'
import { getUser } from '@/lib/actions/patient.actions'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import * as Sentry from '@sentry/nextjs'

const Register = async({params:{userId}}:SearchParamProps) => {

    const user=await getUser(userId)
    Sentry.metrics.set("user_view",user.name)

  return (
    <div className="flex h-screen max-h-screen">

    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
       <Link href="/" className="cursor-pointer">
          <div className="flex  items-center justify-start ms-[-15px]">
            <Image
                src="/assets/icons/logoFull.png"
                height={100}
              // rem={true}
                width={162}
                alt="logo"
                className="h-12 w-fit"
              />
            <p className="font-semibold text-lg mb-2">HealthSync</p>

          </div>
       
        </Link>
        <RegisterForm  user={user}/>
      

        <div className="text-14-regular mt-10 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left"> 2024 CarePlus  </p>
          <Link href="/?admin=true"></Link>
        </div>
      </div>
    </section>

    <Image 
     src='/assets/images/onboardtest.jpg'
     height={1000}
     width={1000}
     alt="patient"
     className="side-img max-w-[390px]"
     />
    
  </div>
  )
}

export default Register
