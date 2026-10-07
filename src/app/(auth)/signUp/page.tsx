
"use client";

import { authClient} from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const router = useRouter();

    const onSubmitHandle = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: userData.name as string,
            email: userData.email as string,
            image: userData.image as string,
            password: userData.password as string,
        });

        if (data) {
            router.push('/signIn');
            toast.success("Account created successfully!");
        }

        if (error) {
            toast.error(error.message || "Something went wrong!");
        }
    };



    return (
        <div className="min-h-[500px] flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-red-400 mb-4">সাইন আপ</h1>

            <form onSubmit={onSubmitHandle}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    {/* Name */}
                    <label className="label">নাম</label>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Enter name"
                        required
                    />

                    {/* Email */}
                    <label className="label">ইমেইল</label>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        required
                    />

                    {/* Image */}
                    <label className="label">Image</label>
                    <input
                        type="url"
                        name="image"
                        className="input"
                        placeholder="Image URL"
                        required
                    />

                    {/* Password */}
                    <label className="label">পাসওয়ার্ড</label>
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        minLength={8}
                        pattern="(?=.*[A-Z]).{8,}"
                        title="Password must be at least 8 characters long and contain at least one capital letter."
                        required
                    />

                    <button type="submit" className="btn bg-red-700 text-white mt-4">
                        সাইন আপ করুন
                    </button>

                </fieldset>
            </form>
        </div>
    );
};

export default SignUpPage;