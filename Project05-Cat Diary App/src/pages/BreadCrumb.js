export default function BreadCrumb({ $target, breadCrumbs, onRefetch }) {
  this.$element = document.createElement('nav');
  this.$element.className = 'Breadcrumb';
  $target.appendChild(this.$element);
  
  this.state = {
    breadCrumbs: [...breadCrumbs]
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  this.$element.addEventListener('click', (e) => {
    const $target = e.target;
    const id = $target.dataset.id;
    if (!id) return;
    onRefetch(id);
  })

  this.render = () => {
    const { breadCrumbs } = this.state;
    this.$element.innerHTML = `
      ${breadCrumbs?.map((item, index) => `
        <div data-id=${item.id}>${item.name}</div>
      `).join('')}
    `;
  }

  this.render();
}
