"use client";

import { FormEvent, useEffect, useState } from "react";

type Page = "home" | "package-detail" | "booking";

type NavTarget = {
  label: string;
  page: Page;
  anchor?: string;
};

type PackageId =
  | "el-nido-hopping"
  | "boracay-escape"
  | "cebu-bohol-combo"
  | "siargao-surf";

type TourPackage = {
  id: PackageId;
  title: string;
  duration: string;
  price: string;
  image: string;
  inclusions: string[];
  highlight: string;
};

type BookingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  travelers: string;
  startDate: string;
  endDate: string;
  accommodationType: string;
  specialRequests: string;
  agreeTerms: boolean;
};

const logoUrl =
  "https://count-label-48987147.figma.site/assets/Tuklas_Travel___Tours_Logo-BU9Y5I7_.png";

const navItems: NavTarget[] = [
  { label: "Home", page: "home" },
  { label: "Destinations", page: "home", anchor: "destinations" },
  { label: "Packages", page: "home", anchor: "packages" },
  { label: "Services", page: "home", anchor: "services" },
  { label: "About", page: "home", anchor: "about" },
  { label: "Contact", page: "home", anchor: "contact" },
];

const destinations = [
  {
    name: "El Nido, Palawan",
    tagline: "The Last Frontier",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=600&fit=crop&auto=format",
    badge: "Most Popular",
    badgeColor: "#1E7B68",
  },
  {
    name: "Boracay",
    tagline: "World-Class White Beach",
    image:
      "https://images.unsplash.com/photo-1553195029-754fbd369560?w=800&h=600&fit=crop&auto=format",
    badge: "Beach Paradise",
    badgeColor: "#C4923A",
  },
  {
    name: "Cebu",
    tagline: "Queen City of the South",
    image:
      "https://images.unsplash.com/photo-1573554622538-ead9c54b0d04?w=800&h=600&fit=crop&auto=format",
    badge: "Diving Hub",
    badgeColor: "#2A6B5A",
  },
  {
    name: "Bohol",
    tagline: "Chocolate Hills & Tarsiers",
    image:
      "https://images.unsplash.com/photo-1532053369071-cf1bf28109be?w=800&h=600&fit=crop&auto=format",
    badge: "Nature Escape",
    badgeColor: "#D4735A",
  },
  {
    name: "Siargao",
    tagline: "Surfing Capital of the Philippines",
    image:
      "https://images.unsplash.com/photo-1622481227477-8db839366177?w=800&h=600&fit=crop&auto=format",
    badge: "Surf & Chill",
    badgeColor: "#2A9D8B",
  },
  {
    name: "Banaue",
    tagline: "Eighth Wonder of the World",
    image:
      "https://images.unsplash.com/photo-1621217308295-afe2f0b40a69?w=800&h=600&fit=crop&auto=format",
    badge: "UNESCO Heritage",
    badgeColor: "#1B4E45",
  },
];

const packages: TourPackage[] = [
  {
    id: "el-nido-hopping",
    title: "El Nido Island Hopping",
    duration: "3 Days / 2 Nights",
    price: "PHP 8,500",
    image:
      "https://images.unsplash.com/photo-1695051702427-1c24ce3682e7?w=800&h=600&fit=crop&auto=format",
    inclusions: [
      "Hotel accommodation",
      "Island hopping tours",
      "All meals included",
      "Airport transfers",
    ],
    highlight: "Best Value",
  },
  {
    id: "boracay-escape",
    title: "Boracay Beach Escape",
    duration: "4 Days / 3 Nights",
    price: "PHP 12,000",
    image:
      "https://images.unsplash.com/photo-1594697797606-e79a612f0dec?w=800&h=600&fit=crop&auto=format",
    inclusions: [
      "Beachfront resort stay",
      "Sunset sailing cruise",
      "Water sports package",
      "Breakfast daily",
    ],
    highlight: "Top Rated",
  },
  {
    id: "cebu-bohol-combo",
    title: "Cebu-Bohol Combo",
    duration: "5 Days / 4 Nights",
    price: "PHP 15,500",
    image:
      "https://images.unsplash.com/photo-1728042743743-e2a2abf35c47?w=800&h=600&fit=crop&auto=format",
    inclusions: [
      "Dual island stays",
      "Whale shark encounter",
      "Chocolate Hills tour",
      "All transfers",
    ],
    highlight: "Fan Favorite",
  },
  {
    id: "siargao-surf",
    title: "Siargao Surf & Explore",
    duration: "4 Days / 3 Nights",
    price: "PHP 11,000",
    image:
      "https://images.unsplash.com/photo-1725357347354-12478ffe10ee?w=800&h=600&fit=crop&auto=format",
    inclusions: [
      "Surf lessons (2 sessions)",
      "Cloud 9 access",
      "Island lagoon tour",
      "Daily breakfast",
    ],
    highlight: "Adventure Pick",
  },
];

