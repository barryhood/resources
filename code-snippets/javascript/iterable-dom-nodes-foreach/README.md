Instead of this pattern:

```
    this._modal
        .querySelectorAll('[data-modal-close]')
        .forEach((closer) => {
            closer.addEventListener('click', (event) => {
                event.preventDefault();
                this._close();
            });
        });
```

which fails in IE11, we can use the spread patter in ES6 to achieve the same result:

```
    [...this._modal.querySelectorAll('[data-modal-close]')]
    .forEach((closer) => {
        closer.addEventListener('click', (event) => {
            event.preventDefault();
            this._close();
        });
    });
```

