/* 静的デモ用。動かない操作を「動きません」と伝えるだけの薄い層。 */
(function () {
    'use strict';

    var MESSAGE = 'このデモでは動作しません（表示専用の静的サイトです）。';

    function syncBannerHeight() {
        var banner = document.querySelector('.demo-banner');

        if (banner) {
            document.documentElement.style.setProperty('--demo-banner-h', banner.offsetHeight + 'px');
        }
    }

    document.addEventListener('DOMContentLoaded', syncBannerHeight);
    window.addEventListener('resize', syncBannerHeight);

    function notice(message) {
        var el = document.querySelector('.demo-notice');

        if (! el) {
            el = document.createElement('div');
            el.className = 'demo-notice';
            el.setAttribute('role', 'status');
            document.body.appendChild(el);
        }

        el.textContent = message || MESSAGE;
        el.style.opacity = '1';

        clearTimeout(el.dataset.timer);
        el.dataset.timer = setTimeout(function () { el.style.opacity = '0'; }, 2600);
    }

    // 保存・検索の通信は行わない（非同期コンボボックス、カンバンのステータス更新など）
    window.fetch = function () {
        notice('このデモでは通信を行いません（検索・保存は無効です）。');

        return Promise.reject(new Error('static demo'));
    };

    document.addEventListener('DOMContentLoaded', function () {
        // ドラッグ&ドロップでのステータス変更は無効にする
        document.querySelectorAll('[draggable="true"]').forEach(function (card) {
            card.setAttribute('draggable', 'false');
            card.setAttribute('data-demo-disabled', 'drag');
            card.title = 'このデモではドラッグでのステータス変更はできません。';
        });

        // 送信は行わない（検索・保存ビュー・活動の追加・削除など）
        document.querySelectorAll('form').forEach(function (form) {
            form.setAttribute('data-demo-disabled', 'form');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                notice('このデモでは保存・検索は行いません。');
            });
        });
    }, { once: true });

    // 静的サイトに無い遷移先はここで止める
    document.addEventListener('click', function (event) {
        var target = event.target.closest('a[data-demo-disabled], button[data-demo-disabled]');

        if (! target) {
            return;
        }

        event.preventDefault();
        notice(target.dataset.demoMessage || MESSAGE);
    });
})();
