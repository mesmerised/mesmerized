function ready(fn) {
    if (document.attachEvent
        ? document.readyState === 'complete'
        : document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
        return el;
    }

    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        }
        else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    var result = browser();
    var chrome = chrome || {
        app: { isInstalled: false },
        webstore: {}
    };
    var installBtn = document.getElementById('installBtn');
    var mobileMsg = document.getElementById('mobileMsg');
    var chromeWebstoreUrl = 'https://chrome.google.com/webstore/detail/mesmerized/ieklodmmjfoaelcnfoilfcodkmicbooc';
    var firefoxStoreUrl = 'https://addons.mozilla.org/en-US/firefox/addon/mesmerized/';

    function onInstallSuccess() {
        installBtn.textContent = 'Already Installed for Chrome';
        addClass(installBtn, 'disabled');
        installBtn.removeEventListener('click', installBtnClickHandler);
    }

    function onInstallFailure() {
        window.location.href = chromeWebstoreUrl;
    }

    function installBtnClickHandler(ev) {
        ev.preventDefault();
        if (chrome.webstore.install) {
            chrome.webstore.install(null, onInstallSuccess, onInstallFailure);
        } else {
            onInstallFailure();
        }
    }

    if (result.mobile) {
        addClass(installBtn, 'disabled');
        removeClass(mobileMsg, 'hidden');
    }
    else {
        if (result.name === 'chrome') {
            if (!chrome.app.isInstalled) {
                installBtn.setAttribute('href', chromeWebstoreUrl);
                installBtn.textContent = 'Install for Chrome';
                installBtn.addEventListener('click', installBtnClickHandler);
            } else {
                onInstallSuccess();
            }
        } else if (result.name === 'firefox') {
            installBtn.setAttribute('href', firefoxStoreUrl);
            installBtn.textContent = 'Install for Firefox';
        } else {
            addClass(installBtn, 'disabled');
        }
    }
});