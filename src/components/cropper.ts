import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  @property({ type: String }) name?: string = 'Somebody';

  static styles = css`
    p {
      color: blue;
    }
  `;

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-greeting': SimpleGreeting;
  }
}
