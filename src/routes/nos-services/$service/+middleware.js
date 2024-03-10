import info from "../../../info.json";

export default ({ params }) => {
  const foundService = info.services.some(
    (service) => service.slug === params.service
  );

  if (!foundService) {
    throw new Error();
  }
};
