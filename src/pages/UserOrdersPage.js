import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"
import UserOrder from "../features/user/components/UserOrder"

function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <UserOrder></UserOrder>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default UserOrdersPage
