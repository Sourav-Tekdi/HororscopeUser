import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'
// import Register from '../screens/Register'
// import NotFound from '../../pages/Notfound'
import Dashboard from '../screens/Dashboard'
// import AddAstrologer from '../screens/astrologer/AddAstrologer'
// import AllAstrologer from '../screens/astrologer/AllAstrologer'
// import AddProduct from '../screens/product/AddProduct'
// import AllProduct from '../screens/product/AllProduct'
// import ProtectedRoute from '../components/ProtectedRoute'
import NotProtectedRoute from '../components/NotProtectedRoute'
import { AuthProvider } from '../context/AuthContext'
import { NetworkProvider } from '../context/NetworkProvider'
import { ProfileProvider } from '../context/ProfileContext'
// import Profile from '../screens/profile/Profile'
// import ViewAstrologer from '../screens/astrologer/ViewAstrologer'
// import AllCategory from '../screens/category/AllCategory'
// import AddCategory from '../screens/category/AddCategory'
// import ViewCategory from '../screens/category/ViewCategory'
// import ViewProduct from '../screens/product/ViewProduct'
// import AddPost from '../screens/post/AddPost'
// import AllPost from '../screens/post/AllPost'
// import MyPost from '../screens/post/MyPost'
// import UpdatePost from '../screens/post/UpdatePost'
// import AddFaq from '../screens/faq/AddFaq'
// import AllFaq from '../screens/faq/AllFaq'
// import ViewFaq from '../screens/faq/ViewFaq'
// import AllContact from '../screens/contact/AllContact'
// import Settings from '../screens/settings/Settings'
// import Chat from '../screens/chat/Chat'
// import ViewPost from '../screens/post/ViewPost'

const RoutesComponent = () => {
    return (
        <ProfileProvider>
            <NetworkProvider>
                <AuthProvider>
                    <Router basename="/">
                        <Routes>
                            {/* <Route path="/login" element={<NotProtectedRoute><Login title='Login' /></NotProtectedRoute>} /> */}
                            {/* <Route path="/register" element={<NotProtectedRoute><Register title="Register" /></NotProtectedRoute>} /> */}
                            {/* <Route exact path="/" element={<Dashboard title="Dashboard" />} /> */}
                            <Route exact path="/" element={<NotProtectedRoute><Dashboard title='Dashboard' /></NotProtectedRoute>} />

{/* 
                            <Route path="/settings" element={<ProtectedRoute><Settings title='Settings' /></ProtectedRoute>} />


                            <Route path="/astrologers/add" element={<ProtectedRoute><AddAstrologer title='Add Astrologer' /></ProtectedRoute>} />
                            <Route path="/astrologers" element={<ProtectedRoute><AllAstrologer title='All Astrologer' /></ProtectedRoute>} />
                            <Route path="/astrologers/view/:id" element={<ProtectedRoute><ViewAstrologer title='Astrologer Profile' /></ProtectedRoute>} />


                            <Route path="/products/add" element={<ProtectedRoute><AddProduct title='Add Product' /></ProtectedRoute>} />
                            <Route path="/products" element={<ProtectedRoute><AllProduct title='All Product' /></ProtectedRoute>} />
                            <Route path="/products/view/:id" element={<ProtectedRoute><ViewProduct title='Edit Product' /></ProtectedRoute>} />


                            <Route path="/category" element={<ProtectedRoute><AllCategory title='All Category' /></ProtectedRoute>} />
                            <Route path="/category/add" element={<ProtectedRoute><AddCategory title='Add Category' /></ProtectedRoute>} />
                            <Route path="/category/view/:id" element={<ProtectedRoute><ViewCategory title='Edit Category' /></ProtectedRoute>} />

                            <Route path="/post/add" element={<ProtectedRoute><AddPost title='Add Post' /></ProtectedRoute>} />
                            <Route path="/post" element={<ProtectedRoute><AllPost title='All Post' /></ProtectedRoute>} />
                            <Route path="/mypost" element={<ProtectedRoute><MyPost title='My Post' /></ProtectedRoute>} />

                            <Route path="/post/update/:id" element={<ProtectedRoute><UpdatePost title='Edit Post' /></ProtectedRoute>} />
                            <Route path="/post/view/:id" element={<ProtectedRoute><ViewPost title='View Post' /></ProtectedRoute>} />


                            <Route path="/faq/add" element={<ProtectedRoute><AddFaq title='Add FAQ' /></ProtectedRoute>} />
                            <Route path="/faq" element={<ProtectedRoute><AllFaq title='All FAQ' /></ProtectedRoute>} />
                            <Route path="/faq/view/:id" element={<ProtectedRoute><ViewFaq title='Edit FAQ' /></ProtectedRoute>} />

                            <Route path="/contact" element={<ProtectedRoute><AllContact title='Contact US' /></ProtectedRoute>} />


                            <Route path="/profile" element={<ProtectedRoute><Profile title='Profile' /></ProtectedRoute>} />
                            <Route path="/chat/:id?" element={<ProtectedRoute><Chat title='Chat' /></ProtectedRoute>} />
                            <Route path="*" element={<NotFound />} /> */}
                        </Routes>
                    </Router>
                </AuthProvider>
            </NetworkProvider>
        </ProfileProvider>
    )
}

export default RoutesComponent
