const MaxLengthDirective = {
    beforeMount: function(el, binding) {
        let max_chars = binding.value;
        let handlerInput = (e) => {
          if (e.target.value.length > max_chars) {
            e.target.value = e.target.value.substr(0, max_chars);
            e.target.dispatchEvent(new CustomEvent('input'))
          }
        };
        el.addEventListener('input', handlerInput);
      }
} 
export { MaxLengthDirective }