import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-full max-h-full">
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-4 md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <Image
                src="/icons/logo.png"
                width={34}
                height={34}
                alt="logo"
                className="rounded-xl"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-2xl">
                하나 대시보드
              </h1>
              <p className="hidden text-sm text-slate-500 md:block">
                Carbon Neutrality Compliance Platform
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">
                Live Monitoring
              </span>
            </div>

            <Link
              href="https://www.hanaloop.com/"
              target="_blank"
              className="hidden h-11 items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md md:flex"
            >
              <Image
                src="/icons/hanaloop.png"
                width={74}
                height={34}
                alt="hanaloop website"
              />
            </Link>

            <Link
              href="https://www.hana.eco/"
              target="_blank"
              className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md md:flex"
            >
              <Image
                src="/icons/hanaeco.png"
                width={28}
                height={28}
                alt="hana eco website"
              />
            </Link>

            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 md:hidden">
              <Image
                src="/images/menu.png"
                width={24}
                height={24}
                alt="Menu"
              />
            </button>
          </div>
        </div>
      </header>
      <main className="w-full h-full flex flex-col md:flex-row md:overflow-y-hidden">
        <aside className="fixed left-0 top-0 z-20 flex h-screen w-full flex-col bg-white/90 backdrop-blur-xl md:static md:w-auto md:flex-row md:bg-transparent md:backdrop-blur-none">
          <div className="block h-20 w-full md:hidden" />

          <nav className="w-full overflow-auto px-4 py-6 md:w-[110px] md:shrink-0 md:px-3">
            <ul className="flex flex-col gap-4">
              <li>
                <button className="group flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lg md:flex-col md:justify-center md:gap-3">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-white">
                    <Image
                      src="/icons/home.png"
                      width={34}
                      height={34}
                      alt="dashboard page"
                      className="absolute transition-opacity group-hover:opacity-0"
                    />

                    <Image
                      src="/icons/home_fill.png"
                      width={34}
                      height={34}
                      alt="dashboard page"
                      className="absolute opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  <div className="text-left md:text-center">
                    <h4 className="font-semibold text-slate-800">
                      홈
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 md:hidden">
                      대시보드 개요 및 KPI
                    </p>
                  </div>
                </button>
              </li>

              <li>
                <button className="group flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 hover:shadow-lg md:flex-col md:justify-center md:gap-3">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-white">
                    <Image
                      src="/icons/people.png"
                      width={34}
                      height={34}
                      alt="groups page"
                      className="absolute transition-opacity group-hover:opacity-0"
                    />

                    <Image
                      src="/icons/people_fill.png"
                      width={34}
                      height={34}
                      alt="groups page"
                      className="absolute opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  <div className="text-left md:text-center">
                    <h4 className="font-semibold text-slate-800">
                      그룹
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 md:hidden">
                      조직 계층 및 관리 그룹
                    </p>
                  </div>
                </button>
              </li>

              <li>
                <button className="group flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50 hover:shadow-lg md:flex-col md:justify-center md:gap-3">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-white">
                    <Image
                      src="/icons/server.png"
                      width={34}
                      height={34}
                      alt="records page"
                      className="absolute transition-opacity group-hover:opacity-0"
                    />

                    <Image
                      src="/icons/server_fill.png"
                      width={34}
                      height={34}
                      alt="records page"
                      className="absolute opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  <div className="text-left md:text-center">
                    <h4 className="font-semibold text-slate-800">
                      레코드
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 md:hidden">
                      배출 데이터 및 기록
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </nav>

          <section className="hidden h-full min-w-[320px] flex-1 border-l border-slate-200/70 bg-white/70 p-6 backdrop-blur md:block">
            <header className="mb-8 border-b border-slate-200 pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">
                    Dashboard Navigation
                  </p>

                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Home
                  </h3>
                </div>

                <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100">
                  뒤로 가기
                </button>
              </div>
            </header>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-5 text-white shadow-lg shadow-emerald-500/20">
              <p className="text-sm text-emerald-100">
                Current Status
              </p>

              <h4 className="mt-3 text-2xl font-bold">
                탄소 배출량이 안정 구간에 있습니다.
              </h4>

              <p className="mt-3 text-sm leading-6 text-emerald-50">
                최근 30일 기준 전체 배출량이 8.4% 감소했으며,
                Scope 2 최적화가 가장 큰 영향을 주고 있습니다.
              </p>
            </div>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "개요",
                "전체 배출량",
                "계층별 배출량",
                "Scope별 배출량",
              ].map((item, index) => (
                <li key={item}>
                  <button
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${index === 0
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                  >
                    <div>
                      <h5 className="font-semibold text-slate-800">
                        {item}
                      </h5>

                      <p className="mt-1 text-sm text-slate-400">
                        관련 데이터 및 분석 보기
                      </p>
                    </div>

                    <div
                      className={`h-2.5 w-2.5 rounded-full ${index === 0
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                        }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
        <div id="mainLayout" className="w-full min-h-screen p-4 md:p-8 bg-slate-50">
          <div id="mainHeader" className="flex flex-col gap-2 mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                Carbon Management Overview
              </p>
              <h3 className="text-3xl font-bold text-slate-900">
                개요
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                조직 전체의 탄소 배출량, 탄소세 예상 비용, Scope별 현황을 한눈에 확인하세요.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-xl text-slate-700 shadow-sm hover:bg-slate-100">
                이번 달
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-xl shadow-sm hover:bg-emerald-700">
                보고서 생성
              </button>
            </div>
          </div>

          <div id="mainContent" className="space-y-8">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <p className="text-sm text-slate-500">총 배출량</p>
                <h4 className="mt-3 text-3xl font-bold text-slate-900">
                  42,380
                  <span className="ml-2 text-sm font-medium text-slate-400">tCO₂e</span>
                </h4>
                <p className="mt-4 text-sm text-emerald-600">
                  전월 대비 8.4% 감소
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <p className="text-sm text-slate-500">예상 탄소세</p>
                <h4 className="mt-3 text-3xl font-bold text-slate-900">
                  ₩128M
                </h4>
                <p className="mt-4 text-sm text-amber-600">
                  기준치 초과 부서 3곳
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <p className="text-sm text-slate-500">관리 그룹</p>
                <h4 className="mt-3 text-3xl font-bold text-slate-900">
                  18
                  <span className="ml-2 text-sm font-medium text-slate-400">groups</span>
                </h4>
                <p className="mt-4 text-sm text-slate-500">
                  4개 계층 구조
                </p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-sm">
                <p className="text-sm text-slate-400">리스크 레벨</p>
                <h4 className="mt-3 text-3xl font-bold text-white">
                  Moderate
                </h4>
                <p className="mt-4 text-sm text-emerald-400">
                  안정 구간에 근접
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      월별 탄소 배출량
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      최근 6개월 배출량 추이
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                    -8.4%
                  </span>
                </div>

                <div className="flex items-end gap-4 h-72">
                  {[45, 62, 38, 72, 55, 48].map((height, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 gap-3">
                      <div className="flex items-end w-full h-56 bg-slate-100 rounded-2xl overflow-hidden">
                        <div
                          className="w-full bg-gradient-to-t from-emerald-600 to-teal-300 rounded-2xl"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">
                        {index + 1}월
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-900">
                  Scope별 배출량
                </h4>
                <p className="mt-1 mb-6 text-sm text-slate-500">
                  직접/간접 배출 비중
                </p>

                <div className="space-y-5">
                  {[
                    ["Scope 1", "직접 배출", "42%", "bg-emerald-500"],
                    ["Scope 2", "전력 사용", "35%", "bg-teal-500"],
                    ["Scope 3", "기타 간접", "23%", "bg-cyan-500"],
                  ].map(([name, desc, value, color]) => (
                    <div key={name}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{name}</p>
                          <p className="text-xs text-slate-400">{desc}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{value}</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-900">
                  계층별 배출량
                </h4>
                <p className="mt-1 mb-6 text-sm text-slate-500">
                  조직 단위별 총 배출량 비교
                </p>

                <div className="space-y-4">
                  {[
                    ["본사", "14,200 tCO₂e", "78%"],
                    ["공장 A", "11,840 tCO₂e", "64%"],
                    ["물류센터", "8,930 tCO₂e", "48%"],
                    ["해외 법인", "7,410 tCO₂e", "39%"],
                  ].map(([name, amount, value]) => (
                    <div key={name} className="p-4 border border-slate-100 rounded-2xl">
                      <div className="flex justify-between mb-3">
                        <span className="font-medium text-slate-800">{name}</span>
                        <span className="text-sm text-slate-500">{amount}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-800 rounded-full" style={{ width: value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-linear-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-sm text-white">
                <p className="text-sm text-emerald-100">
                  Compliance Insight
                </p>
                <h4 className="mt-3 text-2xl font-bold">
                  탄소세 리스크가 높은 그룹을 먼저 확인하세요.
                </h4>
                <p className="mt-4 text-sm leading-6 text-emerald-50">
                  현재 기준치 대비 초과 가능성이 있는 그룹은 3곳입니다.
                  Scope 2 전력 사용량이 가장 큰 비중을 차지하므로,
                  전력 사용량 최적화가 우선순위입니다.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-white/15 rounded-2xl backdrop-blur">
                    <p className="text-sm text-emerald-100">초과 위험</p>
                    <h5 className="mt-2 text-2xl font-bold">3</h5>
                  </div>
                  <div className="p-4 bg-white/15 rounded-2xl backdrop-blur">
                    <p className="text-sm text-emerald-100">절감 가능성</p>
                    <h5 className="mt-2 text-2xl font-bold">12.6%</h5>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
