import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/login", "/register", "/iletisim", "/gizlilik", "/kullanim-kosullari", "/kvkk"],
                disallow: ["/admin/", "/student/", "/donor/", "/api/", "/settings/", "/verify-email/", "/reset-password/", "/forgot-password/"],
            },
        ],
        sitemap: "https://bursio.com.tr/sitemap.xml",
    };
}
