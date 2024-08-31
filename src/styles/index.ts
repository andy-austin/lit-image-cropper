import { css } from 'lit';

export const RootComponentStyles = css`
  :host {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .bmc {
    height: 30px !important;
    width: 90px !important;
  }

  .container {
    display: flex;
    flex-direction: column;
    border: 1px dashed #999999;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    gap: 20px;
    box-sizing: border-box;
  }

  .container.no-border {
    margin-bottom: 20px;
    border: 1px solid #f0f0f0;
    background-color: #f0f0f0;
    position: relative;
  }

  .container.no-border a {
    position: absolute;
    right: 20px;
  }

  .container.no-border h1 {
    font-weight: 400;
    font-size: 25px;
    margin: 0;
    line-height: 1.25;
  }

  .container.no-border p {
    margin: 0;
    font-size: 14px;
    color: #999999;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content h1 {
    font-weight: 400;
    font-size: 28px;
    margin: 0;
  }

  .content span {
    margin: 10px 10px 20px;
    font-size: 14px;
    color: #999999;
    text-align: center;
  }

  .content lit-image-cropper {
    width: 100%;

    --cropper-border-radius: 5px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f0f0f0;
    border-radius: 5px;
    padding: 20px;
  }

  .sidebar img {
    border-radius: 50%;
    object-fit: cover;
    width: 180px;
    height: 180px;
  }

  .sidebar span {
    font-size: 20px;
    margin: 20px 0 0;
  }

  .sidebar p {
    text-align: center;
    font-size: 12px;
    margin: 0;
    color: #999999;
    display: none;
  }

  .source-logos {
    text-decoration: none;
    display: flex;
    gap: 10px;
  }

  @media only screen and (min-width: 768px) {
    .wrapper {
      width: 80%;
    }

    .container.no-border {
      flex-direction: column;
    }

    .container.no-border h1 {
      font-size: 28px;
      line-height: 1;
    }

    .container {
      flex-direction: row;
    }

    .content span {
      margin: 10px 50px 20px;
    }

    .sidebar {
      width: 200px;
    }

    .sidebar span {
      margin: 20px 0;
    }

    .sidebar p {
      display: block;
    }

    .content lit-image-cropper {
      width: 60%;
    }
  }
`;
