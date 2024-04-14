const CapitalLettersDirective = {
    beforeMount(el, binding, vnode) {
        let handlerInput = (e) => {
          const hasLowercaseRgx = /[a-z]/;
          if (hasLowercaseRgx.test(e.target.value) === true) {
            e.target.value = e.target.value.toUpperCase()
            e.target.dispatchEvent(new CustomEvent('input'))
          }
        };
        el.addEventListener('input', handlerInput);
      }
} 
export { CapitalLettersDirective }