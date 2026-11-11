import { FlowerShower } from "@/components/site/LivingDecor";
import CoupleFilm from "@/components/site/CoupleFilm";
import TempleScene from "@/components/site/TempleScene";
import Events from "@/components/site/Events";
import GalleryStack from "@/components/site/GalleryStack";
import Venue from "@/components/site/Venue";
import CountdownScene from "@/components/site/CountdownScene";
import Footer from "@/components/site/Footer";
import { getSiteUrl, shareMetadata } from "@/lib/site";
import { wedding } from "@/lib/wedding";
import MusicToggle from "@/components/site/MusicToggle";
import StoryMotion from "@/components/site/StoryMotion";
import OpeningEnvelope from "@/components/site/OpeningEnvelope";
import FamilyBlessing from "@/components/site/FamilyBlessing";
import ChapterBlend from "@/components/site/ChapterBlend";
import Wishes from "@/components/site/Wishes";

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${wedding.bride.fullName} & ${wedding.groom.fullName} — Wedding`,
    startDate: wedding.dateIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: siteUrl,
    location: {
      "@type": "Place",
      name: wedding.venues[1].name,
      address: {
        "@type": "PostalAddress",
        streetAddress: wedding.venues[1].address,
        addressLocality: "Greater Noida West",
        addressRegion: "Uttar Pradesh",
        postalCode: "201009",
        addressCountry: "IN",
      },
    },
    image: [
      new URL(shareMetadata.image.url, siteUrl).toString(),
      new URL("/images/ayusha-deepak-3.jpg", siteUrl).toString(),
    ],
    description: shareMetadata.ogDescription,
    organizer: {
      "@type": "Person",
      name: "The families of Ayusha and Deepak",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryMotion />
      <MusicToggle />
      <FlowerShower />
      <main>
        <OpeningEnvelope />
        <TempleScene />
        <ChapterBlend tone="light" />
        <FamilyBlessing />
        <ChapterBlend tone="warm" />
        <Events />
        <ChapterBlend tone="dark" />
        <CoupleFilm />
        <ChapterBlend tone="dark" />
        <GalleryStack />
        <ChapterBlend tone="light" />
        <Venue />
        <ChapterBlend tone="warm" />
        <Wishes />
        <ChapterBlend tone="dark" />
        <CountdownScene />
      </main>
      <Footer />
    </>
  );
}
