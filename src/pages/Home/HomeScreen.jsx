import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useMovieStore from '../../store/movieStore';

const featured = {
  title: 'Stranger Things',
  image: '/stranger-things.jpg',
};

// ✅ Your static sections
const movieSections = [
  {
    title: 'Top Picks For You',
    movies: [
      { id: 1, title: 'Alchemy Of Souls', image: '/alchemy.jpg' },
      { id: 2, title: 'Wednesday', image: '/wednesday.jpg' },
      { id: 3, title: 'Business Proposal', image: '/business-proposal.jpg' },
      { id: 4, title: 'Spider-Man No Way Home', image: '/spiderman.jpg' },
      { id: 5, title: 'Extraction', image: '/extraction.jpg' },
      { id: 6, title: 'Money Heist', image: '/money-heist.jpg' },
      { id: 7, title: 'Squid Game', image: '/squid-game.jpg' },
      { id: 8, title: 'Vincenzo', image: '/vincenzo.jpg' },
      { id: 9, title: 'All Of Us Are Dead', image: '/all-of-us-are-dead.jpg' },
      { id: 10, title: 'Peaky Blinders', image: '/peaky-blinders.jpg' },
    ],
  },
  {
    title: 'Continue Watching',
    movies: [
      { id: 11, title: 'Harry Potter', image: '/Harry-Potter.jpg' },
      { id: 12, title: 'Twilight', image: '/twilight.jpg' },
      { id: 13, title: 'Lovely Runner', image: '/lovely-runner.jpg' },
      { id: 14, title: 'My Demon', image: '/my-demon.jpg' },
      { id: 15, title: 'King The Land', image: '/king-the-land.jpg' },
      { id: 16, title: 'Enola Holmes', image: '/enola.jpg' },
      { id: 17, title: 'D.P.', image: '/dp.jpg' },
    ],
  },
  {
    title: 'My List',
    movies: [
      { id: 25, title: 'Peaky Blinders', image: '/peaky-blinders.jpg' },
      { id: 26, title: 'Enola Holmes', image: '/enola.jpg' },
      { id: 27, title: 'King The Land', image: '/king-the-land.jpg' },
      { id: 28, title: 'Start Up', image: '/start-up.jpg' },
      { id: 29, title: 'Twenty-Five Twenty-One', image: '/2521.jpg' },
    ],
  },
];

// ✅ Slider settings
const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const HomeScreen = () => {
  const { getTrendingVideo,key } = useMovieStore(); // ✅ correct spelling
  const [TrendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideo = async () => {
      const result = await getTrendingVideo(); // ✅ same spelling
      if (result?.success) {
        setTrendingVideos(result.movie);
        console.log(result.movie)
      }
    };
    fetchTrendingVideo();
  }, [key]);


  return (
    <div className="mt-16 px-4 sm:px-8 text-white">
      {/* Banner */}
      <div className="relative w-full h-[50vh] md:h-[80vh] rounded-xl overflow-hidden shadow-lg mb-8">
        <img
          src={`https://image.tmdb.org/t/p/original${TrendingVideos.backdrop_path}`}
          alt="Banner"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-6 md:left-12">
          <h1 className="text-3xl md:text-5xl font-bold">{TrendingVideos.original_title}</h1>
          <button className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-lg font-semibold transition">
            ▶ Watch Now
          </button>
        </div>
      </div>

      {/* ✅ Static sections */}
      {movieSections.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-xl md:text-2xl mb-4 font-semibold">
            {section.title}
          </h2>
          <Slider {...sliderSettings}>
            {section.movies.map((movie) => (
              <div key={movie.id} className="px-2">
                <div className="relative group rounded overflow-hidden shadow hover:scale-105 transition">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-[180px] sm:h-[250px] object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <button className="bg-red-600 px-3 py-1 text-sm rounded hover:bg-red-700">
                      ▶ Play
                    </button>
                  </div>
                </div>
                <div className="text-center mt-1 text-xs sm:text-sm">
                  {movie.title}
                </div>
              </div>
            ))}
          </Slider>
        </section>
      ))}

      {/* ✅ Trending from TMDB */}
      {TrendingVideos?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl mb-4 font-semibold">Trending Now</h2>
          <Slider {...sliderSettings}>
            {TrendingVideos.map((video) => (
              <div key={video.id} className="px-2">
                <div className="relative group rounded overflow-hidden shadow hover:scale-105 transition">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
                    alt={video.title || video.name}
                    className="w-full h-[180px] sm:h-[250px] object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <button className="bg-red-600 px-3 py-1 text-sm rounded hover:bg-red-700">
                      ▶ Play
                    </button>
                  </div>
                </div>
                <div className="text-center mt-1 text-xs sm:text-sm">
                  {video.title || video.name}
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}
    </div>
  );
};

export default HomeScreen;
