import SpacePicture from "components/space/space";
import { NasaApi } from "services/nasa";

const api = new NasaApi();

export default async function SpacePage() {
  const fetchData = await api.getNasaPicture(10);

  return <SpacePicture>{fetchData}</SpacePicture>;
}
