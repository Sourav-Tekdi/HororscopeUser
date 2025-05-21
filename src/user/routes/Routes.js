import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import NotFound from '../../pages/Notfound'
import Dashboard from '../screens/Dashboard'
import ShopSingle from '../screens/ShopSingle'
import Shop from '../screens/Shop'
import Astrologer from '../screens/Astrologer'
import RechargePlans from '../screens/RechargePlans'
import Blog from '../screens/Blog'
import BlogView from '../screens/BlogView'
import Aboutus from '../screens/Aboutus'
import Contactus from '../screens/Contactus'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'
import RechargePlanDetails from '../screens/RechargePlanDetails'
import FreeKundli from '../screens/FreeKundli'
import KundliReport from '../screens/KundliReport'
import Checkout from '../screens/Checkout'
import OrderSuccess from '../screens/OrderSuccess'
import RechargeSuccess from '../screens/RechargeSuccess'
import Horoscope from '../screens/Horoscope'

import NotProtectedRoute from '../components/NotProtectedRoute'
import ProtectedRoute from '../components/ProtectedRoute'

import { AuthProvider } from '../context/AuthContext'
import { NetworkProvider } from '../context/NetworkProvider'
import { ProfileProvider } from '../context/ProfileContext'

const RoutesComponent = () => {
    return (
        <ProfileProvider>
            <NetworkProvider>
                <AuthProvider>
                    <Router basename="/">
                        <Routes>
                            <Route path="/" element={<Dashboard title='Dashboard' />} />

                            <Route path="/login" element={<NotProtectedRoute><Login title="Login" /></NotProtectedRoute>} />
                            <Route path="/register" element={<NotProtectedRoute><Register title="Register" /></NotProtectedRoute>} />
                            <Route path="/chat/:id" element={<ProtectedRoute><Chat title="Chat" /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><Profile title="Profile" /></ProtectedRoute>} />
                            {/* <Route exact path="/" element={<Dashboard title="Dashboard" />} /> */}
                            <Route path="/products" element={<Shop title="Shop" />} />
                            <Route path="/products/view/:id" element={<ShopSingle title="Product View" />} />
                            <Route path="/blogs" element={<Blog title="Blogs" />} />
                            <Route path="/blogs/view/:id" element={<BlogView title="Blog View" />} />
                            <Route path="/aboutus" element={<Aboutus title="About US" />} />
                            <Route path="/contactus" element={<Contactus title="Contact US" />} />
                            <Route path="/notfound" element={<NotFound title="Not Found" />} />
                            <Route path="/astrologer" element={<Astrologer title="Astrologer" />} />
                            <Route path="/recharge-plans" element={<RechargePlans title="Recharge Plans" />} />

                            <Route path="/free-kundli" element={<FreeKundli title="Free Kundli" />} />
                            <Route path="/kundli-report" element={<KundliReport title="Kundli Report" />} />
                            <Route path="/checkout" element={<Checkout title="Checkout" />} />
                            <Route path="/order-success" element={<OrderSuccess title="Order Success" />} />
                            <Route path="/recharge-success" element={<RechargeSuccess title="Recharge Success" />} />

                            <Route path="/horoscope/:sign" element={<Horoscope title="Horoscope" />} />

                            <Route path="/recharge-plans-details/:id" element={<RechargePlanDetails title="Recharge Plan Details" />} />
                            <Route path="*" element={<NotFound />} />


                        </Routes>
                    </Router>
                </AuthProvider>
            </NetworkProvider>
        </ProfileProvider>
    )
}

export default RoutesComponent
