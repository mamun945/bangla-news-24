import Image from 'next/image';
import React from 'react';
import { INews } from '../Type/type';

const MainNewspage = ({ news }:{news:INews[]}) => {
    const [firstNews, ...othersNews] = news
    // console.log(firstNews, 'this is firts news');
    return (
        <div className='grid grid-cols-2 gap-2'>

            <div className="card col-span-1 bg-base-100 shadow-xl">
                <figure>
                    <Image
                        height={600}
                        width={600}
                        src={firstNews.imageUrl}
                        alt="Shoes" />
                </figure>
                <div className="p-5">
                    <p className='text-red-500 my-2'>{firstNews.category}</p>
                    <h2 className="card-title mb-2">{firstNews.title}</h2>
                    <p>{firstNews.description}</p>

                </div>
            </div>

            <div className="rounded-xl border border-gray-400 shadow-xl overflow-hidden">
                {othersNews.slice(0, 6).map((other:INews) => (
                    <div
                        key={other.id}
                        className="border-t border-gray-300 p-4 first:border-t-0"
                    >
                        <p className='text-red-500 my-2'>{other.category}</p>
                        <h1 className="font-semibold">
                            {other.title}
                        </h1>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MainNewspage;