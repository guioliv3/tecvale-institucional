import type { ComponentType } from "react";
import { HeroCarousel } from "./HeroCarousel";
import { IntroSection } from "./IntroSection";
import { GalleryCarousel } from "./GalleryCarousel";
import { ProjectsShowcase } from "./ProjectsShowcase";
import { FeaturedProject } from "./FeaturedProject";
import { InstagramSection } from "./InstagramSection";
import { HomeContactSection } from "./HomeContactSection";

/** Única fonte da ordem dos blocos da home (sequência da AG7: hero → ... → rodapé). */
export const homeSections: { id: string; Component: ComponentType }[] = [
  { id: "hero", Component: HeroCarousel },
  { id: "intro", Component: IntroSection },
  { id: "galeria", Component: GalleryCarousel },
  { id: "empreendimentos", Component: ProjectsShowcase },
  { id: "destaque", Component: FeaturedProject },
  { id: "instagram", Component: InstagramSection },
  { id: "contato", Component: HomeContactSection },
];
