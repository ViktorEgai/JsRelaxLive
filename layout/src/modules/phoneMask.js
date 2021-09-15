const phoneMask = () => { 
  const input = document.querySelectorAll('input');
  
  input.forEach(item=> {
    if (item.getAttribute('name') === 'phone') {
      let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;

            if (pos < 3) event.preventDefault();
            
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                newValue = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                newValue = newValue.slice(0, i);
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        item.addEventListener("input", mask, false);
        item.addEventListener("focus", mask, false);
        item.addEventListener("blur", mask, false);
        item.addEventListener("keydown", mask, false);     
    }
  })
  
};
export default phoneMask;