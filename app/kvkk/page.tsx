import Link from "next/link";

export default function KvkkPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        KVKK Aydınlatma Metni
      </h1>
      <p className="text-sm text-gray-400 mb-8">Son güncelleme: Haziran 2026</p>

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Veri Sorumlusu</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu
            BursIO'dur. İletişim: kvkk@bursio.com.tr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            İşlenen Kişisel Veriler ve Amaçları
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2 text-gray-700 font-medium border-b border-gray-200">
                    Veri
                  </th>
                  <th className="text-left px-4 py-2 text-gray-700 font-medium border-b border-gray-200">
                    Amaç
                  </th>
                  <th className="text-left px-4 py-2 text-gray-700 font-medium border-b border-gray-200">
                    Dayanak
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Ad, soyad, e-posta", "Kimlik doğrulama, iletişim", "Sözleşme ifası"],
                  ["Üniversite, bölüm, not", "Eşleşme yapılması", "Açık rıza"],
                  ["İletişim bilgisi", "Eşleşme sonrası paylaşım", "Açık rıza"],
                  ["IP adresi, kullanım verisi", "Güvenlik, kötüye kullanım önleme", "Meşru menfaat"],
                ].map(([veri, amac, dayanak]) => (
                  <tr key={veri} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-600">{veri}</td>
                    <td className="px-4 py-2 text-gray-600">{amac}</td>
                    <td className="px-4 py-2 text-gray-600">{dayanak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verilerin Aktarılması
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            İletişim bilgileriniz yalnızca eşleşme kabul edildiğinde karşı tarafa
            iletilir. E-posta gönderimi amacıyla Brevo (Sendinblue SAS, Fransa/AB sunucuları)
            ile veri paylaşımı yapılmaktadır. Bu aktarım KVKK md. 9 kapsamında açık rızanıza
            dayanmaktadır. Bunun dışında üçüncü taraflara veya yurt dışına veri aktarımı yapılmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Saklama Süresi
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Verileriniz hesabınız aktif olduğu sürece saklanır. Hesap silme talebinde
            verileriniz 30 gün içinde silinir. Yasal zorunluluk halinde ilgili mevzuatta
            öngörülen süreler geçerlidir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Haklarınız</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme (Md. 11/a)</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme (Md. 11/b)</li>
            <li>Amacına uygun kullanılıp kullanılmadığını öğrenme (Md. 11/c)</li>
            <li>Yurt içinde veya dışında aktarıldığı üçüncü kişileri öğrenme (Md. 11/ç)</li>
            <li>Eksik/yanlış işlenmesi halinde düzeltilmesini isteme (Md. 11/d)</li>
            <li>Silinmesini veya yok edilmesini isteme (Md. 11/e)</li>
            <li>Otomatik sistemler vasıtasıyla aleyhinize sonuç doğurmasına itiraz etme (Md. 11/ğ)</li>
            <li>Zararın giderilmesini talep etme (Md. 11/h)</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Başvuru:{" "}
            <a href="mailto:kvkk@bursio.com.tr" className="text-blue-700 hover:underline">
              kvkk@bursio.com.tr
            </a>
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