import axios from "axios";

// export const api = (num) => {
//   return (
//     let a = (num = 1) => {
//       return {
//         baseURL: "https://api.themoviedb.org/3/",
//         params: {
//           api_key: "10923b261ba94d897ac6b81148314a3f",
//           language: "en-US",
//           page: num
//         }
//       }
//     }
//     axios.create({
//       a()
//     })
//   )
// }

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "10923b261ba94d897ac6b81148314a3f",
    language: "en-US",
  }
});

export const moviesApi = {
  weeklyTrending: () => api.get('trending/movie/week'),
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id => api.get(`movie/${id}`, {
    params: {
      append_to_response: "videos,credits,similar,recommendations,reviews,"
    }
  }),

  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

export const tvApi = {
  weeklyTrending: () => api.get('trending/tv/week'),
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos,credits,reviews,similar,recommendations"
      }
    }),
  seasonDetail: (id, seasonNumber) => api.get(`tv/${id}/season/${seasonNumber}`),
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

export const PeopleApi = {
  weeklyTrending: () => api.get('trending/person/week'),
  popular: () => api.get('person/popular'),
  PeopleDetail: id => api.get(`person/${id}`, {
    params: {
      append_to_response: "movie_credits,tv_credits,tagged_images,images,"
    }
  }),

  search: term => api.get('search/person', {
    params: {
      query: encodeURIComponent(term),
      include_adult: true,
    }
  })
}