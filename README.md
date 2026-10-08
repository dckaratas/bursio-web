# BursIO — Web

Üniversite öğrencilerini burs vermek isteyen bireylerle buluşturan **BursIO** platformunun web arayüzü.
Platform `bursio.com.tr` adresinde production'da yayınlandı.

> Backend: [dckaratas/bursio](https://github.com/dckaratas/bursio) (Spring Boot REST API)

## Nasıl çalışır?

- **Öğrenciler** üniversite e-postalarıyla kayıt olur, profillerini (üniversite, bölüm, sınıf, not ortalaması, iletişim tercihi) doldurur ve gelen eşleşme taleplerini kabul eder ya da reddeder.
- **Bağışçılar** filtreler belirleyip uygun bir öğrenciyle rastgele eşleşir ve talebin durumunu takip eder. İletişim bilgileri yalnızca öğrenci kabul ettiğinde görünür.
- **Adminler** kullanıcıları, raporları, üniversiteleri ve bakım modunu panelden yönetir.

## Teknolojiler

| Alan | Kullanılan |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Stil | Tailwind CSS 4, lucide-react ikonları |
| Veri yönetimi | TanStack Query (React Query), Axios |
| Kimlik doğrulama | JWT (cookie'de saklanır), Next.js middleware ile rol bazlı route koruması |
| Deployment | Docker (multi-stage, `standalone` output), Nginx reverse proxy |

## Öne çıkan özellikler

- **Rol bazlı yönlendirme:** `middleware.ts`, token ve rol cookie'lerine bakarak `/student`, `/donor` ve `/admin` alanlarını korur. Yanlış role sahip kullanıcı kendi paneline yönlendirilir.
- **Merkezi API katmanı:** Axios interceptor'ları her isteğe token ekler. 401/403 cevabı gelirse oturumu kapatıp kullanıcıyı login sayfasına yönlendirir.
- **Custom hook'lar:** tüm sunucu iletişimi `hooks/` altındaki React Query hook'larıyla yapılır (`useMatches`, `useAdmin`, `useStudentProfile`, `useUniversities`, `useStatus`). Cache yönetimi ve mutation sonrası invalidation bu hook'larda yapılır.
- **Hesap akışları:** kayıt, e-posta doğrulama sonuç sayfaları, şifremi unuttum/sıfırlama, ayarlar (şifre değiştirme, hesap silme).
- **Admin paneli:** filtrelenebilir kullanıcı listesi ve detay çekmecesi, rapor yönetimi, üniversite ve e-posta domain yönetimi (aktif/pasif filtresi), bakım modu.
- **Bakım modu banner'ı:** sistem durumu dakikada bir sorgulanır, bakım modu açıksa tüm kullanıcılara banner gösterilir.
- **Yeniden kullanılabilir UI bileşenleri:** Button, Input, Select, Modal, Card, Badge, Alert ve aranabilir üniversite seçici.
- **SEO ve yasal sayfalar:** metadata ve Open Graph, `sitemap.ts`, `robots.ts`; KVKK, gizlilik politikası ve kullanım koşulları sayfaları.

## Proje yapısı

```
app/
  student/      → öğrenci profili ve eşleşmeleri
  donor/        → öğrenci bulma ve eşleşme takibi
  admin/        → kullanıcı, rapor ve üniversite yönetimi
  login, register, verify-email, forgot-password, reset-password, settings
  kvkk, gizlilik, kullanim-kosullari, iletisim
components/
  layout/       → Navbar, Footer
  ui/           → ortak UI bileşenleri
  admin/        → admin'e özel bileşenler
hooks/          → React Query hook'ları
lib/            → API istemcisi ve auth yardımcıları
constants/      → API endpoint'leri ve sabitler
types/          → backend DTO'larına karşılık gelen TypeScript tipleri
middleware.ts   → route koruması
```

## Lokalde çalıştırma

Backend'in lokalde `http://localhost:8080` adresinde çalışıyor olması gerekir.

```bash
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local
npm run dev
```

Uygulama `http://localhost:3000` adresinde açılır.

## Production

Production'da uygulama `standalone` modda build edilen bir Docker image olarak çalıştı. Image root olmayan bir kullanıcıyla çalışır. Backend ve PostgreSQL ile birlikte Docker Compose üzerinden, Nginx reverse proxy arkasında yayınlandı.
