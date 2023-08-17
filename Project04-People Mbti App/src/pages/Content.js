import { getLocalStorage, setLocalStorage } from '../utils/storage.js';
import { fetchData } from '../utils/api.js';
import ContentTitle from "../components/ContentTitle.js";
import HomePage from "../pages/HomePage.js";
import SignupPage from './SignupPage.js';

export default function Content({ $target }) {
  this.$element = document.createElement('main');
  this.$element.id = 'page_content';

  $target.appendChild(this.$element);

  this.state = {
    pageKind: 0,
    pageLastIndex: 8,
    pageCards: [],
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    contentTitle.setState({
        pageKind: this.state.pageKind
    });
    homePage.setState({
      pageKind: this.state.pageKind,
      pageCards: this.state.pageCards.slice(0, this.state.pageLastIndex),
    });
    signupPage.setState({
      pageKind: this.state.pageKind
    });
  }

  window.addEventListener('load', async () => {
    const data = await fetchData();
    if (data.length > 0) {
      let personData = [...getLocalStorage('personalInfo')];
      if (personData.length <= 0) {
        personData = data.map((obj, index) => ({ idx: index + 1, ...obj }));
        const cardState = Array.from({length: data.length}, (v, i) => ({idx: i+1, status: ''}));
        setLocalStorage('personalInfo', personData);
        setLocalStorage('cardStatus', cardState);
      }
      this.setState({
        pageCards: [...personData]
      });
    }
  })

  this.onReFetchCards = () => {
    if (this.state.pageCards.length >= this.state.pageLastIndex) {
      this.setState({
        pageLastIndex: this.state.pageLastIndex + 8,
      });
    }
  }

  this.onAddNewCard = (newCard) => {
    const { pageCards } = this.state;
    const newIndex = pageCards.length + 1;
    const newPageCards = [...pageCards, { idx: newIndex, ...newCard }];
    const newCardState = [...getLocalStorage('cardStatus'), { idx: newIndex, status: '' }];
    this.setState({
      pageCards: newPageCards
    });
    setLocalStorage('personalInfo', newPageCards);
    setLocalStorage('cardStatus', newCardState);
  }

  const contentTitle = new ContentTitle({ 
    $target: this.$element, 
    pageKind: this.state.pageKind
  });

  const homePage = new HomePage({
    $target,
    pageKind: this.state.pageKind,
    pageCards: this.state.pageCards,
    onReFetchCards: this.onReFetchCards,
  });

  const signupPage = new SignupPage({
    $target,
    pageKind: this.state.pageKind,
    onAddNewCard: this.onAddNewCard,
  });
}
