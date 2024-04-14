const AlphabeticDirective = {
    beforeMount(el, binding, vnode) {
        let handlerInput = (e) => {
          const hasAlphabeticRgx = /^[A-Za-z0-9]+$/;
          const alphabeticRgx = /[^a-zA-Z0-9]+/g;
          if (hasAlphabeticRgx.test(e.target.value) === false) {
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.value = e.target.value.replace(alphabeticRgx, '');
            e.target.setSelectionRange(start, end);
            e.target.dispatchEvent(new CustomEvent('input'))
          }
        };
        el.addEventListener('input', handlerInput);
      }
} 
export { AlphabeticDirective }