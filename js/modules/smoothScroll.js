// スムーススクロール start
class HrefAttribute {
  constructor(element) {
    this.element = element;
  }

  getHref() {
    return this.element.getAttribute("href");
  }

  getHash() {
    const HREF = this.getHref();
    return HREF.split("#").pop();
  }
}

class SmoothScrollHeaderHeight {
  constructor(height) {
    this.height = height;
  }
}

class SmoothScrollTarget {
  constructor(hash) {
    this.hash = hash;
  }

  getTarget() {
    const HASH = this.hash.replace(/#/, "");
    return document.querySelector(`#${HASH}`);
  }
}

class SmoothScrollPositionTop {
  constructor(element) {
    this.element = element;
  }

  getRelativeTop() {
    return this.element.getBoundingClientRect().top;
  }

  getAbsoluteTop() {
    const RELATIVE_TOP = this.getRelativeTop();
    return RELATIVE_TOP + window.scrollY;
  }

  resizeAbsoluteTop(headerHeight) {
    const ABSOLUTE_TOP = this.getAbsoluteTop();
    return ABSOLUTE_TOP - headerHeight.height;
  }
}

class InnerSmoothScroll {
  constructor(absoluteTop) {
    this.absoluteTop = absoluteTop;
  }

  scroll() {
    window.scrollTo({
      top: this.absoluteTop,
      left: 0,
      behavior: "smooth",
    });
  }
}

class OuterSmoothScroll {
  constructor(absoluteTop) {
    this.absoluteTop = absoluteTop;
  }

  preScroll() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  scroll() {
    window.scrollTo({
      top: this.absoluteTop,
      left: 0,
      behavior: "smooth",
    });
  }
}

window.addEventListener("load", function () {
  // 内部リンク
  const SMOOTH_SCROLL_HEADER = document.querySelector(".header");
  let headerHeight = SMOOTH_SCROLL_HEADER.clientHeight;

  window.addEventListener("resize", function () {
    headerHeight = SMOOTH_SCROLL_HEADER.clientHeight;
  });

  const ANCHORS = document.querySelectorAll('a[href*="#"]');

  ANCHORS.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const smoothScrollHeaderHeight = new SmoothScrollHeaderHeight(headerHeight);
      const hrefAttribute = new HrefAttribute(anchor);

      const HASH = hrefAttribute.getHash();

      const smoothScrollTarget = new SmoothScrollTarget(HASH);
      const TARGET = smoothScrollTarget.getTarget();

      if (!TARGET) {
        return;
      }

      e.preventDefault();

      const smoothScrollPositionTop = new SmoothScrollPositionTop(TARGET);
      const RESIZE_ABSOLUTE_TOP =
        smoothScrollPositionTop.resizeAbsoluteTop(smoothScrollHeaderHeight);

      const innerSmoothScroll = new InnerSmoothScroll(RESIZE_ABSOLUTE_TOP);
      innerSmoothScroll.scroll();
    });
  });

  // 外部リンク
  const HASH = location.hash;
  if (!HASH) {
    return;
  }

  const smoothScrollHeaderHeight = new SmoothScrollHeaderHeight(headerHeight);

  const smoothScrollTarget = new SmoothScrollTarget(HASH);
  const TARGET = smoothScrollTarget.getTarget();

  const smoothScrollPositionTop = new SmoothScrollPositionTop(TARGET);
  const RESIZE_ABSOLUTE_TOP = smoothScrollPositionTop.resizeAbsoluteTop(smoothScrollHeaderHeight);

  const outerSmoothScroll = new OuterSmoothScroll(RESIZE_ABSOLUTE_TOP);
  outerSmoothScroll.preScroll();
  outerSmoothScroll.scroll();
});
// スムーススクロール end
