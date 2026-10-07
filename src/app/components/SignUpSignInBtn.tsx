"use client"
import Image from "next/image";
import { authClient } from "../lib/auth-client";
import { Avatar } from "@heroui/react";
import { redirect } from "next/navigation";
import Link from "next/link";


const SignUpSignInBtnPage = () => {

    const {
        data: session,
        isPending, // loading state
        error // error object 
    } = authClient.useSession();
    const userData = session?.user;
    const avatarSrc = userData?.image ?? "https://img.heroui.chat/image/avatar?w=400&h=400&u=3";
   
    const signOutHandelar=async()=>{
       await authClient.signOut();
       redirect('/signIn')
    }   
    
   if (!session) {
  return (
    <div className="flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#C2F800]" />

        <p className="text-sm font-medium tracking-widest text-gray-400">
          LOADING...
        </p>
      </div>
    </div>
  );
}

    return (
        <div>
            {userData ? (
                <div>
                    <div className="flex items-center gap-3">
                    <Link href={'/profile'}>
                       <Avatar>
                        <Avatar.Image
                            alt={userData?.name || "User"}
                            src={avatarSrc}
                            className="object-cover object-top"
                        />
                        <Avatar.Fallback>
                            {userData?.name?.slice(0, 2).toUpperCase() || "US"}
                        </Avatar.Fallback>
                    </Avatar>
                    </Link>
                     <button 
                     onClick={signOutHandelar}
                     className="btn bg-red-700 text-white">SignOut</button>
                </div>
                <h1 className="text-red-500 text-center font-bold">{userData?.name}</h1>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                  <Link href={'/signIn'}>
                      <button className="btn text-red-700">সাইন ইন</button>
                  </Link>
                   <Link href={'/signUp'}>
                   <button className="btn bg-red-700 text-white">সাইন আপ</button>
                   </Link> 
                </div>
            )}
        </div>
    );
};

export default SignUpSignInBtnPage;