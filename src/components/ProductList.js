import React from 'react'
import Product from './Product'

const ProductList = ({data, currentPage, getAllProducts}) => {
  return (
    <main className='main'>
        {data?.length === 0 && <div>No Products</div>}
        
        <ul className='product_list'>
            {data?.length > 0 && data.map(product => <Product product={product} key={product.id} />)}
        </ul>

        {data?.length > 0 && data?.totalPages > 1 &&
        <div className='pagination'>
            <a onClick={() => getAllProducts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>
            <a>{currentPage}</a>
            <a onClick={() => getAllProducts(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
        </div>
        }

    </main>
  )
}

export default ProductList