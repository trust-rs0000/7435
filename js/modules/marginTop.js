// ヘッダーfixedにした際の上部margin設定 start
class SetMarginTop {
  constructor(headerElement) {
    try {
      if (!headerElement) {
        throw new Error("ERROR: headerElement is null");
      }
    } catch (error) {
      console.log(error.message);
    }

    this.headerElement = headerElement;
    this.headerHeight = this.headerElement.clientHeight;
    this.contentsWrap = document.querySelector("#contents_wrap");
    this.mv = document.querySelector(".mv");
    this.blogMarginTop = document.querySelector("#blog-margin-top");
    this.shopMarginTop = document.querySelector("#is-shop");
  }

  setHeaderHeight() {
    this.headerHeight = this.headerElement.clientHeight;
  }

  setMarginTop() {
    if (!this.mv && this.contentsWrap) {
      this.contentsWrap.style.marginTop = `${this.headerHeight}px`;
    }

    // mvがあるページの場合
    if (this.mv) {
      this.mv.style.marginTop = `${this.headerHeight}px`;
    }

    // ブログページの場合
    if (this.blogMarginTop) {
      this.blogMarginTop.style.marginTop = `${this.headerHeight}px`;
    }

    // ショップページの場合
    if (this.shopMarginTop) {
      this.shopMarginTop.style.marginTop = `${this.headerHeight}px`;
    }
  }
}

window.addEventListener("load", function () {
  // ヘッダーの高さ分、margin-topを設ける
  const setMarginTop = new SetMarginTop(document.querySelector(".header"));
  setMarginTop.setMarginTop();

  window.addEventListener("resize", function () {
    setMarginTop.setHeaderHeight();
    setMarginTop.setMarginTop();
  });
});
// ヘッダーfixedにした際の上部margin設定 end
