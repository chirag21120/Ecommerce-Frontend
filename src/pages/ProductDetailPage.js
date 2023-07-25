import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"
import ProductDetails from "../features/product-list/components/ProductDetails"

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductDetailPage
