// アコーディオン start
class Accordion {
  constructor(accordionElement) {
    this.accordionElement = accordionElement;
    this.accordionElementFirst = this.accordionElement.querySelector(".box:first-child");
    this.accordionElementLast = this.accordionElement.querySelector(".box:last-child");
  }

  click() {
    // 適宜、セレクタを変更してください。
    const LAST_BOX_HEIGHT = this.accordionElementLast.querySelector("div").clientHeight;

    this.accordionElement.classList.toggle("js-accordion-open");

    this.accordionElementLast.style.height = `${LAST_BOX_HEIGHT}px`;

    if (!this.accordionElement.classList.contains("js-accordion-open")) {
      this.accordionElementLast.style.height = "0px";
    }
  }
}

window.addEventListener("DOMContentLoaded", function () {
  // クラス名を変更して私用してください。
  const ACCORDIONS = document.querySelectorAll(".flex--faq");
  ACCORDIONS.forEach(function (accordion) {
    const ACCORDION = new Accordion(accordion);

    accordion.addEventListener("click", function () {
      ACCORDION.click();
    });
  });
});
// アコーディオン end
