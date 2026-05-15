import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-full">
      <header className="fixed md:static flex z-10 w-full h-28 p-4 top-0 items-center justify-between md:p-6">
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
      <main className="w-full h-full flex flex-col md:flex-row">
        <aside className="fixed top-0 left-0 bg-slate-50 md:bg-transparent h-full max-h-full flex flex-col md:flex-row items-start w-full md:p-4 md:shrink-0 md:static md:w-auto md:shadow-xl md:rounded-2xl">
          <div className="w-full h-28 block md:hidden"></div>
          <nav className="overflow-auto w-full p-4 md:w-auto md:shrink-0 md:h-full md:border-r md:border-r-gray-200 mr-2">
            <ul className="flex flex-col gap-6 ">
              <li className="flex items-center gap-4 p-4 bg-white rounded-2xl md:p-0 md:bg-transparent md:rounded-none">
                <div className="p-4 group cursor-pointer border border-gray-100 rounded-2xl shadow-sm">
                  <Image src="/icons/home.png" width={40} height={40} alt="dashboard page" className="group-hover:hidden" />
                  <Image src="/icons/home_fill.png" width={40} height={40} alt="dashboard page" className="hidden group-hover:block" />
                </div>
                <div className="md:hidden">
                  홈
                </div>
              </li>
              <li className="flex items-center gap-4 bg-white p-4 rounded-2xl md:p-0 md:bg-transparent md:rounded-none">
                <div className="p-4 group cursor-pointer border border-gray-100 rounded-2xl shadow-sm">
                  <Image src="/icons/people.png" width={40} height={40} alt="dashboard page" className="group-hover:hidden" />
                  <Image src="/icons/people_fill.png" width={40} height={40} alt="dashboard page" className="hidden group-hover:block" />
                </div>
                <div className="md:hidden">
                  그룹
                </div>
              </li>
              <li className="flex items-center gap-4 bg-white p-4 rounded-2xl md:p-0 md:bg-transparent md:rounded-none">
                <div className="p-4 group cursor-pointer border border-gray-100 rounded-2xl shadow-sm">
                  <Image src="/icons/server.png" width={40} height={40} alt="dashboard page" className="group-hover:hidden" />
                  <Image src="/icons/server_fill.png" width={40} height={40} alt="dashboard page" className="hidden group-hover:block" />
                </div>
                <div className="md:hidden">
                  레코드
                </div>
              </li>
            </ul>
          </nav>
          <section className="hidden h-full p-4 md:block md:min-w-[300] ">
            <header className="flex justify-between items-center p-4 mb-4 border-b border-b-gray-200">
              <h3 className="text-2xl">Home</h3>
              <h6 className="text-sm">뒤로 가기</h6>
            </header>
            <ul className="flex flex-col gap-10 p-4">
              <li>
                <h5 className="text-lg">개요</h5>
              </li>
              <li>
                <h5 className="text-lg">전체 배출량</h5>
              </li>
              <li>
                <h5 className="text-lg">계층별 배출량</h5>
              </li>
              <li>
                <h5 className="text-lg">Scope별 배출량</h5>
              </li>
            </ul>
          </section>
        </aside>
        <div id="mainLayout" className="w-full bg-black">

        </div>
      </main>
    </div>
  );
}
