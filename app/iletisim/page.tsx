import type { Metadata } from "next";
import { Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "İletişim",
    description: "BursIO ile iletişime geçin. Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşın.",
};

export default function IletisimPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">İletişim</h1>
                <p className="text-gray-500 text-lg">
                    Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşabilirsiniz.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-blue-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Genel</h3>
                    <a
                        href="mailto:info@bursio.com.tr"
                        className="text-blue-700 hover:underline text-sm"
                    >
                        info@bursio.com.tr
                    </a>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">KVKK & Gizlilik</h3>
                    <a
                        href="mailto:kvkk@bursio.com.tr"
                        className="text-blue-700 hover:underline text-sm"
                    >
                        kvkk@bursio.com.tr
                    </a>
                </div>

            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
                <div className="flex flex-col gap-5">
                    {[
                        {
                            q: "Platform tamamen ücretsiz mi?",
                            a: "Evet. BursIO öğrenciler ve burs verenler için tamamen ücretsizdir. Para transferi taraflar arasında direkt gerçekleşir.",
                        },
                        {
                            q: "Üniversite emailim yoksa kayıt olabilir miyim?",
                            a: "Öğrenci olarak kayıt yalnızca devlet üniversitelerine ait .edu.tr uzantılı email adresleriyle yapılabilir. Burs veren olarak herhangi bir email adresiyle kayıt olabilirsiniz.",
                        },
                        {
                            q: "Verilerimin güvenliği nasıl sağlanıyor?",
                            a: "Kişisel verileriniz KVKK kapsamında işlenmektedir. İletişim bilgileriniz yalnızca eşleşme gerçekleştiğinde karşı tarafla paylaşılır.",
                        },
                    ].map((item) => (
                        <div key={item.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                            <p className="font-medium text-gray-900 mb-1">{item.q}</p>
                            <p className="text-sm text-gray-500">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
