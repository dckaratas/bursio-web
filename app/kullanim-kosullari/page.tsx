import Link from "next/link";

export default function KullanimKosullariPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Kullanım Koşulları</h1>
      <p className="text-sm text-gray-400 mb-8">Son güncelleme: Haziran 2025</p>

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Genel</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            BursIO, üniversite öğrencileri ile burs vermek isteyen bireyler arasında
            köprü kuran bir platformdur. Platform yalnızca tanışma ortamı sağlar;
            finansal transferlerden ve taraflar arasındaki anlaşmalardan sorumlu değildir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Kullanıcı Yükümlülükleri</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
            <li>Gerçek ve doğru bilgi sağlamak</li>
            <li>Öğrenci kaydı için geçerli üniversite e-postası kullanmak</li>
            <li>Diğer kullanıcılara saygılı davranmak</li>
            <li>Platformu kötüye kullanmamak, spam göndermemek</li>
            <li>Başkalarının kişisel bilgilerini izinsiz paylaşmamak</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Yasak Kullanımlar</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
            <li>Sahte profil oluşturmak</li>
            <li>Taciz, tehdit veya ayrımcı davranış</li>
            <li>Ticari amaçlı kullanım</li>
            <li>Platformun güvenliğini tehdit eden eylemler</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Sorumluluk Sınırı</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            BursIO, kullanıcılar arasındaki para transferlerinden, anlaşmazlıklardan
            veya doğrudan iletişimden doğan sorunlardan sorumlu tutulamaz. Platform
            yalnızca eşleşme ortamı sağlar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Hesap Askıya Alma</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kullanım koşullarını ihlal eden hesaplar önceden bildirim yapılmaksızın
            askıya alınabilir veya silinebilir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Değişiklikler</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Bu koşullar önceden haber verilmeksizin güncellenebilir. Güncel versiyonu
            takip etmek kullanıcının sorumluluğundadır.
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