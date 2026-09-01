(() => {
  const translations = window.siteTranslations;
  const languageToggle = document.querySelector(".language-toggle");
  const backToTop = document.querySelector(".back-to-top");
  const visitorCount = document.getElementById("visitor-count");
  const visitorValue = document.getElementById("busuanzi_site_uv");
  const description = document.querySelector('meta[name="description"]');

  document.getElementById("year").textContent = new Date().getFullYear();

  const revealVisitorCount = () => {
    if (/\d/.test(visitorValue.textContent)) {
      visitorCount.hidden = false;
    }
  };

  new MutationObserver(revealVisitorCount).observe(visitorValue, {
    childList: true,
    characterData: true,
    subtree: true
  });
  revealVisitorCount();

  let currentLanguage = "en";

  const setLanguage = (language) => {
    const selected = translations[language] ? language : "en";
    const isChinese = selected === "zh";

    document.documentElement.lang = isChinese ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = translations[selected][element.dataset.i18n];
      if (value) {
        element.textContent = value;
      }
    });

    currentLanguage = selected;
    languageToggle.textContent = isChinese ? "CN" : "EN";
    languageToggle.setAttribute("aria-label", isChinese ? "切换为英文" : "Switch to Chinese");
    document.title = isChinese
      ? "柳子祺 | 模拟 CMOS 与集成传感"
      : "Ziqi Liu | Analog CMOS & Integrated Sensing";
    description.content = isChinese
      ? "柳子祺——北京理工大学研究生，研究方向包括模拟 CMOS、MEMS 传感接口与集成传感系统。"
      : "Ziqi Liu — researcher at Beijing Institute of Technology working on analog CMOS design, MEMS sensor interfaces, and integrated sensing systems.";
    backToTop.setAttribute("aria-label", isChinese ? "返回顶部" : "Back to top");
    backToTop.title = isChinese ? "返回顶部" : "Back to top";
  };

  languageToggle.addEventListener("click", () => {
    setLanguage(currentLanguage === "en" ? "zh" : "en");
  });

  const updateBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  setLanguage("en");
})();
