import { CinematicSlider } from "@/components/home/cinematic-slider";
import { FeaturedDrop } from "@/components/home/featured-drop";
import { LookbookPreview } from "@/components/home/lookbook-preview";
import { PhilosophySection } from "@/components/home/philosophy-section";
import { BestsellersSection } from "@/components/home/bestsellers-section";
import { MaterialSection } from "@/components/home/material-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
return ( <main className="overflow-hidden bg-background text-foreground">
{/* Header offset */} <div className="h-16 md:h-20" />

  <section>
    <CinematicSlider />
  </section>

  <section>
    <FeaturedDrop />
  </section>

  <section>
    <LookbookPreview />
  </section>

  <section>
    <PhilosophySection />
  </section>

  <section>
    <BestsellersSection />
  </section>

  <section>
    <MaterialSection />
  </section>

  <section>
    <NewsletterSection />
  </section>
</main>


);
}
