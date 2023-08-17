import Header from "./components/Header.js";
import Content from "./pages/Content.js";

export default function App({ $target }) {

    this.onChangePage = (page) => {
      content.setState({
        pageKind: page,
      });
    }

    const header = new Header({ 
      $target,
      onChange: this.onChangePage,
    });

    const content = new Content({ 
      $target,
    });

}
