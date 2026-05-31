"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, User, Search, X } from "lucide-react";

import { NAV_LINKS, BRAND } from "@/lib/constants";
import { BRAND_ASSETS } from "@/lib/brand";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const LEFT_LINKS = NAV_LINKS.slice(0, 3);
const RIGHT_LINKS = NAV_LINKS.slice(3);

function CurrencyToggle({ compact = false }: { compact?: boolean }) {
const [mounted, setMounted] = useState(false);

const currency = useCurrencyStore((s) => s.currency);
const setCurrency = useCurrencyStore((s) => s.setCurrency);

useEffect(() => setMounted(true), []);

return (
<div
className={cn(
"flex items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md",
compact ? "w-fit" : "hidden lg:flex"
)}
>
{mounted &&
(["INR", "USD"] as const).map((option) => (
<button
key={option}
type="button"
onClick={() => setCurrency(option)}
className={cn(
"px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-500",
currency === option
? "bg-white text-black"
: "text-white/45 hover:text-white"
)}
>
{option} </button>
))} </div>
);
}

function NavLink({
href,
label,
pathname,
}: {
href: string;
label: string;
pathname: string;
}) {
const active = pathname === href || pathname.startsWith(`${href}/`);

return (
<Link
href={href}
className={cn(
"group relative overflow-hidden py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors duration-500 hover:text-white",
active && "text-white"
)}
> <span className="relative">
{label}

    <span
      className={cn(
        "absolute -bottom-1 left-0 h-px bg-white transition-all duration-500",
        active ? "w-full" : "w-0 group-hover:w-full"
      )}
    />
  </span>
</Link>

);
}

export function Header() {
const router = useRouter();
const pathname = usePathname();

const [mounted, setMounted] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);

const itemCount = useCartStore((s) => s.getItemCount());
const { isAuthenticated } = useAuthStore();

useEffect(() => setMounted(true), []);

useEffect(() => {
const onScroll = () => {
setScrolled(window.scrollY > 24);
};


window.addEventListener("scroll", onScroll, { passive: true });

return () => window.removeEventListener("scroll", onScroll);

}, []);

useEffect(() => {
if (typeof window !== "undefined") {
  document.body.style.overflow = mobileOpen ? "hidden" : "";
}
return () => {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "";
  }
};
}, [mobileOpen]);

useEffect(() => {
setMobileOpen(false);
}, [pathname]);

return (
<>
<motion.header
initial={false}
animate={{
backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
backgroundColor: scrolled
? "rgba(5,5,5,0.72)"
: "rgba(5,5,5,0)",
borderColor: scrolled
? "rgba(255,255,255,0.08)"
: "rgba(255,255,255,0)",
}}
transition={{
duration: 0.7,
ease: [0.22, 1, 0.36, 1],
}}
className="fixed inset-x-0 top-0 z-50 border-b"
> <div className="page-container flex h-[4.75rem] items-center justify-between">
{/* Left */} <div className="flex flex-1 items-center gap-8">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex items-center justify-center p-3 text-white md:hidden hover:bg-white/10 active:bg-white/20"
        >
          <Menu className="h-6 w-6" />
        </button>


        <nav className="hidden items-center gap-8 lg:flex">
          {LEFT_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
        </nav>
      </div>

      {/* Logo */}
      <Link
        href="/"
        aria-label={`${BRAND.name} home`}
        className="absolute left-1/2 -translate-x-1/2"
      >
        <motion.div
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="opacity-95"
        >
          <Image
            src={BRAND_ASSETS.logo}
            alt={BRAND.name}
            width={150}
            height={42}
            priority
            className="hidden h-9 w-auto object-contain sm:block"
          />

          <span className="font-display text-xl tracking-[0.35em] text-white sm:hidden">
            {BRAND.name}
          </span>
        </motion.div>
      </Link>

      {/* Right */}
      <div className="flex flex-1 items-center justify-end gap-5">
        <nav className="hidden items-center gap-8 lg:flex">
          {RIGHT_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
        </nav>

        <CurrencyToggle />

        <button
          type="button"
          onClick={() => router.push("/search")}
          aria-label="Search"
          className="hidden text-white/55 transition-colors duration-500 hover:text-white md:flex"
        >
          <Search className="h-[18px] w-[18px] stroke-[1.5]" />
        </button>

        {mounted && isAuthenticated ? (
          <Link
            href="/account"
            aria-label="Account"
            className="hidden text-white/55 transition-colors duration-500 hover:text-white sm:flex"
          >
            <User className="h-[18px] w-[18px] stroke-[1.5]" />
          </Link>
        ) : (
          <Link
            href="/login"
            className="hidden text-[11px] uppercase tracking-[0.18em] text-white/55 transition-colors duration-500 hover:text-white sm:flex"
          >
            Login
          </Link>
        )}

        <Link
          href="/cart"
          aria-label="Cart"
          className="relative text-white/60 transition-colors duration-500 hover:text-white"
        >
          <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />

          {mounted && itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-medium text-black">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  </motion.header>

  {/* Mobile Menu */}
  <AnimatePresence>
    {mobileOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="relative flex h-full flex-col">
          {/* Top */}
          <div className="page-container flex h-[4.75rem] items-center justify-between border-b border-white/10">
            <Image
              src={BRAND_ASSETS.logo}
              alt={BRAND.name}
              width={125}
              height={36}
              className="h-8 w-auto object-contain opacity-95"
            />

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-white/60 transition-colors duration-500 hover:text-white"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Nav */}
          <nav className="page-container flex flex-1 flex-col justify-center">
            <div className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 py-5"
                  >
                    <span className="font-display text-[clamp(2.5rem,10vw,5rem)] leading-none tracking-tight text-white transition-transform duration-700 group-hover:translate-x-2">
                      {link.label}
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-14 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.18em] text-white/40"
            >
              {mounted && isAuthenticated ? (
                <Link href="/account" onClick={() => setMobileOpen(false)}>Account</Link>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              )}

              <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart</Link>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/search");
                }}
                className="transition-colors duration-500 hover:text-white"
              >
                Search
              </button>

              <CurrencyToggle compact />
            </motion.div>
          </nav>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</>


);
}
