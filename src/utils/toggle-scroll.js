export const toggleScroll = {
  ref: {
    body: document.querySelector('body'),
  },

  scrollOff() {
    this.ref.body.style.overflow = 'hidden';
  },

  scrollOn() {
    this.ref.body.style.overflow = 'visible';
  },
};
