import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './components/cropper';
import { RootComponentStyles } from './styles';

const DEMO_IMAGE_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80';

@customElement('root-component')
export class RootComponent extends LitElement {
  @state() private _croppedImage = '';

  static styles = [RootComponentStyles];

  render() {
    return html`<div class="container">
      <aside class="sidebar">
        <img src=${this._croppedImage || DEMO_IMAGE_URL} alt="Jane Doe Avatar" />
        <span>Jane Doe</span>
        <p>An avid photographer and digital artist with a keen eye for detail.</p>
      </aside>
      <section class="content">
        <h1>Adjust Image</h1>
        <span>
          Drag the image and use the zoom feature to customize the crop area, allowing you to focus on the specific
          section you want to keep
        </span>
        <lit-image-cropper
          src=${DEMO_IMAGE_URL}
          @on-image-cropped=${(e: CustomEvent) => (this._croppedImage = e.detail)}
        ></lit-image-cropper>
      </section>
    </div>`;
  }
}

export { LitImageCropper } from './components/cropper';
