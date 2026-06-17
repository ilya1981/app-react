import NotFoundPageIMG from './not-found.svg'

const NotFound = () => {
  return (
    <section className="top-sales">
      <h2 className="text-center">Страница не найдена</h2>
      <p className="info">Извините, такая страница не найдена!</p>
      <img className="info-img" src={NotFoundPageIMG} alt="Not found" />
    </section>
  );
};

export default NotFound;
