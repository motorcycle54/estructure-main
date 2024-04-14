const OnlyDigitsDirective = {
    beforeMount(el, binding, vnode) {
        let handlerInput = (e) => {
          const hasNumberRgx = /^[0-9]*$/;
          const numberRgx = /[^0-9]/g;
          if (hasNumberRgx.test(e.target.value) === false) {
            e.target.value = e.target.value.replace(numberRgx, '');
            e.target.dispatchEvent(new CustomEvent('input'))
          }
        };
        el.addEventListener('input', handlerInput);
      }
} 
export { OnlyDigitsDirective }