import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from '@sentry/nextjs'
import Link from "next/link";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_appointment",patient.name)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
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

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 HealthSync</p>
        </div>
      </section>

      <Image
        src="/assets/images/newApp.jpg"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;