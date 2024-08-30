import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './components/cropper';

const DEMO_IMAGE_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80';

@customElement('root-component')
export class RootComponent extends LitElement {
  render() {
    return html`<lit-image-cropper src=${DEMO_IMAGE_URL}></lit-image-cropper>`;
  }
}

export { LitImageCropper } from './components/cropper';