const services = [
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "Island Hopping",
    desc: "Multi-stop boat tours to hidden lagoons, secret beaches, and limestone cliffs.",
  },
  {
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    title: "Hotel & Resort Booking",
    desc: "Curated accommodations from budget guesthouses to luxury beachfront resorts.",
  },
  {
    icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    title: "Airport Transfers",
    desc: "Comfortable, punctual door-to-door transfers from every major Philippine airport.",
  },
  {
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    title: "Guided Tours",
    desc: "Experienced local guides who bring every destination to life with stories and context.",
  },
  {
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Dive & Water Sports",
    desc: "PADI-certified dive trips, snorkeling, kayaking, and stand-up paddleboarding.",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Custom Itineraries",
    desc: "Fully bespoke travel plans built around your dates, budget, and dream experiences.",
  },
];

const testimonials = [
  {
    name: "Maria Santos",
    location: "Makati City, Metro Manila",
    rating: 5,
    text: "Tuklas made our Palawan trip absolutely magical. Every detail was handled - from the airport pickup to the island hopping tours. We didn't have to worry about a single thing. Highly recommend!",
    avatar: "MS",
    tour: "El Nido Island Hopping Package",
  },
  {
    name: "James Reyes",
    location: "Cebu City",
    rating: 5,
    text: "The Cebu-Bohol combo package was worth every peso. Swimming with whale sharks at Oslob, then seeing the Chocolate Hills the next day - I still can't believe it's real. Our guide Kuya Mark was incredible.",
    avatar: "JR",
    tour: "Cebu-Bohol Combo Package",
  },
  {
    name: "Anika Dela Cruz",
    location: "Quezon City",
    rating: 5,
    text: "First-time solo traveler and Tuklas made me feel completely safe and taken care of. The Siargao surf package was perfect - even for a complete beginner like me. I caught my first wave on day two!",
    avatar: "AC",
    tour: "Siargao Surf & Explore",
  },
  {
    name: "Roberto & Linda Tan",
    location: "BGC, Taguig",
    rating: 5,
    text: "We booked a custom anniversary package to Boracay and it was beyond our expectations. Private sunset sailing, couples massage on the beach, and a candlelit dinner. Tuklas made every moment feel special.",
    avatar: "RT",
    tour: "Boracay Custom Anniversary Package",
  },
];

const gallery = [
  {
    url: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=800&fit=crop&auto=format",
    alt: "El Nido lagoon aerial view",
  },
  {
    url: "https://images.unsplash.com/photo-1529686342540-1b43aec0df75?w=600&h=400&fit=crop&auto=format",
    alt: "Traditional outrigger boat at sunset",
  },
  {
    url: "https://images.unsplash.com/photo-1553195029-754fbd369560?w=600&h=400&fit=crop&auto=format",
    alt: "Boracay white beach",
  },
  {
    url: "https://images.unsplash.com/photo-1532053369071-cf1bf28109be?w=600&h=700&fit=crop&auto=format",
    alt: "Bohol Chocolate Hills",
  },
  {
    url: "https://images.unsplash.com/photo-1621217308295-afe2f0b40a69?w=600&h=400&fit=crop&auto=format",
    alt: "Banaue rice terraces pathway",
  },
  {
    url: "https://images.unsplash.com/photo-1622481227477-8db839366177?w=600&h=700&fit=crop&auto=format",
    alt: "Siargao green landscape",
  },
];

const trustItems = [
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    label: "DOT-Accredited Agency",
    sub: "Licensed & government-certified",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Local Expert Guides",
    sub: "Native guides who love their islands",
  },
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Best Price Guarantee",
    sub: "We match any comparable offer",
  },
  {
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    label: "24/7 Travel Support",
    sub: "Always reachable, wherever you are",
  },
];

