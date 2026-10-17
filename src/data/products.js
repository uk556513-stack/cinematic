export const products = [
  {
    id: 1,
    name: "Chronograph Elite",
    category: "Men",
    price: 12999,
    oldPrice: 15999,
    rating: 4.8,
    badge: "BESTSELLER",
    description:
      "A sophisticated chronograph watch featuring a premium dial, elegant case, and timeless styling.",
    image:
      "https://images.stockcake.com/public/0/a/f/0afc8b89-43f9-44a2-87ab-fc514cc3be4f/premium-steel-chronograph-stockcake.jpg",
  },
  {
    id: 2,
    name: "Royal Gold Classic",
    category: "Men",
    price: 9999,
    oldPrice: 12499,
    rating: 4.7,
    badge: "POPULAR",
    description:
      "A refined gold-tone timepiece designed to complement formal wear and special occasions.",
    image:
      "https://ankaaara.com/cdn/shop/files/a__A_cinematic__high-e.jpg?v=1765564377&width=1445",
  },
  {
    id: 3,
    name: "Rose Elegance",
    category: "Women",
    price: 8499,
    oldPrice: 10999,
    rating: 4.9,
    badge: "NEW ARRIVAL",
    description:
      "A graceful rose-tone watch with a delicate profile and a polished, elegant finish.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.CkZA7VBf6W98XMIwe3qq9gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 4,
    name: "Midnight Minimal",
    category: "Men",
    price: 7499,
    oldPrice: 9499,
    rating: 4.6,
    badge: "",
    description:
      "A minimalist everyday watch with a clean dial and versatile contemporary design.",
    image:
      "https://www.dapper-watches.com/cdn/shop/files/minimalist-quartz-watch-dark-night-black-edition-ceramic-matte-finish-557.jpg?v=1768963015&width=3840",
  },
  {
    id: 5,
    name: "Diamond Grace",
    category: "Women",
    price: 14999,
    oldPrice: 17999,
    rating: 4.9,
    badge: "PREMIUM",
    description:
      "An elegant statement timepiece designed for celebrations, evenings, and memorable moments.",
    image:
      "https://cdn1.jewelxy.com/live/img/business_product/PkAXcEmZB4_20210829102717.jpg",
  },
  {
    id: 6,
    name: "Sport Active Pro",
    category: "Sports",
    price: 5999,
    oldPrice: 7999,
    rating: 4.5,
    badge: "TRENDING",
    description:
      "A sporty everyday timepiece with a bold design suitable for active lifestyles.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.fKk4e-Tyaha0C-q-kNjV-gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 7,
    name: "Heritage Silver",
    category: "Men",
    price: 11499,
    oldPrice: 13999,
    rating: 4.7,
    badge: "MNMLST",
    description:
      "A classic silver-tone watch combining timeless styling with modern everyday versatility.",
    image:
      "https://www.mnmlst.in/cdn/shop/products/Heritage-_Silver.jpg?v=1705235535&width=1445",
  },
  {
    id: 8,
    name: "Petite Rose",
    category: "Women",
    price: 6999,
    oldPrice: 8999,
    rating: 4.6,
    badge: "SPECIAL PICK",
    description:
      "A delicate watch with a contemporary look, designed to add a subtle finishing touch.",
    image:
      "https://down-ph.img.susercontent.com/file/cn-11134207-7ras8-ma6qhz1tf0jl99",
  },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);