import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { IHeading } from "../Type/type";

const Marqueepage = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const data = await res.json();
    const headLines:IHeading[] = data.data;
    return (
        <div className="bg-red-500 text-white my-5">
            <div className="flex items-center container mx-auto">
                <h1 className="bg-red-700 py-2 px-2 font-bold">সর্বশেষ</h1>
                <MarqueeText direction="right" duration={10} className="py-2">
                    {
                        headLines.map((h:IHeading, index:number) => (
                            <span key={index}>
                                <span>{h.title}</span>
                                <span className="mx-4">•</span>
                            </span>
                        ))
                    }
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marqueepage;