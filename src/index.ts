import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import './components/cropper';
import { RootComponentStyles } from './styles';

const DEMO_IMAGE_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80';
const BMC_URL = 'https://www.buymeacoffee.com/afgarabote';
const BMC_IMAGE_URL = 'https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png';
const DEMO_URL = 'https://github.com/andy-austin/lit-image-cropper/tree/master/demo';
const PACKAGE_URL = 'https://www.npmjs.com/package/lit-image-cropper';
const GITHUB_LOGO = 'https://static-00.iconduck.com/assets.00/github-square-icon-511x512-qbywlrgo.png';
const NPMJS_LOGO = 'https://static-00.iconduck.com/assets.00/npm-icon-512x512-bj8sz6is.png';

@customElement('root-component')
export class RootComponent extends LitElement {
  @state() private _croppedImage = '';

  static styles = [RootComponentStyles];

  connectedCallback() {
    super.connectedCallback();
    inject();
    injectSpeedInsights();
  }

  render() {
    return html`<div class="wrapper">
      <div class="container no-border">
        <h1>${'<lit-image-cropper>'}</h1>
        <a href=${BMC_URL} target="_blank">
          <img class="bmc" src=${BMC_IMAGE_URL} alt="Buy Me A Coffee" />
        </a>
        <p>
          Lightweight and efficient web component for cropping images. Built with Lit, it provides a simple yet powerful
          solution for integrating image cropping functionality into your web applications.
        </p>
      </div>
      <div class="container">
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
          <div class="source-logos">
            <a href=${DEMO_URL} target="_blank">
              <img width="25" src=${GITHUB_LOGO} alt="See package on npm" style="border-radius: 3px;" />
            </a>
            <a href=${PACKAGE_URL} target="_blank">
              <img width="25" src=${NPMJS_LOGO} alt="See package on npm" style="border-radius: 3px;" />
            </a>
          </div>
        </section>
      </div>
    </div>`;
  }
}

export { LitImageCropper } from './components/cropper';
