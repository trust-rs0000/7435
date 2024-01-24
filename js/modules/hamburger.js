// ハンバーガーstart

/**
 * ハンバーガーメニュー
 */
class Hamburger {
  constructor(hamburgerElement) {
    try {
      if (!hamburgerElement) {
        throw new Error("ERROR: hamburger is null");
      }
    } catch (e) {
      console.log(e.message);
    }
    // ハンバーガーにあたる要素
    this.hamburger = hamburgerElement;
  }

  toggleHamburger() {
    this.hamburger.addEventListener("click", function () {
      document.querySelector("html").classList.toggle("js-drawer-open");
    });
  }

  clickAnchor() {
    const ANCHORS = document.querySelectorAll('a[href*="#"]');
    ANCHORS.forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        document.querySelector("html").classList.remove("js-drawer-open");
      });
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // クラス名を変更して使用してください
  const hamburger = new Hamburger(document.querySelector(".hamburger"));
  hamburger.toggleHamburger();
});

// ハンバーガーend
