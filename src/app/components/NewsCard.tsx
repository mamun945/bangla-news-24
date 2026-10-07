import Image from 'next/image';
import React from 'react';
import { INews } from '../Type/type';
import { Libertinus_Sans } from 'next/font/google';
import Link from 'next/link';

const NewsCardPage = ({ news }: { news: INews }) => {
    return (
        <Link href={`/news/${news.id}`}>
            <div className="card col-span-1 bg-base-100 shadow-xl">
                <figure>
                    <Image
                        height={600}
                        width={600}
                        src={news.imageUrl}
                        alt="Shoes" />
                </figure>
                <div className="p-5">
                    <p className='text-red-500 my-2'>{news.category}</p>
                    <h2 className="card-title mb-2">{news.title}</h2>
                    <p>{news.description}</p>

                </div>
            </div>
        </Link>
    );
};

export default NewsCardPage;