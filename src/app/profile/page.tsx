"use client"
import { useState } from 'react';
import { authClient } from '../lib/auth-client';
import { Avatar } from '@heroui/react';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [update, setUpdate] = useState(false);
    const {
        data: session,
        isPending,
        error
    } = authClient.useSession();
    const userData = session?.user;

    const profileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const data = await authClient.updateUser({
            image: userData.image as string,
            name: userData.name as string,
        })

        if (!data) {
            toast.error('Profile has not been updated!')
            return;
        }
        toast.error('Profile has been updated!')
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-4 items-center p-8 shadow-xl rounded-xl w-[400px]'>
                <Avatar className="w-32 h-32">
                    <Avatar.Image
                        alt={userData?.name || "User"}
                        src={userData?.image ?? undefined}
                        className="w-[300px] h-[300px] object-cover"
                    />

                    <Avatar.Fallback className="text-3xl">
                        {userData?.name?.slice(0, 2).toUpperCase() || "US"}
                    </Avatar.Fallback>
                </Avatar>

                <h1 className='font-bold text-xl'>{userData?.name}</h1>
                <p>{userData?.email}</p>
                <button onClick={() => setUpdate(!update)} className='btn '>Update Profile</button>
            </div>

            <div>
                {
                    update && <form onSubmit={profileUpdate}>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[400px] mt-5 border p-4">

                            {/* Name */}
                            <label className="label">নাম</label>
                            <input
                                type="text"
                                name="name"
                                className="input w-full"
                                placeholder="Enter name"
                                required
                            />

                            {/* Image */}
                            <label className="label">Image</label>
                            <input
                                type="url"
                                name="image"
                                className="input w-full"
                                placeholder="Image URL"
                                required
                            />

                            <button type="submit" className="btn bg-red-700 text-white mt-4">
                                Profile Update
                            </button>

                        </fieldset>
                    </form>
                }
            </div>
        </div>
    );
};

export default ProfilePage;