import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import menuData from '../config/menuConfig';
import { useProfile } from '../context/ProfileContext';

const Sidebar = () => {
    const userProfile = useProfile();
    
    const location = useLocation();
    const currentUrl = location.pathname;

    // State to track which submenu is open
    const [openMenu, setOpenMenu] = useState(null);

    // Determine which submenu should be open based on the current URL
    useEffect(() => {
        const activeMenu = menuData.find(menu =>
            menu.path === currentUrl || menu.submenu.some(sub => sub.path === currentUrl)
        );
        setOpenMenu(activeMenu ? activeMenu.path : null);
    }, [currentUrl]);

    // Toggle submenu visibility
    const toggleMenu = (menuPath) => {
        setOpenMenu(prevPath => prevPath === menuPath ? null : menuPath);
    };

    return (
        <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
            <div className="brand-logo">
                <Link to="/">
                    <img
                    src="/admin/assets/images/astroscope.jpeg"
                        className="logo-icon"
                        alt="logo icon"
                    />
                </Link>
            </div>
            <ul className="sidebar-menu do-nicescrol">
                <li className="sidebar-header">MAIN NAVIGATION</li>
                {menuData.map(menu => (
                    menu.role.includes(userProfile.userInfo.type) && (
                        <li
                            key={menu.path}
                            className={`menu-item ${openMenu === menu.path ? 'active' : ''}`}
                        >
                            {menu.submenu.length > 0 ? (
                                <>
                                    <a
                                        href="#"
                                        className="waves-effect"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default anchor behavior
                                            toggleMenu(menu.path);
                                        }}
                                    >
                                        <i className={menu.icon} />
                                        <span>{menu.title}</span>
                                        <i className={`fa fa-angle-left pull-right ${openMenu === menu.path ? 'open' : ''}`} />
                                    </a>
                                    <ul className={`sidebar-submenu ${openMenu === menu.path ? 'open' : ''}`}>
                                        {menu.submenu.map(sub => (
                                            <li
                                                key={sub.path}
                                                className={currentUrl === sub.path ? 'active' : ''}
                                            >
                                                <NavLink to={sub.path}>
                                                    <i className={sub.icon} /> {sub.title}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <NavLink
                                    to={menu.path}
                                    className="waves-effect"
                                >
                                    <i className={menu.icon} />
                                    <span>{menu.title}</span>
                                </NavLink>
                            )}
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
