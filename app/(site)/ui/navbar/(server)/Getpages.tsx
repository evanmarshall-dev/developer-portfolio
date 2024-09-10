import { getPages } from "@/sanity/sanity-utils";
import Navbar from "../(client)/Navbar";

export default async function Getpages() {
  const pages = await getPages();

  return <Navbar pages={pages} />;
}
