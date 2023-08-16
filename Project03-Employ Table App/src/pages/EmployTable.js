export default function EmployTable({ $target, employDatas, pageShowCount }) {
  this.$element = document.createElement('div');
  this.$element.className = 'area';
  this.$element.id = "table";

  this.state = {
    employDatas: [...employDatas],
    pageShowCount
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    }
    this.render();
  }
  
  $target.appendChild(this.$element);

  this.render = () => {
    const { employDatas, pageShowCount } = this.state;
    this.$element.innerHTML = `
    <table>
      <thead>
        <th>name</th>
        <th>title</th>
        <th>email</th>
        <th>role</th>
      </thead>
      <tbody>
        ${employDatas.slice(0, pageShowCount).map((items, index) => `
        <tr style="${index % 2 !== 0 ? 'background-color: #d3d3d3' : ''}">
          <td>${items.name}</td>
          <td>${items.title}</td>
          <td>${items.email}</td>
          <td>${items.role}</td>
        </tr>
        `).join('')}                
      </tbody>
    </table>
    `;
  }

  this.render();
}
