const products = [{"name":"紅色","en":"EMBER RED","accent":"#d25a31","src":"./images/shirt-red.png"},{"name":"黃色","en":"GOLDEN HOUR","accent":"#e3aa28","src":"./images/shirt-yellow.png"},{"name":"紫色","en":"NIGHT VIOLET","accent":"#6170c1","src":"./images/shirt-purple.png"},{"name":"綠色","en":"ISLAND GREEN","accent":"#6dc7ad","src":"./images/shirt-green.png"},{"name":"白色","en":"PURE WHITE","accent":"#f1f1ed","src":"./images/shirt-white.png"},{"name":"藍色","en":"OCEAN BLUE","accent":"#3f86bd","src":"./images/shirt-blue.png"},{"name":"彩虹","en":"FULL SPECTRUM","accent":"#ef6552","rainbow":true,"src":"./images/shirt-rainbow.png"}];
    let current = 0;
    let touchStartX = 0;
    const root = document.documentElement;
    const image = document.querySelector(".stage-image");
    const stage = document.querySelector(".stage");
    const nameEl = document.querySelector(".color-name");
    const enEl = document.querySelector(".color-en");
    const counterEl = document.querySelector(".counter");
    const ctaColor = document.querySelector(".cta-color");
    const swatches = document.querySelector(".swatches");

    products.forEach((product, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "swatch";
      button.style.setProperty("--swatch", product.accent);
      button.dataset.rainbow = product.rainbow ? "true" : "false";
      button.setAttribute("aria-label", "切換為" + product.name + "印花");
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      button.addEventListener("click", () => select(index));
      swatches.appendChild(button);
    });

    const pad = number => String(number).padStart(2, "0");

    function render(animate = true) {
      const product = products[current];
      if (animate) image.classList.add("changing");
      const update = () => {
        image.src = product.src;
        image.alt = "LAWLAWA 無袖上衣" + product.name + "印花，正面與背面設計稿";
        nameEl.textContent = product.name;
        enEl.textContent = product.en;
        counterEl.innerHTML = pad(current + 1) + ' <span>/ ' + pad(products.length) + "</span>";
        stage.dataset.index = pad(current + 1) + " / " + pad(products.length);
        ctaColor.textContent = product.name + "　→";
        root.style.setProperty("--accent", product.accent);
        document.querySelectorAll(".swatch").forEach((button, index) => {
          button.setAttribute("aria-pressed", index === current ? "true" : "false");
        });
        document.querySelectorAll(".swatch")[current].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        requestAnimationFrame(() => image.classList.remove("changing"));
      };
      animate ? setTimeout(update, 135) : update();
    }

    function select(index) {
      current = (index + products.length) % products.length;
      render(true);
    }

    document.querySelector(".prev").addEventListener("click", () => select(current - 1));
    document.querySelector(".next").addEventListener("click", () => select(current + 1));
    stage.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", event => {
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 44) select(current + (delta < 0 ? 1 : -1));
    }, { passive: true });
    document.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") select(current - 1);
      if (event.key === "ArrowRight") select(current + 1);
    });
    render(false);
  