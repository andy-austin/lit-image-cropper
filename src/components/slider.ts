import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { LitImageCropperSliderStyles } from '../styles/slider';

@customElement('lit-image-cropper-slider')
export class LitImageCropperSlider extends LitElement {
  @property({ type: Number }) scale = 1;

  @query('input[type="range"]') slider!: HTMLInputElement;

  static styles = [LitImageCropperSliderStyles];

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this._update();
  }

  private _update = () => {
    const value =
      ((this.slider.valueAsNumber - parseFloat(this.slider.min)) /
        (parseFloat(this.slider.max) - parseFloat(this.slider.min))) *
      100;
    this.slider.style.setProperty('--value', `${value}%`);
  };

  private _onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this._onClick(parseFloat(target.value));
  };

  private _onClick = (zoomValue: number) => {
    this.scale = zoomValue;
    this.slider.value = zoomValue.toString();

    this._update();
    this.dispatchEvent(new CustomEvent('on-slide-end', { detail: this.scale }));
  };

  render() {
    return html` <div class="container">
      <span @click=${() => this._onClick(this.scale - 0.2)}> - </span>
      <input type="range" min="0.5" max="3" step="0.01" value="${this.scale}" @input=${this._onChange} />
      <span @click=${() => this._onClick(this.scale + 0.2)}> + </span>
    </div>`;
  }
}

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface HTMLElementTagNameMap {
    'lit-image-cropper-slider': LitImageCropperSlider;
  }

  // noinspection JSUnusedGlobalSymbols
  interface GlobalEventHandlersEventMap {
    'on-slide-end': CustomEvent<number>;
  }
}
