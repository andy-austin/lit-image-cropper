import { css } from 'lit';

export const LitImageCropperStyles = css`
  :host {
    --border-radius: var(--cropper-border-radius, 0);
  }

  canvas {
    border-radius: var(--border-radius);
    cursor: grab;
  }

  canvas:active {
    cursor: grabbing;
  }
`;
