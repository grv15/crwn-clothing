import React from 'react';
import CategoryItem from '../category-item/category-item.component';
import './categories.styles.scss';

const Categories = ({CategoryObj}) => {
  return (
    <div className="categories-container">
      {CategoryObj.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default Categories;