import MainNewspage from "./components/MainNews";
import MostReadNewsPage from "./components/MostReadNews";
import NewsCardPage from "./components/NewsCard";
import { ICuration, INews } from "./Type/type";

export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections')
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles
  const otherSection:ICuration[] = sections.slice(1);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 container mx-auto my-5">
        {/* news section  */}
        <div className="col-span-2">
          <MainNewspage news={mainNews}></MainNewspage>

          {/* others news  */}
          <div>
            {
              otherSection.map((other:ICuration, index:number) => <div key={other.curationId}>
                <h1 className="border-b-2 my-6 border-red-500">{other.title}</h1>
                <div className="grid grid-cols-3 gap-2">
                  {
                    other.articles.map((news) => <NewsCardPage key={news.id} news={news}></NewsCardPage>)
                  }
                </div>
              </div>)
            }
          </div>
        </div>

        {/* most read section  */}
        <div className="col-span-1">
           <MostReadNewsPage></MostReadNewsPage>
        </div>
      </div>

    </div>
  );
}
