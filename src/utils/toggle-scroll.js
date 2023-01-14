export const toggleScroll = {
  ref: {
    body: document.querySelector('body'),
  },

  scrollOff() {
    console.log(this.body);
    this.ref.body.style.overflow = 'hidden';
  },

  scrollOn() {
    this.ref.body.style.overflow = 'visible';
  },
};
