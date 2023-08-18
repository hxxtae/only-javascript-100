export default function Loading({ $target, initState }) {
  this.$element = document.createElement('div');
  this.$element.className = 'Modal Loading';

  $target.insertAdjacentElement('afterend', this.$element);
  // insertAdjacentElement
  // insertAdjacentHTML

  this.state = {
    isLoading: initState,
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  this.render = () => {
    const { isLoading } = this.state;
    if(isLoading) {
      this.$element.style.display = 'block';
      this.$element.innerHTML = `
        <div class="content">
          <img src="./assets/nyan-cat.gif">
        </div>`;
    } else {
      this.$element.style.display = 'none';
      this.$element.innerHTML = ``;
    }
  }
  this.render();
}
