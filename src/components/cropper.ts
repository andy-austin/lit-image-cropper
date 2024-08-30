import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { LitImageCropperStyles } from '../styles/cropper';

import './slider';

@customElement('lit-image-cropper')
export class LitImageCropper extends LitElement {
  @property({ type: String }) src!: string;

  @query('canvas') private _canvas!: HTMLCanvasElement;

  private _image = new Image();
  private _position = { x: 0, y: 0 };
  private _dragging = false;
  private _mouse = { x: 0, y: 0 };
  private _scale = 1;
  private _distance = 0;

  static styles = [LitImageCropperStyles];

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('src')) {
      const context = this._canvas.getContext('2d');
      if (!context) return;

      this._canvas.width = this.offsetWidth;
      this._canvas.height = window.innerHeight / 3 + 50;

      this._image.crossOrigin = 'anonymous';
      this._image.src = this.src;

      this._image.onload = () => {
        this._draw(context);
      };
    }
  }

  private _onStartDragging = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();

    if (event instanceof MouseEvent || event.touches.length === 1) {
      this._dragging = true;

      const clientX = event instanceof MouseEvent ? event.clientX : (event.touches[0]?.clientX ?? 0);
      const clientY = event instanceof MouseEvent ? event.clientY : (event.touches[0]?.clientY ?? 0);

      this._mouse = { x: clientX, y: clientY };
    } else if (event.touches.length === 2) {
      this._distance = this._calcDistance(event.touches);
    }
  };

  private _onStopDragging = () => {
    this._dragging = false;
    this._crop();
  };

  private _onImageDragging = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();

    const context = this._canvas.getContext('2d');
    if (!context) return;

    if (event instanceof MouseEvent || event.touches.length === 1) {
      if (!this._dragging) return;

      const { clientX, clientY } = this._getClientXY(event);

      this._position.x += clientX - this._mouse.x;
      this._position.y += clientY - this._mouse.y;

      this._boundaries();

      this._mouse = { x: clientX, y: clientY };
    } else if (event.touches.length === 2) {
      const distance = this._calcDistance(event.touches);
      const scale = distance / this._distance;

      this._scale *= scale;
      this._distance = distance;
    }

    this._draw(context);
  };

  private _getClientXY = (event: MouseEvent | TouchEvent) => {
    const clientX = event instanceof MouseEvent ? event.clientX : (event.touches[0]?.clientX ?? 0);
    const clientY = event instanceof MouseEvent ? event.clientY : (event.touches[0]?.clientY ?? 0);

    return { clientX, clientY };
  };

  private _calcDistance = (touches: TouchList) => {
    if (touches.length !== 2) return 0;

    const touchOne = touches[0];
    const touchTwo = touches[1];

    if (!touchOne || !touchTwo) return 0;

    const dx = touchTwo.clientX - touchOne.clientX;
    const dy = touchTwo.clientY - touchOne.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  private _draw = (context: CanvasRenderingContext2D) => {
    const { width, height } = this._canvas;

    context.clearRect(0, 0, width, height);

    const iRatio = this._image.width / this._image.height;
    const cRatio = width / height;

    let drawWidth = width * this._scale;
    let drawHeight = height * this._scale;

    if (iRatio > cRatio) {
      drawWidth = height * iRatio * this._scale;
    } else {
      drawHeight = (width / iRatio) * this._scale;
    }

    context.drawImage(this._image, this._position.x, this._position.y, drawWidth, drawHeight);

    context.fillStyle = 'rgba(128, 128, 128, 0.7)';
    context.globalCompositeOperation = 'source-over';
    context.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY);

    context.save();
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.clip();
    context.drawImage(this._image, this._position.x, this._position.y, drawWidth, drawHeight);
    context.restore();
  };

  private _boundaries = () => {
    const { width, height } = this._canvas;
    const { width: iWidth, height: iHeight } = this._image;

    const iRatio = iWidth / iHeight;
    const cRatio = width / height;

    let drawWidth = width * this._scale;
    let drawHeight = height * this._scale;

    if (iRatio > cRatio) {
      drawWidth = height * iRatio * this._scale;
    } else {
      drawHeight = (width / iRatio) * this._scale;
    }

    const minX = Math.min(0, width - drawWidth);
    const minY = Math.min(0, height - drawHeight);
    const maxX = Math.max(0, width - drawWidth);
    const maxY = Math.max(0, height - drawHeight);

    this._position.x = Math.max(minX, Math.min(this._position.x, maxX));
    this._position.y = Math.max(minY, Math.min(this._position.y, maxY));
  };

  private _crop = () => {
    const { width, height } = this._canvas;

    const radius = Math.min(width / 2, height / 2);
    const centerX = width / 2;
    const centerY = height / 2;

    const canvas = document.createElement('canvas');
    canvas.width = radius * 2;
    canvas.height = radius * 2;
    const context = canvas.getContext('2d');

    if (!context) return '';

    context.beginPath();
    context.arc(radius, radius, radius, 0, Math.PI * 2);
    context.clip();

    context.drawImage(
      this._canvas,
      centerX - radius,
      centerY - radius,
      radius * 2,
      radius * 2,
      0,
      0,
      radius * 2,
      radius * 2,
    );

    this.dispatchEvent(new CustomEvent('on-image-cropped', { detail: canvas.toDataURL('image/png') }));
  };

  private _onZoom = (event: CustomEvent) => {
    const context = this._canvas.getContext('2d');
    if (!context) return;

    this._scale = event.detail;
    this._draw(context);
    this._crop();
  };

  render() {
    return html`
      <canvas
        @mousedown=${this._onStartDragging}
        @mousemove=${this._onImageDragging}
        @mouseup=${this._onStopDragging}
        @mouseleave=${this._onStopDragging}
        @touchstart=${this._onStartDragging}
        @touchmove=${this._onImageDragging}
        @touchend=${this._onStopDragging}
        @touchcancel=${this._onStopDragging}
      >
      </canvas>
      <lit-image-cropper-slider .scale=${this._scale} @on-slide-end=${this._onZoom}></lit-image-cropper-slider>
    `;
  }
}

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface HTMLElementTagNameMap {
    'lit-image-cropper': LitImageCropper;
  }

  // noinspection JSUnusedGlobalSymbols
  interface GlobalEventHandlersEventMap {
    'on-image-cropped': CustomEvent<string>;
  }
}
