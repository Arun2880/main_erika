export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.25],

      }
    }
  }
}

export const flip = {
  initial: {
    rotateY: 0, // Start at 0 degrees
  },
  animate: {
    rotateY: 360, // Rotate to 180 degrees
    transition: {
      type: 'tween',
      duration: 1, // Duration of the flip
      ease: [0.25, 0.1, 0.25, 1], // Easing function for smoothness
    },
  },
  exit: {
    rotateY: 0, // Flip back to the original position
    transition: {
      type: 'tween',
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

