import Link from "next/link";

export default function GizlilikPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
      <p className="text-sm text-gray-400 mb-8">Son güncelleme: Haziran 2026</p>

      <div className="prose prose-gray max-w-none flex flex-col gap-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Veri Sorumlusu</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            BursIO platformu kapsamında kişisel verileriniz, 6698 sayılı Kişisel Verilerin
            Korunması Kanunu (KVKK) uyarınca veri sorumlusu sıfatıyla BursIO tarafından
            işlenmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Toplanan Veriler</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Platform üzerinden aşağıdaki kişisel veriler toplanmaktadır:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
            <li>Ad, soyad, e-posta adresi</li>
            <li>Üniversite, bölüm, sınıf, not ortalaması bilgileri (öğrenciler için)</li>
            <li>İletişim bilgisi (sadece eşleşme kabul edildiğinde paylaşılır)</li>
            <li>Platform kullanım verileri (kayıt tarihi, eşleşme bilgileri)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Verilerin İşlenme Amacı</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
            <li>Platformun temel işlevlerinin sağlanması</li>
            <li>Öğrenci kimliğinin doğrulanması</li>
            <li>Burs veren ile öğrenci arasında eşleşme yapılması</li>
            <li>Güvenlik ve kötüye kullanım önleme</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Veri Güvenliği</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kişisel verileriniz şifrelenmiş bağlantı (HTTPS) üzerinden iletilmekte,
            şifreler algoritma ile hashlenmektedir. İletişim bilgileriniz
            yalnızca eşleşme kabul edildiğinde karşı tarafa iletilmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Haklarınız</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            KVKK kapsamında aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Verilerinizin düzeltilmesini talep etme</li>
            <li>Verilerinizin silinmesini talep etme</li>
            <li>Veri işlemeye itiraz etme</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Talepleriniz için:{" "}
            <a href="mailto:kvkk@bursio.com.tr" className="text-blue-700 hover:underline">
              kvkk@bursio.com.tr
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Çerezler</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Platform, oturum yönetimi için zorunlu çerezler kullanmaktadır.
            Analitik veya pazarlama amaçlı çerez kullanılmamaktadır.
          </p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}