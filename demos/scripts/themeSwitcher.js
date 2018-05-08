(function() {
    var themeSwitcher, themeSheet;

    function initThemeSwitcher() {
        themeSwitcher = document.querySelector('.theme-switcher');
        themeSheet = document.querySelector('#theme-sheet');

        themeSwitcher.addEventListener('click', handleThemeClick);
    }

    function handleThemeClick(e) {
        var all = document.querySelectorAll('[data-theme]');
        var target = e.target;
        var themeUrl = target.getAttribute('data-theme');

        if (!themeUrl) return;

        Array.prototype.forEach.call(all, function(link) {
            link.removeAttribute('class');
        });

        themeSheet.href = themeUrl;

        target.className = 'active';
    }

    document.addEventListener("DOMContentLoaded", initThemeSwitcher);
})();