const bookingOptions = [
  {
    id: "el-nido-hopping",
    label: "El Nido Island Hopping - 3D/2N - PHP 8,500/pax",
  },
  {
    id: "boracay-escape",
    label: "Boracay Beach Escape - 4D/3N - PHP 12,000/pax",
  },
  {
    id: "cebu-bohol-combo",
    label: "Cebu-Bohol Combo - 5D/4N - PHP 15,500/pax",
  },
  {
    id: "siargao-surf",
    label: "Siargao Surf & Explore - 4D/3N - PHP 11,000/pax",
  },
  { id: "custom", label: "Custom Itinerary - Contact us for pricing" },
];

const packageDetails: Record<PackageId, TourPackage & { description: string }> = {
  "el-nido-hopping": {
    ...packages[0],
    description:
      "Glide across turquoise lagoons, limestone cliffs, and secret beaches with a compact Palawan escape made for first-time island explorers.",
  },
  "boracay-escape": {
    ...packages[1],
    description:
      "A polished beach break with resort comfort, sunset sailing, soft white sand, and enough free time to enjoy Boracay at your own pace.",
  },
  "cebu-bohol-combo": {
    ...packages[2],
    description:
      "Two islands in one seamless itinerary: Cebu's ocean encounters paired with Bohol's hills, river cruise, and Panglao coastline.",
  },
  "siargao-surf": {
    ...packages[3],
    description:
      "Learn to surf at Cloud 9, explore lagoons, and settle into the easy rhythm of the Philippines' most beloved island hangout.",
  },
};

