import topwear from "@/assets/cat-topwear.jpg";
import bottomwear from "@/assets/cat-bottomwear.jpg";
import footwear from "@/assets/cat-footwear.jpg";
import accessories from "@/assets/cat-accessories.jpg";
import newArrival from "@/assets/cat-new.jpg";
import hoodie from "@/assets/cat-hoodie.jpg";
import bag from "@/assets/cat-bag.jpg";

export type SubCategory = {
  title: string;
  image: string;
  route: string;
};

export type Category = {
  id: string;
  title: string;
  tint: string; // css var name for the pastel background
  items: SubCategory[];
};

export const categories: Category[] = [
  {
    id: "topwear",
    title: "Topwear",
    tint: "var(--tint-pink)",
    items: [
      { title: "All Topwear", image: topwear, route: "/topwear" },
      { title: "T-Shirts", image: topwear, route: "/topwear/t-shirts" },
      { title: "Shirts", image: newArrival, route: "/topwear/shirts" },
      { title: "Polo T-Shirts", image: topwear, route: "/topwear/polo" },
      { title: "Oversized Tees", image: hoodie, route: "/topwear/oversized" },
      { title: "Hoodies", image: hoodie, route: "/topwear/hoodies" },
      { title: "Sweatshirts", image: hoodie, route: "/topwear/sweatshirts" },
      { title: "Printed Tees", image: topwear, route: "/topwear/printed" },
      { title: "Plain Tees", image: topwear, route: "/topwear/plain" },
    ],
  },
  {
    id: "bottomwear",
    title: "Bottomwear",
    tint: "var(--tint-blush)",
    items: [
      { title: "All Bottomwear", image: bottomwear, route: "/bottomwear" },
      { title: "Jeans", image: bottomwear, route: "/bottomwear/jeans" },
      { title: "Trousers", image: bottomwear, route: "/bottomwear/trousers" },
      { title: "Joggers", image: hoodie, route: "/bottomwear/joggers" },
      { title: "Shorts", image: bottomwear, route: "/bottomwear/shorts" },
      { title: "Cargos", image: bottomwear, route: "/bottomwear/cargos" },
    ],
  },
  {
    id: "footwear",
    title: "Footwear",
    tint: "var(--tint-pink)",
    items: [
      { title: "All Footwear", image: footwear, route: "/footwear" },
      { title: "Sneakers", image: footwear, route: "/footwear/sneakers" },
      { title: "Casual Shoes", image: footwear, route: "/footwear/casual" },
      { title: "Sandals", image: footwear, route: "/footwear/sandals" },
      { title: "Sports Shoes", image: footwear, route: "/footwear/sports" },
      { title: "Loafers", image: footwear, route: "/footwear/loafers" },
    ],
  },
  {
    id: "accessories",
    title: "Accessories",
    tint: "var(--tint-blush)",
    items: [
      { title: "All Accessories", image: accessories, route: "/accessories" },
      { title: "Watches", image: accessories, route: "/accessories/watches" },
      { title: "Sunglasses", image: accessories, route: "/accessories/sunglasses" },
      { title: "Bags", image: bag, route: "/accessories/bags" },
      { title: "Belts", image: bag, route: "/accessories/belts" },
      { title: "Caps", image: accessories, route: "/accessories/caps" },
    ],
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    tint: "var(--tint-pink)",
    items: [
      { title: "This Week", image: newArrival, route: "/new/this-week" },
      { title: "Just Dropped", image: topwear, route: "/new/just-dropped" },
      { title: "Back In Stock", image: footwear, route: "/new/back-in-stock" },
      { title: "Editors Picks", image: bag, route: "/new/editors-picks" },
      { title: "Season Edit", image: hoodie, route: "/new/season-edit" },
      { title: "Limited", image: accessories, route: "/new/limited" },
    ],
  },
  {
    id: "trending",
    title: "Trending",
    tint: "var(--tint-blush)",
    items: [
      { title: "Most Loved", image: hoodie, route: "/trending/most-loved" },
      { title: "Bestsellers", image: topwear, route: "/trending/bestsellers" },
      { title: "Under ₹999", image: bottomwear, route: "/trending/under-999" },
      { title: "Street Style", image: footwear, route: "/trending/street" },
      { title: "Minimal", image: newArrival, route: "/trending/minimal" },
      { title: "Gifting", image: bag, route: "/trending/gifting" },
    ],
  },
  {
    id: "brands",
    title: "Brands",
    tint: "var(--tint-pink)",
    items: [
      { title: "All Brands", image: bag, route: "/brands" },
      { title: "Luxe", image: accessories, route: "/brands/luxe" },
      { title: "Everyday", image: topwear, route: "/brands/everyday" },
      { title: "Denim Labels", image: bottomwear, route: "/brands/denim" },
      { title: "Sportswear", image: footwear, route: "/brands/sportswear" },
      { title: "Studio", image: newArrival, route: "/brands/studio" },
    ],
  },
];
