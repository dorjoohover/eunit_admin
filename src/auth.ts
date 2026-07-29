// Энэ файл NextAuth v5-ийн API ашигладаг байсан ч package.json дотор
// next-auth v4 суулгасан байсан тул (NextAuth({...})-ээс auth/signIn/signOut
// гаргаж авах боломжгүй, undefined болно) бодит ажиллагаанд орж байгаагүй.
// Нэмж, энэ файлыг ашигладаг байсан цорын ганц газар (middleware.ts,
// actions/auth.ts) хоёулаа хуучирсан тул одоо шинэ, зөвхөн "token" cookie
// дээр суурилсан хялбар session-оор солигдсон (middleware.ts, services/
// login.services.ts, app/actions/auth.ts-г үз).
export {};
