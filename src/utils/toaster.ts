import iziToast from 'izitoast';

export function setupToaster() {
  iziToast.settings({
    zindex: 9999,
    position: 'topCenter'
  });
}
export interface ErrorObj {
  title: string;
  message: string;
}

export function displayError(error: ErrorObj) {
  if (!error) return;
  iziToast.error({
    title: error.title || 'Error',
    message: error.message || ''
  });
}

export function displaySuccess(title: string, message: string) {
  iziToast.success({
    title: title || 'Success',
    message: message || ''
  });
}

export async function confirmDialog(params: any = {}) {
  return new Promise<void>((resolve, reject) => {
    iziToast.question({
      overlay: true,
      position: 'center',
      maxWidth: 500,
      timeout: params.timeout === undefined ? 10000 : params.timeout,
      title: params.title === undefined ? 'Are you sure?' : params.title,
      message: params.message === undefined ? 'Please confirm.' : params.message,
      buttons: [
        [
          '<button style="width: 100px"><b>YES</b></button>',
          (instance, toast) => instance.hide({ transitionOut: 'fadeOut' }, toast, 'yes'),
          false
        ],
        [
          '<button style="width: 100px"><b>NO</b></button>',
          (instance, toast) => instance.hide({ transitionOut: 'fadeOut' }, toast, 'no'),
          true
        ]
      ],
      onClosing: (settings, toast, closedBy) => {
        if (closedBy === 'yes') {
          resolve();
          params.onConfirm && params.onConfirm();
        } else {
          reject();
        }
      }
    });
  });
}
