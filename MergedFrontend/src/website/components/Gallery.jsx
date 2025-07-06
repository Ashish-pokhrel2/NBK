import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/gallery.css';
import Header from './Header';
function Gallery() {
  const [selectedItem, setSelectedItem] = useState(2);

  const gridItems = [
  { id: 1, type: 'large', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { id: 2, type: 'medium' },
  { id: 3, type: 'small' },
  { id: 4, type: 'tall' },
  { id: 5, type: 'small' },
  { id: 6, type: 'small' },
  { id: 7, type: 'small' },
  { id: 8, type: 'tall' },
  { id: 9, type: 'small' },
  { id: 10, type: 'small' },
  { id: 11, type: 'small' },
  { id: 12, type: 'large' },
  // Add these two new items
  { id: 13, type: 'small' },  // Replicates item 2 (top center medium)
  { id: 14, type: 'medium' } ,   // Replicates item 3 (top center-right small)
];

  const handleItemClick = (id) => {
    setSelectedItem(id);
  };

  return (
    
    <>
    <Header />
    <div className="slideshow-container">
      <header className="slideshow-header">
        <button className="nav-button" aria-label="Previous slide">
          <ChevronLeft size={32} />
        </button>
        <h1 className="slideshow-title">slide show</h1>
        <button className="nav-button" aria-label="Next slide">
          <ChevronRight size={32} />
        </button>
      </header>
      
      <div className="slideshow-grid">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className={`grid-item ${item.type} ${selectedItem === item.id ? 'selected' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.image && (
              <img 
                src={item.image} 
                alt={`Slide ${item.id}`}
                className="grid-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
   </>
  );
}

export default Gallery;