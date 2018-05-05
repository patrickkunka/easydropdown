document.addEventListener("DOMContentLoaded", function() {
    var themeSwitcher = document.querySelector('.theme-switcher');
    var themeSheet = document.querySelector('#theme-sheet');

    themeSwitcher.addEventListener('click', function(e) {
        var all = document.querySelectorAll('[data-theme]');
        var target = e.target;
        var themeUrl = target.getAttribute('data-theme');

        if (target === themeSwitcher) return;

        Array.prototype.forEach.call(all, function(link) {
            link.removeAttribute('class');
        });

        themeSheet.href = themeUrl;

        target.className = 'active';
    });
});