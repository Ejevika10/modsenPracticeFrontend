import React from 'react'

const CategoryDropdown = ({categories}) => {
  return (
    <div>
        <select>
            {categories?.length > 0 && categories.map(category =>{return (<option key = {category.id} value = {category.id}>{category.name}</option>)}  )}
        </select>
    </div>
  )
}

export default CategoryDropdown