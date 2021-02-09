
class ProductList extends React.Component {
  /**
   * With Property Initializer feature, there's no need 
     constructor(props) {
      super(props);

      //Treat the state object as immutable.
      this.state = {
        products: [],
      };
      this.handleProductUpVote = this.handleProductUpVote.bind(this);
   }*/

  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote = productId => {
    const nextProducts = this.state.products.map((product) =>{
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({ products: nextProducts});
  }

  render() {
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));

    //map() returns a new array
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  /**
    constructor(props) {
      super(props);
      //This bind() pattern is unnecessary with functional components and Hooks.
      //this.handleUpVote = this.handleUpVote.bind(this);
    }*/

  //any time we define our own custom component methods, we have to
  //manually bind this to the component ourselves
  handleUpVote= () => (
    this.props.onVote(this.props.id)
  );
  
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
