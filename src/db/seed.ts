import "dotenv/config";
import { closeDatabase, db, products } from "./index";

const amzImg = (id: string) =>
  `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;

// Real, currently-listed Amazon products (ASINs verified Oct 2026).
// Prices/ratings are snapshots — the live Amazon listing is authoritative.
const PRODUCTS = [
  {
    slug: "logitech-g-pro-x-superlight-2",
    name: "Logitech G PRO X Superlight 2",
    tagline: "60g. 44K DPI. The esports endgame mouse.",
    description:
      "The mouse you see on every pro stage. Logitech's PRO X Superlight 2 pairs a 60-gram symmetrical shell with the 44,000 DPI HERO2 sensor, sub-8kHz LIGHTSPEED wireless polling, USB-C charging, and PowerPlay compatibility. Our top pick for competitive FPS — check the live Amazon listing for today's price and thousands of verified reviews.",
    category: "Mice",
    price: 15999,
    compareAtPrice: 17999,
    amazonUrl: "https://www.amazon.com/dp/B09NBWL8J5",
    image: amzImg("21+V7OqgCEL"),
    rating: 4.7,
    ratingCount: 18400,
    features: [
      "60g ultralight symmetrical design",
      "HERO2 sensor — up to 44,000 DPI",
      "LIGHTSPEED wireless, USB-C charging",
      "PowerPlay wireless charging compatible",
    ],
    badge: "Best Seller",
    featured: true,
  },
  {
    slug: "razer-deathadder-v3-pro",
    name: "Razer DeathAdder V3 Pro (White)",
    tagline: "The iconic ergonomic shape, perfected at 64g.",
    description:
      "Razer's legendary DeathAdder ergonomics rebuilt for wireless — 64 grams, Focus Pro 30K optical sensor, Gen-3 optical switches, and 90 hours of HyperSpeed wireless battery. A massive community favorite with one of the highest rating counts in gaming mice. See live pricing and color options on Amazon.",
    category: "Mice",
    price: 7999,
    compareAtPrice: 14999,
    amazonUrl: "https://www.amazon.com/dp/B0B6Y52YXB",
    image: amzImg("31RniNAAGpL"),
    rating: 4.6,
    ratingCount: 9200,
    features: [
      "64g with iconic ergonomic shape",
      "Focus Pro 30K optical sensor",
      "90-hour HyperSpeed wireless battery",
      "Optical Mouse Switches Gen-3",
    ],
    badge: "Deal",
    featured: true,
  },
  {
    slug: "keychron-k8-pro",
    name: "Keychron K8 Pro Wireless Mechanical Keyboard",
    tagline: "QMK/VIA, hot-swap, and silence-friendly tactility.",
    description:
      "A wireless tenkeyless that works as hard as you game. The Keychron K8 Pro brings QMK/VIA programmability, hot-swappable Gateron G Pro Brown switches, PBT keycaps, Bluetooth 5.1 plus wired modes, and Mac/Windows keycaps in the box. One of the best-reviewed wireless mechanical boards on Amazon.",
    category: "Keyboards",
    price: 8799,
    compareAtPrice: 11499,
    amazonUrl: "https://www.amazon.com/dp/B09MNFMLSV",
    image: amzImg("41HHSRrI-fL"),
    rating: 4.5,
    ratingCount: 6100,
    features: [
      "QMK/VIA programmable, hot-swappable",
      "Gateron G Pro Brown tactile switches",
      "Bluetooth 5.1 + wired, 4000mAh battery",
      "Mac & Windows keycaps included",
    ],
    badge: null,
    featured: true,
  },
  {
    slug: "razer-huntsman-mini",
    name: "Razer Huntsman Mini 60% (Clicky, Black)",
    tagline: "60% footprint. 100% tournament weapon.",
    description:
      "The compact board that defined the 60% meta. Clicky optical switches actuate at the speed of light, doubleshot PBT keycaps survive years of abuse, and onboard memory carries your profiles to any LAN PC. Frequently discounted on Amazon — grab it on sale.",
    category: "Keyboards",
    price: 6900,
    compareAtPrice: 11999,
    amazonUrl: "https://www.amazon.com/dp/B08BFF4C7J",
    image: amzImg("41gm2B5RShL"),
    rating: 4.7,
    ratingCount: 10621,
    features: [
      "Clicky optical switches, rapid actuation",
      "60% layout frees up mouse space",
      "Doubleshot PBT keycaps, alloy top frame",
      "Onboard memory + Chroma RGB",
    ],
    badge: "Deal",
    featured: false,
  },
  {
    slug: "hyperx-cloud-ii",
    name: "HyperX Cloud II Gaming Headset (Red)",
    tagline: "The decade-long comfort king with 7.1 surround.",
    description:
      "Over 100,000 Amazon ratings don't lie. The HyperX Cloud II's aluminum frame, memory-foam earcups, detachable noise-cancelling mic, and USB 7.1 surround box have made it the default recommendation for a decade. Durable, comfortable, and often under $60 on Amazon.",
    category: "Audio",
    price: 5999,
    compareAtPrice: 9999,
    amazonUrl: "https://www.amazon.com/dp/B00SAYCXWG",
    image: amzImg("41SkA5j2l-L"),
    rating: 4.5,
    ratingCount: 115689,
    features: [
      "7.1 virtual surround via USB sound card",
      "Detachable noise-cancelling mic",
      "Memory foam + durable aluminum frame",
      "Works with PC, PS5, Xbox, Switch",
    ],
    badge: "Best Seller",
    featured: true,
  },
  {
    slug: "steelseries-arctis-nova-7",
    name: "SteelSeries Arctis Nova 7 Wireless (Black)",
    tagline: "Dual wireless. 38-hour battery. Zero compromise.",
    description:
      "Game on 2.4GHz while Discord runs over simultaneous Bluetooth — the Nova 7's dual-wireless design is genuinely life-changing. Add Nova acoustic drivers, a ClearCast Gen 2 AI mic, and 38-hour battery with USB-C fast charge. Check Amazon for the latest price across colors.",
    category: "Audio",
    price: 17995,
    compareAtPrice: null,
    amazonUrl: "https://www.amazon.com/dp/B0B15QM5LL",
    image: amzImg("611LReeBjVL"),
    rating: 4.4,
    ratingCount: 5200,
    features: [
      "Simultaneous 2.4GHz + Bluetooth audio",
      "38-hour battery, USB-C fast charge",
      "ClearCast Gen 2 AI noise-cancelling mic",
      "PC, PS5, Switch, mobile compatible",
    ],
    badge: null,
    featured: false,
  },
  {
    slug: "lg-ultragear-27gp950",
    name: "LG UltraGear 27GP950-B 27\" 4K 144Hz",
    tagline: "4K Nano IPS at 144Hz with HDMI 2.1.",
    description:
      "The sweet-spot 4K gaming monitor: 27 inches of Nano IPS color (98% DCI-P3), 1ms response, 144Hz overclockable to 160Hz, HDMI 2.1 for full-bandwidth PS5/Xbox Series X play, plus G-SYNC and FreeSync Premium Pro. Heavily discounted on Amazon more often than you'd think.",
    category: "Monitors",
    price: 64999,
    compareAtPrice: 89999,
    amazonUrl: "https://www.amazon.com/dp/B096TX9P4D",
    image: amzImg("41-SV7NZ-LS"),
    rating: 4.6,
    ratingCount: 4300,
    features: [
      "27\" 4K UHD Nano IPS, 144Hz (160Hz OC)",
      "HDMI 2.1 — full 4K/120 on consoles",
      "1ms GtG, G-SYNC + FreeSync Premium Pro",
      "98% DCI-P3, DisplayHDR 600",
    ],
    badge: "Deal",
    featured: false,
  },
  {
    slug: "msi-rtx-4070-ventus-2x",
    name: "MSI GeForce RTX 4070 VENTUS 2X 12G OC",
    tagline: "12GB GDDR6X. 1440p ultra king, 4K capable.",
    description:
      "The rational enthusiast's GPU: RTX 4070 silicon with 12GB GDDR6X, a factory overclock, and MSI's dual TORX 4.0 fan cooler in a compact 2-slot card that actually fits normal cases. DLSS 3 frame generation makes it punch far above its weight. Compare sellers and live pricing on Amazon.",
    category: "Components",
    price: 83900,
    compareAtPrice: null,
    amazonUrl: "https://www.amazon.com/dp/B0BYZJWDNC",
    image: amzImg("41sqGzjx7GL"),
    rating: 4.5,
    ratingCount: 800,
    features: [
      "RTX 4070, 12GB GDDR6X, factory OC",
      "Dual TORX FAN 4.0, zero-frozr mode",
      "DLSS 3 + full ray tracing support",
      "Compact 2-slot, 200mm length",
    ],
    badge: null,
    featured: false,
  },
  {
    slug: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB NVMe SSD",
    tagline: "7,450 MB/s. Load screens cease to exist.",
    description:
      "Samsung's flagship Gen4 drive: up to 7,450 MB/s sequential reads, class-leading efficiency, and the reliability record that made the 990 PRO the default SSD recommendation. 2TB is the sweet spot for a modern game library. See Amazon for heatsink vs. bare options.",
    category: "Components",
    price: 40999,
    compareAtPrice: null,
    amazonUrl: "https://www.amazon.com/dp/B0BHJJ9Y77",
    image: amzImg("41Jf2yGpAgL"),
    rating: 4.8,
    ratingCount: 25400,
    features: [
      "Up to 7,450 / 6,900 MB/s read/write",
      "2TB capacity, PCIe 4.0 x4 M.2 2280",
      "Nickel-coated controller, power efficient",
      "PS5 compatible (heatsink model)",
    ],
    badge: "Best Seller",
    featured: false,
  },
  {
    slug: "xbox-elite-series-2",
    name: "Xbox Elite Wireless Controller Series 2 (Black)",
    tagline: "Adjustable sticks, 4 paddles, 40-hour battery.",
    description:
      "The pro controller standard on Xbox and PC: adjustable-tension thumbsticks, wrap-around rubber grips, 4 remappable paddles, hair-trigger locks, and a 40-hour rechargeable battery with charging dock in the box. Routinely discounted on Amazon — one of the best controller deals in gaming.",
    category: "Controllers",
    price: 16799,
    compareAtPrice: 19999,
    amazonUrl: "https://www.amazon.com/dp/B07SFKTLZM",
    image: amzImg("41Olt1+b1hL"),
    rating: 4.4,
    ratingCount: 29269,
    features: [
      "Adjustable-tension thumbsticks",
      "4 remappable paddles + trigger locks",
      "40-hour battery, dock + USB-C included",
      "Xbox, PC, and mobile compatible",
    ],
    badge: "Best Seller",
    featured: true,
  },
  {
    slug: "gtracing-footrest-chair",
    name: "GTRACING Gaming Chair with Footrest",
    tagline: "Amazon's best-selling throne for a reason.",
    description:
      "One of Amazon's best-selling gaming chairs year after year: high-back ergonomic design, retractable footrest, 90–160° recline, adjustable armrests and height, plus headrest and lumbar pillows in the box. An absurd value pick that regularly drops under $130.",
    category: "Chairs",
    price: 12999,
    compareAtPrice: 18999,
    amazonUrl: "https://www.amazon.com/dp/B0F2J176C2",
    image: amzImg("41LWVsnXJfL"),
    rating: 4.3,
    ratingCount: 24100,
    features: [
      "Retractable footrest + 90–160° recline",
      "Headrest + lumbar support pillows",
      "Height-adjustable, 360° swivel",
      "Heavy-duty metal frame, PU leather",
    ],
    badge: "Deal",
    featured: false,
  },
  {
    slug: "elgato-wave-3",
    name: "Elgato Wave:3 USB Condenser Microphone",
    tagline: "Broadcast sound with Clipguard that never distorts.",
    description:
      "The streamer's default mic: a cardioid condenser capsule at 24-bit/96kHz, proprietary Clipguard anti-distortion, tap-to-mute capacitive button, and the free Wave Link mixer software that routes up to 8 audio sources. Sound like a broadcast, not a group call.",
    category: "Streaming",
    price: 10499,
    compareAtPrice: 14999,
    amazonUrl: "https://www.amazon.com/dp/B088HHWC47",
    image: amzImg("31A4l2i7pwL"),
    rating: 4.7,
    ratingCount: 15300,
    features: [
      "Cardioid condenser, 24-bit/96kHz",
      "Clipguard anti-distortion technology",
      "Free Wave Link mixer software",
      "USB-C plug-and-play, Mac + PC",
    ],
    badge: "Staff Pick",
    featured: true,
  },
];

async function seed() {
  await db.delete(products);
  await db.insert(products).values(PRODUCTS);
  console.log(`Seeded ${PRODUCTS.length} Amazon affiliate products.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => closeDatabase());
