(function() {
    var form;

    function initSubmitHandler() {
        form = document.querySelector('form');

        form.addEventListener('submit', handleSubmit);
    }

    function handleSubmit(e) {
        e.preventDefault();

        alert('Valid!');
    }

    document.addEventListener("DOMContentLoaded", initSubmitHandler);
})();
