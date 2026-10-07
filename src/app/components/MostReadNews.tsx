import React from 'react';
import { IArticle } from '../Type/type';

const MostReadNewsPage = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/category/technology');
    const data = await res.json();
    const news:IArticle[] = data.data;
    return (
        <div className='card p-4 bg-bas-100 border border-gray-100 shadow-xl'>
           <h1 className='font-bold text-red-700 p-4'>সর্বাধিক পঠিত</h1>
            <div className='px-4'>
                {
                  news.map((nws:IArticle, index:number)=> <div key={nws.id ?? index} className='flex gap-2 py-3'>
                    <p className='text-2xl font-bold text-red-500'>{index + 1}</p>
                    <h2 className='hover:text-red-500'>{nws.title}</h2>
                  </div>)
                }
            </div>
        </div>
    );
};

export default MostReadNewsPage;