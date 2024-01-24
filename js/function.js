class RelativeY {
  constructor(positionY) {
    this.positionY = positionY;
  }
}

class AbsoluteY {
  constructor(relativeTop) {
    this.positionY = relativeTop.positionY + window.scrollY;
  }
}

// 必須
window.addEventListener("DOMContentLoaded", () => {
  try {
    // 以下、ディレクターも知っている人がいるので、入れられるように
    // 変更禁止
    document.querySelectorAll(".disnone").forEach((el) => {
      el.remove();
    });

    // fancybox
    $(".fancybox").each(function (i) {
      $(this)
        .find("a")
        .attr({
          "data-fancybox": "group" + i,
          "data-type": "image",
        });
    });

    // 問い合わせ確認ページにて必要
    const ANNOT = document.querySelector(".annot");
    const SUBMIT = document.querySelector(".submit");
    if (ANNOT) {
      const FORM = document.querySelector(".form_wrap.entry");
      FORM.appendChild(ANNOT);
      FORM.appendChild(SUBMIT);
    }

    // ショップページ
    // const PATH_NAME = location.pathname;
    // const DIR = PATH_NAME.split('/')[1];
    // if(DIR === 'shop' || DIR === 'customer') {
    //     document.querySelector('#contents_wrap').setAttribute('id', 'is-shop');
    // }

    // バイリンガル
    // var switch_btn =
    //   '<div class="switch"><input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox"><label for="cmn-toggle-1"><span></spsn></label></div>';
    // $("#builingual").prepend(switch_btn);
    // var windowSize = window.innerWidth;
    // if (windowSize > 1001) {
    // } else {
    //   $("#builingual").prependTo("#global_header");
    // }
    // $("span.translate").next().hide();
    // $("div.translate").hide();
    // $(".switch").on("click", function () {
    //   if ($("#cmn-toggle-1").prop("checked")) {
    //     console.log("チェックされています。");
    //     $("span.translate").next().show();
    //     $("span.translate").hide();
    //     $("div.translate").show();
    //     $("div.translate").prev().hide();
    //   } else {
    //     console.log("チェックされていません。");
    //     $("span.translate").next().hide();
    //     $("span.translate").show();
    //     $("div.translate").hide();
    //     $("div.translate").prev().show();
    //   }
    // });
  } catch (e) {
    console.log(e);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  // スライダー
  $(".mv-slider").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    fade: true,
  });

  $(".flex-slider").slick({
    autoplay: true, // 自動でスクロール
    autoplaySpeed: 0, // 自動再生のスライド切り替えまでの時間を設定
    speed: 5000, // スライドが流れる速度を設定
    cssEase: "linear", // スライドの流れ方を等速に設定
    slidesToShow: 4, // 表示するスライドの数
    swipe: false, // 操作による切り替えはさせない
    arrows: false, // 矢印非表示
    pauseOnFocus: false, // スライダーをフォーカスした時にスライドを停止させるか
    pauseOnHover: false, // スライダーにマウスホバーした時にスライドを停止させるか
    responsive: [
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // snsのテキスト制限
  const SNS_LIST = document.querySelectorAll(".blog_list>div");

  if (SNS_LIST) {
    SNS_LIST.forEach(function (item) {
      const TEXT = item.querySelector(".detail");
      const TEXT_SPLIT = TEXT.textContent;
      const LIMIT_STRING_LENGTH = 50;

      if (TEXT.textContent.length > LIMIT_STRING_LENGTH) {
        TEXT.textContent = TEXT_SPLIT.substring(0, LIMIT_STRING_LENGTH) + "...";
      }
    });
  }

  // スクロールしたらヘッダーの背景色変更
  let scroll_Y;

  const HEADER = document.querySelector(".header");
  this.window.addEventListener("scroll", function () {
    scroll_Y = this.window.scrollY;

    if (scroll_Y >= 100) {
      HEADER.classList.add("js-change-header-bg");
    } else if (scroll_Y < 100) {
      HEADER.classList.remove("js-change-header-bg");
    }
  });

  // フッターまで来たら、ヘッダーのお問い合わせをフェードアウト
  const HEADER_CONTACT = document.querySelector(".header-contact");
  const FOOTER = document.querySelector("footer");

  this.window.addEventListener("scroll", function () {
    const RELATIVE_TOP = FOOTER.getBoundingClientRect().top;
    const ABSOLUTE_TOP = this.window.scrollY + RELATIVE_TOP;

    if (this.window.scrollY > ABSOLUTE_TOP - this.window.innerHeight) {
      HEADER_CONTACT.classList.add("js-footer-fadein");
    } else {
      HEADER_CONTACT.classList.remove("js-footer-fadein");
    }
  });
});

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

// ぱんくず start
/**
 * ぱんくず
 */
class BreadCrumb {
  constructor(h1Element) {
    if (!h1Element) {
      throw new Error("ERROR: h1 is null");
    }
    // ぱんくずの現在ページとして表示する文字列
    this.h1Text = h1Element;

    // 現在のURL
    this.currentURL = location.href;

    // フロントページへのURL
    this.topURL = `https://${location.host}`;

    const panElement = document.querySelector("pan");

    if (!panElement) {
      throw new Error("ERROR: pan is null");
    }

    // ぱんくずにあたる要素
    this.pan = panElement;
  }

  displayBreadCrumb(topText = "トップページへ") {
    // トップページのリンクテキストを設定
    const HOME_TEXT = topText;

    // 現在のh1テキストからリンクテキストを設定
    const H1_TEXT = this.h1Text.textContent;

    const BREADCRUMB_HTML = `
                <ul class="breadcrumb" itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList" class="pankuzu">
                    <li class="breadcrumb__li" itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem">
                        <meta itemprop="position" content="1">
                        <a class="breadcrumb__link" itemprop="item" itemscope="itemscope" itemtype="http://schema.org/Thing" href="${this.topURL}" itemid="${this.topURL}">
                            <meta itemprop="name" content="${HOME_TEXT}">
                            ${HOME_TEXT}
                        </a>
                    </li>
                    <li class="breadcrumb__divide"><i class="fa-solid fa-angle-right"></i></li>
                    <li class="breadcrumb__li" itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem" class="kasou">
                        <meta itemprop="position" content="2">
                        <a class="breadcrumb__link" itemprop="item" itemscope="itemscope" itemtype="http://schema.org/Thing" href="${this.currentURL}" itemid="${this.currentURL}">
                            <meta itemprop="name" content="${H1_TEXT}">
                            ${H1_TEXT}
                        </a>
                    </li>
                </ul>
                `;
    this.pan.insertAdjacentHTML("afterbegin", BREADCRUMB_HTML);
  }
}

// DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  // 適宜、クラス名を変更して使用してください
  const BREADCRUMB = document.querySelector(".mv-sub h1");
  if (BREADCRUMB) {
    const breadcrumb = new BreadCrumb(BREADCRUMB);
    breadcrumb.displayBreadCrumb("HOME");
  }
});

// ぱんくず end

// アコーディオン start
window.addEventListener("DOMContentLoaded", function () {
  const ACCORDIONS = document.querySelectorAll(".flex-faq");
  ACCORDIONS.forEach(function (accordion) {
    const FIRST_BOX = accordion.querySelector(".box:first-child");
    const LAST_BOX = accordion.querySelector(".box:last-child");

    FIRST_BOX.addEventListener("click", function () {
      const LAST_BOX_HEIGHT = LAST_BOX.querySelector("div").clientHeight;
      accordion.classList.toggle("js-accordion-open");
      LAST_BOX.style.height = `${LAST_BOX_HEIGHT}px`;
      if (!accordion.classList.contains("js-accordion-open")) {
        LAST_BOX.style.height = `0px`;
      }
    });
  });
});
// アコーディオン end

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
    return window.scrollY > absoluteTop.positionY - this.innerHeight / 1.5 ? true : false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const FADEIN_TARGETS = document.querySelectorAll(
    'section>div[id*="c"]:not(.js-exclude-fadein), section>form>div[id*="c"]'
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
