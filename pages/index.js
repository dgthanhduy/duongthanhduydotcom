import Link from "next/link";
import BaseLayout from "../components/layouts/BaseLayout";
import CommentForm from "../components/comment/Form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export default function Home() {
  const { isAuthLoading } = useContext(UserContext);

  return (
    <BaseLayout title="Home">
      <main>
        <span className="text-teal-200">{isAuthLoading.toString()}</span>
        <CommentForm />
        <Link href="/blog">To Blog</Link>
        <br />
        <span>Haksdk kk clvj sadljasl xzlcjl las jla sjkl</span>
        <a href="https://duongthanhduy.com">link asdkh</a>
        <br />
        <span>Haksdk kk clvj sadljasl xzlcjl las jla sjkl</span>
        <br />
        <span>Haksdk kk clvj sadljasl xzlcjl las jla sjkl</span>
        <br />
      </main>
    </BaseLayout>
  );
}
