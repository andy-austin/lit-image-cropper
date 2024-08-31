import { css } from 'lit';

export const LitImageCropperSliderStyles = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    --slider-color: var(--cropper-slider-color, #000000);
    --slider-background: var(--cropper-slider-background, #999999);
  }

  .container {
    display: flex;
    align-items: center;
  }

  .container span {
    cursor: pointer;
    font-size: 20px;
    margin: 0 15px;
  }

  .container input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    border-radius: 10px;
    outline: none;
    background: linear-gradient(
      to right,
      var(--slider-color) 0%,
      var(--slider-color) var(--value, 50%),
      var(--slider-background) var(--value, 50%),
      var(--slider-background) 100%
    );
  }

  .container input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: var(--slider-color);
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  }
`;
