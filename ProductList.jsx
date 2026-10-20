import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Total count of items in cart
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", description: "Removes mold spores from the air.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", description: "Adds humidity to indoor air.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Easy to grow and purify air.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", description: "Healing gel and air filtering.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming scent for relaxation.", cost: "$22" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-652d9b0e017d?w=300", description: "Sweet, soothing floral fragrance.", cost: "$25" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300", description: "Invigorating herb fragrance.", cost: "$15" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", description: "Refreshing and aromatic.", cost: "$8" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", description: "Distinctive fresh scent.", cost: "$19" },
        { name: "Gardenia", image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=300", description: "Rich, fragrant white blooms.", cost: "$28" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300", description: "Thrives in low light and neglect.", cost: "$20" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596724806898-75218d6e3532?w=300", description: "Fast-growing vine, highly tolerant.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=300", description: "Nearly indestructible indoor plant.", cost: "$24" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=300", description: "Succulent requiring minimal water.", cost: "$15" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", description: "Drought resistant and compact.", cost: "$10" },
        { name: "Ponytail Palm", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300", description: "Stores water in its trunk.", cost: "$26" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)} className="cart-btn">
            🛒 Cart ({totalCartCount})
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plants-list">
                {categoryObj.plants.map((plant, index) => (
                  <div key={index} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={isPlantInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;