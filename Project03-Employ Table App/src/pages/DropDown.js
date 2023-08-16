export default function DropDown({ $target, pageShowCount, onSelectShow }) {
  this.$element = document.createElement('div');
  this.$element.id = 'dropdown';
  this.$element.className = 'area';

  $target.appendChild(this.$element);

  this.$element.addEventListener('change', (e) => {
    const items = e.target.options;
    const index = e.target.options.selectedIndex;
    const count = items[index].value;
    onSelectShow(count);
  })

  this.render = () => {
    this.$element.innerHTML = `
    <select name="pageShow">
      <option value="${pageShowCount}">${pageShowCount}</option>
      <option value="15">15</option>
    </select>
    `;
  }

  this.render();
}
