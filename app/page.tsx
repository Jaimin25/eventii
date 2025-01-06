import BrowserEventsComponent from "@/components/Landing/BrowseEvents";
import HeroComponent from "@/components/Landing/Hero";

export default async function Home() {
  return (
    <>
      <HeroComponent />
      <BrowserEventsComponent />
    </>
  );
}
