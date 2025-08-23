import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";

const sitemap = new SitemapStream({ hostname: "https://doctors-com-frontend.vercel.app/" });

const writeStream = createWriteStream("./public/sitemap.xml"); 

// static routes
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/login", changefreq: "monthly", priority: 0.7 },
  { url: "/signup", changefreq: "monthly", priority: 0.7 },
  { url: "/signup/patientsignup", changefreq: "monthly", priority: 0.6 },
  { url: "/signup/hospitalsignup", changefreq: "monthly", priority: 0.6 },
];


// Write all links to sitemap
links.forEach((link) => sitemap.write(link));
sitemap.end();
sitemap.pipe(writeStream);
