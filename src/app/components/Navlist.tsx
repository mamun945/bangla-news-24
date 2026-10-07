
import Link from "next/link";
import { ICategory } from "../Type/type";


const NavlistPage = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    const data = await res.json();
    const datas = data.data;
    const filterNavs = datas.filter((data: ICategory) => data.scrapable)
    return (
        <div className='flex justify-center items-center gap-5 my-5'>
            <Link href={'/'} className="hover:text-red-500">হোম</Link>
            {
            filterNavs.map((data: ICategory, index: number) =>
            <Link href={`/category/${data.slug}`} key={index} className='hover:text-red-500' >{data.title}</Link>)
            }
        </div>
    );
};

export default NavlistPage;