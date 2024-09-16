"use client";
import { AboutUs } from "../About-Us";
import { DownloadApp } from "../Download-App";
import { Features } from "../Features";
import { Hero } from "../Hero";
import { UseDetails } from "../Use-Details";

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <UseDetails />
      <AboutUs />
      {/* <DownloadApp /> */}
    </>
  );
}
