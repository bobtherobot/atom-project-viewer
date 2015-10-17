'use strict';

class InputSelectionView extends HTMLElement {

    // native
    createdCallback() {
        var description;
        var input;

        this.classList.add('block');
        this.description = document.createElement('label');

        this.appendChild(this.description);

        this.input = document.createElement('input');
        this.input.classList.add('form-control');
        this.appendChild(this.input);
    }

    attachedCallback() {}

    detachedCallback() {}

    // custom
    setDescription(description) {
        this.description.textContent = description;
    }

    setDefault(defaultInput) {
        this.input.textContent = defaultInput;
    }

}

module.exports = InputSelectionView;

module.exports = document.registerElement(
    'input-selection-view',
    {
        prototype: InputSelectionView.prototype,
        extends: 'div'
    }
);