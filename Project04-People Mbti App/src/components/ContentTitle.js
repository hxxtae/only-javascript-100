export default function ContentTitle({ $target, pageKind }) {
  this.$element = document.createElement('div');
  this.$element.className = 'content_title';

  this.state = {
    pageKind
  }
  
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render();
  }

  $target.appendChild(this.$element);

  this.render = () => {
    const { pageKind } = this.state;
    this.$element.innerHTML = `
      <h1>
        ${pageKind == 0 ? 'Great PeoPle' : 
        pageKind == 1 ? 'Sign Up, GreatPeoPle!' : ''}
      </h1>
    `;
  }
  this.render();
}
