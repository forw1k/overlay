function _createModal(selector, options) {
  const modal = document.createElement('div');
  selector.innerHTML = options.content;
  modal.classList.add('my-modal');
  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width}">
        ${
          options.isClosable
            ? `<span class="modal-close" data-close="true">&times;</span>`
            : ''
        }
        <div class="modal-body" id="modal-body" data-content>
        <${selector}>${options?.content || ''}</${selector}>
        </div>
      </div>
    </div>`
  );

  return modal;
}

export function modal(selector, options) {
  const _modal = _createModal(selector, options);
  let destroyed = false;
  const listener = (e) => {
    if (e.target.dataset.close) {
      modal.close();
    }
  };
  _modal.addEventListener('click', listener);
  const modal = {
    open() {
      if (destroyed) return;
      document.body.appendChild(_modal);
      _modal.classList.add('open');
    },
    close() {
      _modal.classList.remove('open');
    },
  };

  return Object.assign(modal, {
    destroy() {
      _modal.parentNode.removeChild(_modal);
      _modal.removeEventListener('click', listener);
      destroyed = true;
    },
  });
}
