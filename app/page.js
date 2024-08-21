import BestSellers from "./_components/BestSellers";
import ExtraImages from "./_components/ExtraImages";
import ImageGallery from "./_components/ImageGallery";
import ProductRange from "./_components/ProductRange";
import Slider from "./_components/Slider";
import SocialMediaPanel from "./_components/SocialMediaPanel";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24 overflow-x-hidden">
      <Slider/>
      <div className="mt-9 w-full">
        <ProductRange/>
      </div>
      <div className="mt-24 w-full">
        <ImageGallery/>
      </div>

      <div className="mt-24 w-full">
        <ExtraImages/>
      </div>
    </main>
  );
}
