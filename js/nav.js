// js/nav.js
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");         // <header>
    const btn = document.querySelector(".menu-btn");      // 開閉ボタン
    const menu = document.getElementById("global-menu");   // メニュー本体
    const mask = document.querySelector(".mask");          // 背景マスク

    if (!header || !btn || !menu || !mask) return;

    // 開く
    const open = () => {
        header.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        menu.hidden = false;            // hidden属性を外す
        lockScroll(true);               // 5) スクロールロック
    };

    // 閉じる
    const close = () => {
        header.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        menu.hidden = true;             // 再び非表示
        lockScroll(false);
        btn.focus();                    // フォーカスを戻す（任意）
    };

    // トグル
    const toggle = () => (header.classList.contains("open") ? close() : open());

    // クリック操作
    btn.addEventListener("click", toggle);
    mask.addEventListener("click", close);
    menu.addEventListener("click", (e) => {
        if (e.target.closest("a")) close(); // メニュー内リンクで閉じる
    });

    // Escキーで閉じる
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && header.classList.contains("open")) {
            e.preventDefault();
            close();
        }
    });

    // 画面幅が戻ったら状態リセット（PCに戻ったときの取りこぼし防止）
    const BP = 900;
    window.addEventListener("resize", () => {
        if (window.innerWidth > BP && header.classList.contains("open")) {
            close();
        }
    });

    // 5) スクロールロック（開いている間は背景をスクロールさせない）
    function lockScroll(shouldLock) {
        if (shouldLock) {
            const sbw = window.innerWidth - document.documentElement.clientWidth; // スクロールバー幅
            document.body.style.overflow = "hidden";
            if (sbw > 0) document.body.style.paddingRight = sbw + "px"; // レイアウトズレ防止
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }
});