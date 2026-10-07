import NewsCardPage from '@/app/components/NewsCard';
import { IArticle } from '@/app/Type/type';
import { notFound } from 'next/navigation';
import React from 'react';

const CategoryNewsPage = async({params}: {params: Promise<{categoryId: string}>}) => {
    const {categoryId} = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const news:IArticle[] = data.data;
      if(!news){
        notFound();
      }
    return (
        <div className='container mx-auto '>
           <div>
             <h1 className='font-bold text-xl border-b-4 border-b-red-700'>{data.title}</h1>
         <div className='grid grid-cols-3 gap-4 my-4'>
            {
           news.map((nws:IArticle, index:number) => <NewsCardPage key={index} news={nws}></NewsCardPage>)
         }
         </div>
           </div>
        </div>
    );
};
export default CategoryNewsPage;