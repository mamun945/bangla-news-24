
"use client";

import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SingInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const onSubmitHandle = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: userData.email as string,
            password: userData.password as string,
        });

        if (data) {
            toast.success("Login successfully!");
            redirect('/')
        }

        if (error) {
            toast.error(error.message || "Something went wrong!");
        }
    };

    const googleHandelar = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    const githubHandelar = async () => {
        const data = await authClient.signIn.social({
            provider: "github"
        })
    }
    return (
        <div className="min-h-[500px] flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-red-400 mb-4">
                সাইন ইন
            </h1>

            <form onSubmit={onSubmitHandle}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    {/* Email */}
                    <label className="label">ইমেইল</label>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        required
                    />

                    {/* Password */}
                    <label className="label">পাসওয়ার্ড</label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="input w-full pr-20"
                            placeholder="Password"
                            minLength={8}
                            pattern="(?=.*[A-Z]).{8,}"
                            title="Password must be at least 8 characters long and contain at least one capital letter."
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-red-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn bg-red-700 text-white mt-4"
                    >
                        সাইন ইন করুন
                    </button>

                </fieldset>
            </form>
            <div className="w-xs mt-4">
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-400"></div>

                    <span className="text-sm text-gray-500">or</span>

                    <div className="h-px flex-1 bg-gray-400"></div>
                </div>

                <div className="mt-4">
                    <div>
                        <button
                            onClick={googleHandelar}
                            className="btn bg-red-700 w-full text-white">
                            Sign In With Google
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={githubHandelar}
                            className="btn bg-red-700 w-full text-white">
                            Sign In With Github
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingInPage;
