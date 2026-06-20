"use client";

import Link from "next/link";
import { ROUTES } from "@/constants";
import { GraduationCap, Heart, Shield, Zap } from "lucide-react";
import MaintenanceBanner from "@/components/ui/MaintenanceBanner";
import { useSystemStatus } from "@/hooks/useStatus";

export default function HomePage() {
  const { data: status } = useSystemStatus();

  return (
    <>
      {status?.active && <MaintenanceBanner message={status.message} />}
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 rounded-full px-4 py-1.5 text-sm mb-6">
            <span>🎓</span>
            <span>Türkiye'nin Burs Platformu</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Hayallerine Ulaşmak İçin
            <br />
            <span className="text-blue-300">Doğru Burs Seni Bekliyor</span>
          </h1>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Üniversite öğrencilerini burs vermek isteyen bireylerle buluşturuyoruz.
            Güvenli, şeffaf ve tamamen ücretsiz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.REGISTER}
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Hemen Başla
            </Link>
            <Link
              href="#nasil-calisir"
              className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Nasıl Çalışır?
            </Link>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-700">45+</p>
            <p className="text-sm text-gray-500 mt-1">Üniversite</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-700">%100</p>
            <p className="text-sm text-gray-500 mt-1">Ücretsiz</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-700">Güvenli</p>
            <p className="text-sm text-gray-500 mt-1">Email Doğrulama</p>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section id="nasil-calisir" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Nasıl Çalışır?
            </h2>
            <p className="text-gray-500">
              İki taraf için de son derece basit bir süreç
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Öğrenci tarafı */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Öğrenciler İçin
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: "1",
                    title: "Üniversite emailinle kayıt ol",
                    desc: "Sadece .edu.tr uzantılı email ile kayıt olabilirsin.",
                  },
                  {
                    step: "2",
                    title: "Profilini doldur",
                    desc: "Bölümün, notların ve motivasyonunu paylaş.",
                  },
                  {
                    step: "3",
                    title: "Talep bekle",
                    desc: "Burs vermek isteyen biri seni seçtiğinde email alırsın.",
                  },
                  {
                    step: "4",
                    title: "Kabul et ve iletişime geç",
                    desc: "Teklifi kabul edersen iletişim bilgilerin paylaşılır.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-blue-700 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Burs veren tarafı */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Burs Verenler İçin
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: "1",
                    title: "Kayıt ol",
                    desc: "Normal email adresinle kayıt olabilirsin.",
                  },
                  {
                    step: "2",
                    title: "Filtre belirle",
                    desc: "Üniversite, bölüm, sınıf gibi kriterler belirle.",
                  },
                  {
                    step: "3",
                    title: "Rastgele eşleş",
                    desc: "Sistem filtreye uyan öğrencilerden birini seçer.",
                  },
                  {
                    step: "4",
                    title: "İletişime geç",
                    desc: "Öğrenci kabul ederse iletişim bilgisine ulaşırsın.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="bg-white py-20 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Neden BursIO?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-6 h-6 text-blue-700" />,
                bg: "bg-blue-100",
                title: "Güvenli",
                desc: "Öğrenci kimliği üniversite emailiyle doğrulanır. İletişim bilgileri sadece eşleşme sonrası paylaşılır.",
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-600" />,
                bg: "bg-yellow-100",
                title: "Hızlı",
                desc: "Dakikalar içinde kayıt ol, profilini doldur ve burs sürecini başlat.",
              },
              {
                icon: <Heart className="w-6 h-6 text-red-600" />,
                bg: "bg-red-100",
                title: "Ücretsiz",
                desc: "Platform tamamen ücretsizdir. Para transferi taraflar arasında gerçekleşir.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Hemen Başla</h2>
          <p className="text-blue-100 mb-8">
            Binlerce öğrenci burs bekliyor. Sen de bu köprünün bir parçası ol.
          </p>
          <Link
            href={ROUTES.REGISTER}
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block"
          >
            Ücretsiz Kayıt Ol
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}