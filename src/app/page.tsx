import Cards from "@/components/Memolab/Cards";
import Hero from "@/components/Memolab/Hero";
import Nft from "@/components/Nft";
import Navigation from "@/components/Reusable/Header";


export default function Home() {
  return (
    <div className="bg w-full">
      <Navigation />
      <Hero />
      <Cards />
      <Nft />
    </div>
  );
}
