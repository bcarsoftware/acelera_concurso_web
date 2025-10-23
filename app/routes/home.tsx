import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acelera Concurso" },
    { name: "description", content: "Sua melhor preparação!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
