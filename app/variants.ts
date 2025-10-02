import { Variants } from "framer-motion";
export const FadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "tween",
      ease: "easeInOut",
    },
  },
};
