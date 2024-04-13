import { initialProfile } from '@/lib/initial-profile'
import { redirect } from "next/navigation";
import React from 'react'

const page = async() => {

    const profile = initialProfile();

    if(!profile) {
        redirect("/sign-in");
    }

    redirect("/");

}

export default page