(function() {
    var addOptionButton, select;

    function initOptionAdder() {
        addOptionButton = document.getElementById('add-option');
        select = document.getElementById('demo-select');

        addOptionButton.addEventListener('click', handleClick);
    }

    function handleClick() {
        var totalOptions = select.options.length;
        var newOption = document.createElement('option');

        newOption.textContent = 'Option ' + totalOptions;

        select.appendChild(newOption);
    }

    document.addEventListener("DOMContentLoaded", initOptionAdder);
})();
