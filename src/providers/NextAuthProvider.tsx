// next-auth ашиглагдахгүй болсон (middleware.ts болон app/actions/auth.ts-ийн
// "token" cookie-д суурилсан хялбар session-г үз). Энэ provider нь
// app/(main)/layout.tsx-д аль хэдийн comment хийгдсэн байсан тул хэрэглэгдэхгүй
// байсан — package.json-оос next-auth хассантай холбоотой хоослов.
'use client';

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  return <>{children}</>;
}
