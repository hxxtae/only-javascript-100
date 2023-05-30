export default function WeatherSearch({ $target, onSearch }) {
  this.$element = document.createElement("form");
  this.$element.id = "search-form";
  this.$input = document.createElement("input");
  this.$input.type = "text";
  this.$input.id = "city";
  this.$input.name = "city";
  this.$input.placeholder = "Search by city or country";
  this.$input.required = true;
  this.$input.autocomplete = "off";
  $target.appendChild(this.$element);
  this.$element.appendChild(this.$input);

  this.state = {
    searchText: ""
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    };
  };

  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
    const newText = e.target.city.value;
    onSearch(newText);
    this.setState({
      searchText: newText
    });
  });
}
