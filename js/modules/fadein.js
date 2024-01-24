// fadeinアニメーション start
class FadeInTarget {
  constructor(element) {
    this.element = element;
    this.innerHeight = window.innerHeight;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  isFadeIn(absoluteTop) {
    return window.scrollY > absoluteTop.positionY - this.innerHeight / 2 ? true : false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const FADEIN_TARGETS = document.querySelectorAll(
    'section>div[id*="c"], section>form>div[id*="c"]'
  );

  FADEIN_TARGETS.forEach(function (target) {
    const fadeInTarget = new FadeInTarget(target);
    const relativeTop = new RelativeY(target.getBoundingClientRect().top);
    const absoluteTop = new AbsoluteY(relativeTop);

    if (fadeInTarget.isFadeIn(absoluteTop)) {
      fadeInTarget.addClass("js-fadein");
    }

    window.addEventListener("scroll", function () {
      if (fadeInTarget.isFadeIn(absoluteTop)) {
        fadeInTarget.addClass("js-fadein");
      }
    });
  });
});

// fadeinアニメーション end
