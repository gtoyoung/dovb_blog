import { PokeMain } from "components/poke/pokeMain";
import { PokeApi } from "services/poke";

const api = new PokeApi();

export default async function PokePage() {
  const fetchData = await api.getPoketList(0, 21);

  return <PokeMain>{fetchData}</PokeMain>;
}
