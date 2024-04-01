import Link from 'next/Link';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-center">
      <div className="navbar p-0 m-2 w-11/12 bg-blue-500 rounded-xl">
        <div className="navbar-start">
          <Link href="/">
            <img src='logo1.png' alt='logo' className='w-6/12 p-2 ml-3'/>
          </Link>
        </div>
        <div className="navbar-end mr-3 flex">
          <Link href="/calendar">
            <div className="px-3 cursor-pointer sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Calendar</div>
          </Link>
          <Link href="/timer">
            <div className="px-3 cursor-pointer sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Timer</div>
          </Link>
          <Link href="/stopwatch">
            <div className="px-3 cursor-pointer sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">StopWatch</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
