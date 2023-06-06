export default {
    mounted(el) {
    const body = document.querySelector('html');

    function blockScroll() {
      body.style.overflow = 'hidden';
    }

    blockScroll();

  },
  unmounted() {
    const body = document.querySelector('html');
    function unblockScroll() {
      body.style.overflow = 'auto';
    }
    unblockScroll();

    
  },
}