# \<lit-image-cropper\>

Lightweight and efficient web component for cropping images. Built with [Lit](https://lit.dev/), it provides a simple
yet powerful solution for integrating image cropping functionality into your web applications.

[**Live Demo**](https://lit-image-cropper.vercel.app/)

## Features

- **Easy to Use**: Simple API with minimal setup.
- **Highly Customizable**: Supports various attributes and events for flexible use.
- **Responsive Design**: Automatically adjusts to different screen sizes.
- **Performance Optimized**: Lightweight and fast, with minimal impact on page load times.
- **Modern Technology**: Built with Lit, leveraging Web Components for wide compatibility.

## Installation

Install `lit-image-cropper` from [NPM](https://www.npmjs.com/package/lit-image-cropper):

```sh
npm install lit-image-cropper
# or
yarn add lit-image-cropper
```

## Usage

After installation, import the component into your project:

```js
import 'lit-image-cropper';
```

Then, you can use the component in your HTML as follows:

```html
<lit-image-cropper src="path/to/image.png"></lit-image-cropper>
```

This will render an image cropper component with the specified image.

## Attributes

The `lit-image-cropper` component supports the following attributes to provide additional flexibility:

| Name  | Type   | Description                                         | Default |
| ----- | ------ | --------------------------------------------------- | ------- |
| `src` | String | Path to the image that will be loaded for cropping. |         |

## Events

The component emits several custom events that you can listen to for more control:

| Event Name      | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `image-cropped` | Fired after the image has been cropped, containing the cropped image data. |

## Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to fork the
repository and submit a pull request.

### Steps to Contribute

1. **Fork the repository**: Click the "Fork" button at the top of this page.
2. **Create a branch**: Create a new branch for your feature or fix.
3. **Make your changes**: Implement your changes and commit them.
4. **Push to the branch**: Push your changes to your forked repository.
5. **Submit a pull request**: Open a pull request to the main repository, describing your changes.

### Development Setup

To set up the development environment:

1. Clone the repository:

   ```sh
   git clone git@github.com:andy-austin/lit-image-cropper.git
   cd lit-image-cropper
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Start the development server:
   ```sh
   yarn dev
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
