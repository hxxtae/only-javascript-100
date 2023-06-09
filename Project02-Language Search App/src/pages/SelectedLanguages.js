const MAX_DISPLAY_COUNT = 5;
export default function SelectedLanguages({ $target, initialValue }) {
  this.$element = document.createElement('div');
  this.$element.className = 'SelectedLanguage';
  this.state = initialValue;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.length > MAX_DISPLAY_COUNT) {
      const startPosition = this.state.length - MAX_DISPLAY_COUNT;
      this.state = this.state.slice(startPosition, startPosition + MAX_DISPLAY_COUNT);
    }
    this.render();
  }

  this.render = () => {
    this.$element.innerHTML = `
      <ul>
        ${this.state.map(item => `
          <li>${item}</li>
        `).join('')}
      </ul>
    `;
  }

  this.render();
}

