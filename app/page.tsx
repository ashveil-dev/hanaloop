import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-full">
      <header className="flex justify-between p-6">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <h3 className="flex gap-2 items-center">
              <Image src="/icons/logo.png" width={50} height={50} alt="" />
              <span className="text-2xl">하나 대시보드</span>
            </h3>
          </Link>
          <h6 className="text-sm">탄소 관리 플랫폼 </h6>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="https://www.hanaloop.com/" target="_blank">
            <Image src="/icons/hanaloop.png" width={70} height={50} alt="" />
          </Link>
          <Link href="https://www.hana.eco/">
            <Image src="/icons/hanaeco.png" width={50} height={50} alt="" />
          </Link>
        </div>
      </header>
      <div id="sidebar" className="w-1/3 min-w-[300] h-full ">

      </div>
    </div>
  );
}
