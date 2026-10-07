import Image from 'next/image';
import logo from '../../../public/logo.webp'
import NavlistPage from './Navlist';
import SignUpSignInBtnPage from './SignUpSignInBtn';

const NavbarPage = async() => {
    const today = new Date();
   const date = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

    return (
       <nav className='container mx-auto mt-4'>
         <div className='flex justify-between items-center'>
            <div>
                {/* empty box */}
            </div>

            <div className='flex justify-center items-center gap-3'>
                <Image
                src={logo}
                width={50}
                height={50}
                alt='logo'
                className='object-cover'
                ></Image>
                <div>
                    <h1>Bangla News 24</h1>
                     <p className='text-gray-500'>{date}</p>
                </div>
            </div>

            <div>
                <SignUpSignInBtnPage></SignUpSignInBtnPage>
            </div>
        </div>
        <div >
            <NavlistPage></NavlistPage>
        </div>
       </nav>
    );
};

export default NavbarPage;