function SvgIcon({
  path,
  className = "h-5 w-5",
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <p
        className="mb-3 text-xs font-medium uppercase tracking-widest"
        style={{ color: light ? "#6DC0B0" : "#2A9D8B" }}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-4xl font-bold leading-tight md:text-6xl ${
          light ? "text-white" : "text-[#1B4E45]"
        }`}
        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${
            light ? "text-white/70" : "text-gray-600"
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function Navbar({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (page: Page, packageId?: PackageId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || currentPage !== "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const select = (item: NavTarget) => {
    setOpen(false);
    if (item.page !== "home" || !item.anchor) {
      onNavigate(item.page);
      return;
    }
    if (currentPage === "home") {
      document.getElementById(item.anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      const anchor = item.anchor;
      onNavigate("home");
      window.setTimeout(
        () => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }
  };

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "#ffffff" : "transparent",
        boxShadow: solid
          ? "0 1px 0 rgba(27,78,69,0.10), 0 4px 24px rgba(27,78,69,0.06)"
          : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <button className="flex-shrink-0" onClick={() => onNavigate("home")}>
            <img
              alt="Tuklas Travel & Tour"
              className="h-14 w-auto object-contain"
              src={logoUrl}
            />
          </button>
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button
                className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#1E7B68]"
                key={item.label}
                onClick={() => select(item)}
                style={{ color: solid ? "#1A2E28" : "rgba(255,255,255,0.92)" }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            className="hidden rounded-full bg-[#1E7B68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2A9D8B] hover:shadow lg:block"
            onClick={() => onNavigate("booking")}
          >
            Book Now
          </button>
          <button
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            style={{ color: solid ? "#1A2E28" : "white" }}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden bg-white transition-all duration-300 lg:hidden"
        style={{
          maxHeight: open ? "420px" : "0",
          boxShadow: open ? "0 8px 32px rgba(27,78,69,0.12)" : "none",
        }}
      >
        <div className="flex flex-col gap-4 px-6 py-5">
          {navItems.map((item) => (
            <button
              className="py-1 text-left font-medium text-[#1A2E28]"
              key={item.label}
              onClick={() => select(item)}
            >
              {item.label}
            </button>
          ))}
          <button
            className="mt-2 w-full rounded-full bg-[#1E7B68] px-5 py-3 font-semibold text-white"
            onClick={() => {
              setOpen(false);
              onNavigate("booking");
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomePage({
  onNavigate,
}: {
  onNavigate: (page: Page, packageId?: PackageId) => void;
}) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const activeTestimonial = testimonials[testimonialIndex];

  useEffect(() => {
    const timer = window.setInterval(
      () => setTestimonialIndex((index) => (index + 1) % testimonials.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&h=1080&fit=crop&auto=format')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(27,78,69,0.65) 0%, rgba(30,123,104,0.35) 50%, rgba(27,78,69,0.75) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p
            className="mb-4 text-3xl"
            style={{
              color: "#F0E8D2",
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            Collect Moments, Not Just Places
          </p>
          <h1
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Discover the{" "}
            <em className="not-italic text-[#6DC0B0]">Hidden</em>
            <br />
            Wonders of the{" "}
            <em className="not-italic text-[#F0E8D2]">Philippines</em>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#F0E8D2]/85 md:text-xl">
            Over 7,000 islands await. From El Nido&apos;s turquoise lagoons to
            Banaue&apos;s ancient rice terraces - we&apos;ll take you there,
            beautifully.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              className="rounded-full bg-[#1E7B68] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2A9D8B] hover:shadow-xl"
              onClick={() =>
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Packages
            </button>
            <button
              className="rounded-full border border-white px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#1B4E45]"
              onClick={() => onNavigate("booking")}
            >
              Request a Quote
            </button>
          </div>
        </div>
        <div className="absolute bottom-20 left-6 hidden gap-4 md:flex lg:left-12">
          {[
            ["500+", "Happy Travelers"],
            ["50+", "Tour Packages"],
            ["20+", "Years Experience"],
          ].map(([value, label]) => (
            <div
              className="rounded-2xl px-5 py-3 text-center"
              key={label}
              style={{
                backdropFilter: "blur(12px)",
                background: "rgba(240,232,210,0.10)",
                border: "1px solid rgba(240,232,210,0.18)",
              }}
            >
              <div
                className="text-2xl font-bold text-[#6DC0B0]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {value}
              </div>
              <div className="text-xs text-[#F0E8D2]/65">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8F3E9] py-24" id="destinations">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            copy="From powder-white beaches to mountain terraces, every journey is chosen for beauty, story, and ease."
            eyebrow="Where to Go"
            title="Featured Destinations"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <article
                className="group relative min-h-[380px] overflow-hidden rounded-3xl shadow-lg"
                key={destination.name}
              >
                <img
                  alt={destination.name}
                  className="h-full min-h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={destination.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4E45]/85 via-[#1E7B68]/20 to-transparent" />
                <div className="absolute left-6 right-6 top-6">
                  <span
                    className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
                    style={{ background: destination.badgeColor }}
                  >
                    {destination.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <h3
                    className="mb-1 text-3xl font-bold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {destination.name}
                  </h3>
                  <p className="text-[#F0E8D2]/80">{destination.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24" id="packages">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            copy="Ready-made trips with transparent inclusions, thoughtful pacing, and reliable local support."
            eyebrow="Curated Tour Packages"
            title="Travel Beautifully"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {packages.map((pkg) => (
              <article
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                key={pkg.id}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    src={pkg.image}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#1E7B68] px-3 py-1 text-xs font-semibold text-white">
                    {pkg.highlight}
                  </span>
                </div>
                <div className="p-6">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#2A9D8B]">
                    {pkg.duration}
                  </p>
                  <h3
                    className="mb-4 text-xl font-bold text-[#1B4E45]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {pkg.title}
                  </h3>
                  <ul className="mb-5 space-y-2">
                    {pkg.inclusions.map((item) => (
                      <li className="flex items-start gap-2 text-sm text-gray-600" key={item}>
                        <SvgIcon
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1E7B68]"
                          path="M5 13l4 4L19 7"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p
                        className="text-2xl font-bold text-[#1E7B68]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {pkg.price}
                      </p>
                      <p className="text-xs text-gray-400">per person</p>
                    </div>
                    <button
                      className="rounded-full border border-[#1E7B68] px-4 py-2 text-sm font-semibold text-[#1E7B68] transition-all hover:bg-[#1E7B68] hover:text-white"
                      onClick={() => onNavigate("package-detail", pkg.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B4E45] py-24" id="services">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            copy="Everything you need before, during, and after your Philippine adventure."
            eyebrow="What We Arrange"
            light
            title="Our Travel Services"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                className="rounded-3xl border border-[#E8C97A]/40 bg-white/5 p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                key={service.title}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#6DC0B0]/20 text-[#6DC0B0]">
                  <SvgIcon path={service.icon} />
                </div>
                <h3
                  className="mb-3 text-2xl font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {service.title}
                </h3>
                <p className="leading-relaxed text-white/70">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F3E9] py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#2A9D8B]">
              Traveler Stories
            </p>
            <h2
              className="mb-8 text-4xl font-bold text-[#1B4E45] md:text-6xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Kind Words From Island-Hoppers
            </h2>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-5 flex gap-1 text-[#E8C97A]">
                {Array.from({ length: activeTestimonial.rating }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                &quot;{activeTestimonial.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E7B68] font-bold text-white">
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#1B4E45]">
                    {activeTestimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{activeTestimonial.location}</p>
                  <p className="mt-1 text-xs font-medium text-[#2A9D8B]">
                    {activeTestimonial.tour}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    className={`h-2 rounded-full transition-all ${
                      testimonialIndex === index ? "w-8 bg-[#1E7B68]" : "w-2 bg-gray-200"
                    }`}
                    key={testimonial.name}
                    onClick={() => setTestimonialIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="columns-2 gap-4 md:columns-3 lg:columns-2">
            {gallery.map((image, index) => (
              <img
                alt={image.alt}
                className={`mb-4 w-full break-inside-avoid rounded-3xl object-cover shadow-lg ${
                  index % 2 ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
                key={image.alt}
                src={image.url}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24" id="about">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#2A9D8B]">
              Why Choose Tuklas
            </p>
            <h2
              className="mb-6 text-4xl font-bold leading-tight text-[#1B4E45] md:text-6xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Designed By Locals, Loved By Travelers
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Tuklas Travel & Tour creates thoughtful Philippine journeys with
              practical logistics, warm local hosts, and the kind of small
              details that make each trip feel personal.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div className="rounded-2xl bg-[#F8F3E9] p-5" key={item.label}>
                  <SvgIcon className="mb-3 h-6 w-6 text-[#1E7B68]" path={item.icon} />
                  <p className="font-semibold text-[#1B4E45]">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              alt="Philippine island boat tour"
              className="aspect-[4/5] w-full object-cover"
              src="https://images.unsplash.com/photo-1529686342540-1b43aec0df75?w=900&h=1100&fit=crop&auto=format"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/90 p-6 shadow-lg backdrop-blur">
              <p
                className="text-3xl font-bold text-[#1E7B68]"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Since 2004
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Two decades of crafting relaxed, reliable island adventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F3E9] py-24" id="contact">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#2A9D8B]">
              Start Your Journey
            </p>
            <h2
              className="mb-5 text-4xl font-bold text-[#1B4E45] md:text-5xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Tell Us Where You Want To Go
            </h2>
            <p className="leading-relaxed text-gray-600">
              Share your dream trip and our travel specialists will reply with
              package ideas, dates, and next steps.
            </p>
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <p>
                <strong className="text-[#1B4E45]">Phone:</strong> +63 917 123 4567
              </p>
              <p>
                <strong className="text-[#1B4E45]">Email:</strong>{" "}
                hello@tuklastravels.ph
              </p>
              <p>
                <strong className="text-[#1B4E45]">Office:</strong> 123 Tuklas
                Building, Ermita, Manila
              </p>
            </div>
          </div>
          <form
            className="space-y-5 rounded-3xl bg-white p-8 shadow-sm lg:col-span-3"
            onSubmit={(event) => {
              event.preventDefault();
              onNavigate("booking");
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
                placeholder="Full name"
                required
              />
              <input
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
                placeholder="Email address"
                required
                type="email"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
                placeholder="Phone number"
              />
              <input
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
                placeholder="Preferred destination"
              />
            </div>
            <textarea
              className="min-h-32 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
              placeholder="Tell us about your dates, travelers, budget, and dream experiences..."
            />
            <button className="w-full rounded-xl bg-[#1E7B68] py-4 font-bold text-white shadow transition-colors hover:bg-[#2A9D8B]">
              Request a Quote
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function PackageDetailPage({
  packageId,
  onNavigate,
}: {
  packageId: PackageId;
  onNavigate: (page: Page, packageId?: PackageId) => void;
}) {
  const pkg = packageDetails[packageId];

  return (
    <div className="min-h-screen bg-[#F8F3E9]">
      <section className="bg-[#1B4E45] px-6 pb-16 pt-28">
        <div className="mx-auto max-w-7xl">
          <button
            className="mb-6 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            onClick={() => onNavigate("home")}
          >
            <SvgIcon className="h-4 w-4" path="M15 19l-7-7 7-7" />
            Back to Home
          </button>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6DC0B0]">
            Tour Package
          </p>
          <h1
            className="max-w-4xl text-4xl font-bold text-white md:text-6xl"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            {pkg.title}
          </h1>
          <p className="mt-4 max-w-2xl text-blue-200">{pkg.description}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <img
            alt={pkg.title}
            className="aspect-[16/10] w-full rounded-3xl object-cover shadow-xl"
            src={pkg.image}
          />
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <h2
              className="mb-5 text-3xl font-bold text-[#1B4E45]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pkg.inclusions.map((item) => (
                <div
                  className="flex items-start gap-3 rounded-2xl bg-[#F8F3E9] p-4 text-gray-700"
                  key={item}
                >
                  <SvgIcon className="mt-0.5 h-5 w-5 text-[#1E7B68]" path="M5 13l4 4L19 7" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-[#2A9D8B]">
              Starting from
            </p>
            <p
              className="mt-1 text-4xl font-bold text-[#1E7B68]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {pkg.price}
            </p>
            <p className="mb-6 text-sm text-gray-400">per person</p>
            <div className="mb-6 space-y-3 border-y border-gray-100 py-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <strong className="text-[#1B4E45]">{pkg.duration}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Style</span>
                <strong className="text-[#1B4E45]">Guided island tour</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Support</span>
                <strong className="text-[#1B4E45]">24/7 assistance</strong>
              </div>
            </div>
            <button
              className="w-full rounded-xl bg-[#1E7B68] py-3.5 font-semibold text-white transition-colors hover:bg-[#2A9D8B]"
              onClick={() => onNavigate("booking", pkg.id)}
            >
              Request This Package
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function BookingPage({
  packageId,
  onNavigate,
}: {
  packageId?: PackageId;
  onNavigate: (page: Page, packageId?: PackageId) => void;
}) {
  const [selected, setSelected] = useState<PackageId | "custom">(
    packageId ?? "el-nido-hopping",
  );
  const [status, setStatus] = useState<"form" | "confirm">("form");
  const [form, setForm] = useState<BookingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "Filipino",
    travelers: "2",
    startDate: "",
    endDate: "",
    accommodationType: "standard",
    specialRequests: "",
    agreeTerms: false,
  });
  const selectedPackage = selected === "custom" ? undefined : packageDetails[selected];
  const reference = "TKL-489147";

  const updateForm = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "confirm") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F3E9] px-6 py-24">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1E7B68]/10">
            <SvgIcon
              className="h-10 w-10 text-[#1E7B68]"
              path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </div>
          <h2
            className="mb-3 text-3xl font-bold text-[#1B4E45]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Booking Request Received!
          </h2>
          <p className="mb-8 leading-relaxed text-gray-500">
            Thank you,{" "}
            <strong className="text-[#1B4E45]">{form.firstName || "traveler"}</strong>!
            Your quote request has been submitted. Our travel specialists will
            contact you at{" "}
            <strong className="text-[#1E7B68]">
              {form.email || "your email"}
            </strong>{" "}
            within 24 hours.
          </p>
          <div className="mb-8 rounded-2xl bg-[#F8F3E9] p-6 text-left">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-[#1B4E45]">Booking Reference</h3>
              <span className="rounded-full bg-[#1E7B68] px-3 py-1 text-sm font-bold text-white">
                {reference}
              </span>
            </div>
            {selectedPackage ? (
              <div className="space-y-2 text-sm">
                <InfoRow label="Package" value={selectedPackage.title} />
                <InfoRow label="Duration" value={selectedPackage.duration} />
                <InfoRow label="Travelers" value={`${form.travelers} person(s)`} />
                <InfoRow label="Travel Date" value={form.startDate || "TBD"} />
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-500">Estimated Total</span>
                  <span className="font-bold text-[#1E7B68]">
                    {selectedPackage.price} x {form.travelers} pax
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="w-full rounded-xl bg-[#1E7B68] py-3.5 font-semibold text-white transition-colors hover:bg-[#2A9D8B]"
              onClick={() => onNavigate("home")}
            >
              Back to Home
            </button>
            <button
              className="w-full rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-600 transition-colors hover:border-[#1E7B68] hover:text-[#1E7B68]"
              onClick={() => setStatus("form")}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3E9]">
      <section className="bg-[#1B4E45] px-6 pb-16 pt-28">
        <div className="mx-auto max-w-4xl">
          <button
            className="mb-6 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            onClick={() => onNavigate("home")}
          >
            <SvgIcon className="h-4 w-4" path="M15 19l-7-7 7-7" />
            Back to Home
          </button>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6DC0B0]">
            Start Your Journey
          </p>
          <h1
            className="text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Request a Quote
          </h1>
          <p className="mt-3 max-w-xl text-blue-200">
            Fill in your details below and our team will prepare a personalized
            quote within 24 hours.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form className="space-y-6 rounded-3xl bg-white p-8 shadow-sm" onSubmit={submit}>
              <div>
                <h2
                  className="mb-4 text-lg font-bold text-[#1B4E45]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  1. Select Package
                </h2>
                <div className="space-y-2">
                  {bookingOptions.map((option) => (
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all duration-200 ${
                        selected === option.id
                          ? "border-[#1E7B68] bg-[#EAF4F2]"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                      key={option.id}
                    >
                      <input
                        checked={selected === option.id}
                        className="mt-0.5 accent-[#1E7B68]"
                        name="package"
                        onChange={() => setSelected(option.id as PackageId | "custom")}
                        type="radio"
                        value={option.id}
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2
                  className="mb-4 text-lg font-bold text-[#1B4E45]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  2. Your Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="First Name"
                    onChange={(value) => updateForm("firstName", value)}
                    placeholder="Maria"
                    required
                    value={form.firstName}
                  />
                  <Field
                    label="Last Name"
                    onChange={(value) => updateForm("lastName", value)}
                    placeholder="Santos"
                    required
                    value={form.lastName}
                  />
                  <Field
                    label="Email Address"
                    onChange={(value) => updateForm("email", value)}
                    placeholder="maria@example.com"
                    required
                    type="email"
                    value={form.email}
                  />
                  <Field
                    label="Phone Number"
                    onChange={(value) => updateForm("phone", value)}
                    placeholder="+63 917 123 4567"
                    required
                    type="tel"
                    value={form.phone}
                  />
                </div>
              </div>

              <div>
                <h2
                  className="mb-4 text-lg font-bold text-[#1B4E45]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  3. Trip Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <SelectField
                    label="No. of Travelers"
                    onChange={(value) => updateForm("travelers", value)}
                    options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]}
                    value={form.travelers}
                  />
                  <Field
                    label="Departure Date"
                    onChange={(value) => updateForm("startDate", value)}
                    required
                    type="date"
                    value={form.startDate}
                  />
                  <Field
                    label="Return Date"
                    onChange={(value) => updateForm("endDate", value)}
                    type="date"
                    value={form.endDate}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Accommodation Preference
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      ["budget", "Budget", "Hostels & guesthouses"],
                      ["standard", "Standard", "3-star hotels"],
                      ["deluxe", "Deluxe", "4-5 star resorts"],
                    ].map(([value, label, sub]) => (
                      <label
                        className={`flex cursor-pointer flex-col rounded-xl border-2 p-3 text-center transition-all ${
                          form.accommodationType === value
                            ? "border-[#1E7B68] bg-[#EAF4F2]"
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                        key={value}
                      >
                        <input
                          checked={form.accommodationType === value}
                          className="sr-only"
                          name="accommodation"
                          onChange={() => updateForm("accommodationType", value)}
                          type="radio"
                          value={value}
                        />
                        <span className="text-sm font-semibold text-[#1B4E45]">
                          {label}
                        </span>
                        <span className="mt-0.5 text-xs text-gray-400">{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Special Requests
                  </label>
                  <textarea
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
                    onChange={(event) =>
                      updateForm("specialRequests", event.target.value)
                    }
                    placeholder="Dietary requirements, anniversary arrangements, mobility needs, preferred room type..."
                    rows={3}
                    value={form.specialRequests}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  checked={form.agreeTerms}
                  className="mt-0.5 h-4 w-4 rounded accent-[#1E7B68]"
                  onChange={(event) => updateForm("agreeTerms", event.target.checked)}
                  required
                  type="checkbox"
                />
                <span className="text-sm text-gray-600">
                  I agree to Tuklas Travel & Tour&apos;s{" "}
                  <a className="text-[#1E7B68] hover:underline" href="#">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-[#1E7B68] hover:underline" href="#">
                    Privacy Policy
                  </a>
                  . I understand this is a quote request, not a confirmed booking.
                </span>
              </label>
              <button className="w-full rounded-xl bg-[#1E7B68] py-4 font-bold text-white shadow transition-colors duration-200 hover:bg-[#2A9D8B]">
                Submit Quote Request
              </button>
            </form>
          </div>
          <aside>
            {selectedPackage ? (
              <div className="sticky top-28 overflow-hidden rounded-3xl bg-white shadow-sm">
                <img
                  alt={selectedPackage.title}
                  className="aspect-video w-full object-cover"
                  src={selectedPackage.image}
                />
                <div className="p-6">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#2A9D8B]">
                    {selectedPackage.duration}
                  </p>
                  <h3
                    className="mb-4 text-lg font-bold text-[#1B4E45]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {selectedPackage.title}
                  </h3>
                  <ul className="mb-5 space-y-2">
                    {selectedPackage.inclusions.map((item) => (
                      <li className="flex items-start gap-2 text-sm text-gray-600" key={item}>
                        <SvgIcon
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1E7B68]"
                          path="M5 13l4 4L19 7"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p
                        className="text-2xl font-bold text-[#1E7B68]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {selectedPackage.price}
                      </p>
                      <p className="text-xs text-gray-400">per person</p>
                    </div>
                    <button
                      className="rounded-full border border-[#1E7B68] px-4 py-2 text-sm font-semibold text-[#1E7B68] transition-all hover:bg-[#1E7B68] hover:text-white"
                      onClick={() => onNavigate("package-detail", selectedPackage.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-sm">
                <h3
                  className="mb-2 font-bold text-[#1B4E45]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Custom Itinerary
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  Tell us your dream trip and we&apos;ll build the perfect package
                  for you.
                </p>
                <div className="space-y-3 text-sm text-gray-600">
                  {[
                    "Any destination in the Philippines",
                    "Flexible dates & duration",
                    "Any group size",
                    "Custom activities & experiences",
                  ].map((item) => (
                    <div className="flex items-start gap-2" key={item}>
                      <SvgIcon
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1E7B68]"
                        path="M5 13l4 4L19 7"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <input
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
}

function SelectField({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#1E7B68] focus:ring-2 focus:ring-[#1E7B68]/10"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-[#1B4E45]">{value}</span>
    </div>
  );
}

function Footer({
  onNavigate,
}: {
  onNavigate: (page: Page, packageId?: PackageId) => void;
}) {
  const scrollHome = (anchor: string) => {
    onNavigate("home");
    window.setTimeout(
      () => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  };

  return (
    <footer className="bg-[#1B4E45] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              alt="Tuklas Travel & Tour"
              className="mb-5 h-20 w-auto object-contain"
              src={logoUrl}
            />
            <p className="text-sm leading-relaxed text-[#F0E8D2]/75">
              Discover the beauty of the Philippines with Tuklas Travel & Tour -
              your trusted partner for unforgettable island adventures since 2004.
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#F0E8D2]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                ["Home", () => onNavigate("home")],
                ["Destinations", () => scrollHome("destinations")],
                ["Tour Packages", () => scrollHome("packages")],
                ["Our Services", () => scrollHome("services")],
                ["About Us", () => scrollHome("about")],
                ["Contact", () => scrollHome("contact")],
              ].map(([label, fn]) => (
                <li key={label as string}>
                  <button
                    className="text-sm text-[#F0E8D2]/65 transition-colors hover:text-[#6DC0B0]"
                    onClick={fn as () => void}
                  >
                    {label as string}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#F0E8D2]">
              Top Destinations
            </h4>
            <ul className="space-y-3 text-sm text-[#F0E8D2]/65">
              {[
                "El Nido, Palawan",
                "Boracay",
                "Cebu",
                "Bohol",
                "Siargao",
                "Banaue",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#F0E8D2]">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-[#F0E8D2]/65">
              <li>123 Tuklas Building, Ermita Manila, Philippines 1000</li>
              <li>+63 917 123 4567</li>
              <li>hello@tuklastravels.ph</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#F0E8D2]/10 pt-8 sm:flex-row">
          <p className="text-sm text-[#F0E8D2]/45">
            &copy; 2026 Tuklas Travel & Tour. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#F0E8D2]/45">
            <a className="transition-colors hover:text-[#6DC0B0]" href="#">
              Privacy Policy
            </a>
            <a className="transition-colors hover:text-[#6DC0B0]" href="#">
              Terms of Service
            </a>
            <a className="transition-colors hover:text-[#6DC0B0]" href="#">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function TuklasClone() {
  const [page, setPage] = useState<Page>("home");
  const [activePackage, setActivePackage] = useState<PackageId | undefined>();

  const navigate = (nextPage: Page, packageId?: PackageId) => {
    setPage(nextPage);
    setActivePackage(packageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col text-[#1A2E28]">
      <Navbar currentPage={page} onNavigate={navigate} />
      <main className="flex-1">
        {page === "home" ? <HomePage onNavigate={navigate} /> : null}
        {page === "package-detail" ? (
          <PackageDetailPage
            onNavigate={navigate}
            packageId={activePackage ?? "el-nido-hopping"}
          />
        ) : null}
        {page === "booking" ? (
          <BookingPage onNavigate={navigate} packageId={activePackage} />
        ) : null}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
