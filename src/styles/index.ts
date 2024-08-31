import { css } from 'lit';

export const RootComponentStyles = css`
  :host {
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    border: 1px dashed #999999;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    gap: 20px;
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
    margin: 10px 50px 20px;
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

  @media only screen and (min-width: 768px) {
    .container {
      width: 80%;
      flex-direction: row;
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
