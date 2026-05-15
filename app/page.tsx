import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-full">
      <header className="flex p-4 items-center justify-between md:p-6">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <h3 className="flex gap-2 items-center">
              <Image src="/icons/logo.png" width={50} height={50} alt="logo" />
              <span className="text-lg md:text-2xl">하나 대시보드</span>
            </h3>
          </Link>
          <h6 className="hidden md:block md:text-sm">탄소 관리 플랫폼 </h6>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="https://www.hanaloop.com/" target="_blank" className="hidden md:block">
            <Image src="/icons/hanaloop.png" width={70} height={50} alt="hanaloop website" />
          </Link>
          <Link href="https://www.hana.eco/" className="hidden md:block">
            <Image src="/icons/hanaeco.png" width={50} height={50} alt="hana eco website" />
          </Link>
          <div className="md:hidden">
            <button className="cursor-pointer">
              <Image src="/images/menu.png" width={30} height={30} alt="Menu" />
            </button>
          </div>
        </div>
      </header>
      <main className="w-full h-full flex">
        <aside className="p-4 w-auto h-full flex shadow-xl rounded-2xl">
          <nav className="h-full p-4 border-r border-r-gray-200 mr-2">
            <ul>
              <li className="p-4">
                <Image src="/icons/home.png" width={40} height={40} alt="dashboard page" />
              </li>
              <li className="p-4">
                <Image src="/icons/people.png" width={40} height={40} alt="dashboard page" />
              </li>
              <li className="p-4">
                <Image src="/icons/server.png" width={40} height={40} alt="dashboard page" />
              </li>
            </ul>
          </nav>
          <section className="min-w-[300] h-full p-4">
            <header className="flex justify-between p-4 mb-4 border-b border-b-gray-200">
              <h2>Dashboard</h2>
              <div>뒤로 가기</div>
            </header>
            <ul>
              <li>개요</li>
              <li>전체 배출량</li>
              <li>계층별 배출량</li>
              <li>Scope별 배출량</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}
