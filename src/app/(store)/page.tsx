import { CategoryShowcase } from "@/components/home/category-showcase";
import { HeroSlider } from "@/components/home/hero-slider";
import { TrendingProducts } from "@/components/home/trending-products";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <CategoryShowcase />
      <TrendingProducts />
    </>
  );
}
