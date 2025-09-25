import Cards from "@/components/Memolab/Cards";
import Hero from "@/components/Memolab/Hero";
import Nft from "@/components/Nft";


export default function Home() {
  return (
    <div className="bg w-full">
      <Hero />
      <Cards />
      <Nft />
    </div>
  );
}
