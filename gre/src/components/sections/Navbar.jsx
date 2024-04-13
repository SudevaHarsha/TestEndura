// components/Navbar.js


import { currentProfile } from '@/lib/current-profile';
import NavElements from './NavElements';

const Navbar = async() => {
    
    const profile = await currentProfile();

    return (
        <nav className="mx-auto px-4 sm:px-6 lg:px-24">
            <NavElements profile={profile} />
        </nav>
    );
};

export default Navbar;
