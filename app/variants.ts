import { Variants } from "framer-motion";

export const FadeInVariants = (
  yOffset: number = 20,
  delay: number = 0
): Variants => ({
  hidden: {
    opacity: 0,
    y: yOffset,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeInOut",
      delay,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 200,
      damping: 18,
    },
  },
});
export const ScrollFadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      ease: "easeInOut",
    },
  },
};
