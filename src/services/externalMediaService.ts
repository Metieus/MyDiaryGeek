import { MediaType } from "../App";

// Interfaces para resultados das APIs
export interface ExternalMediaResult {
  id: string;
  title: string;
  description?: string;
  image?: string;
  year?: number;
  genres?: string[];
  // Campos específicos para livros
  authors?: string[];
  publisher?: string;
  pageCount?: number;
  isbn?: string;
  // Campos específicos para filmes/séries
  director?: string;
  actors?: string[];
  runtime?: number;
  imdbId?: string;
  tmdbId?: number;
  // Campo para identificar a fonte
  source: "google-books" | "tmdb";
  // Tipo original da API
  originalType?: string;
}

export interface SearchParams {
  query: string;
  type: MediaType;
  limit?: number;
}

// Configurações das APIs
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const TMDB_API_URL = "https://api.themoviedb.org/3";

// Chaves das APIs (em produção, essas devem vir de variáveis de ambiente)
const TMDB_API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "ff4f571701b6696898c90a6995891283";

class ExternalMediaService {
  // Buscar livros no Google Books API
  async searchBooks(
    query: string,
    limit: number = 10,
  ): Promise<ExternalMediaResult[]> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${GOOGLE_BOOKS_API_URL}?q=${encodedQuery}&maxResults=${limit}&printType=books`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Books API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.items) {
        return [];
      }

      return data.items.map((item: any): ExternalMediaResult => {
        const volumeInfo = item.volumeInfo || {};
        const imageLinks = volumeInfo.imageLinks || {};

        return {
          id: item.id,
          title: volumeInfo.title || "Título não informado",
          description: volumeInfo.description || undefined,
          image: imageLinks.thumbnail || imageLinks.smallThumbnail || undefined,
          year: volumeInfo.publishedDate
            ? parseInt(volumeInfo.publishedDate.split("-")[0])
            : undefined,
          genres: volumeInfo.categories || [],
          authors: volumeInfo.authors || [],
          publisher: volumeInfo.publisher || undefined,
          pageCount: volumeInfo.pageCount || undefined,
          isbn:
            volumeInfo.industryIdentifiers?.find(
              (id: any) => id.type === "ISBN_13" || id.type === "ISBN_10",
            )?.identifier || undefined,
          source: "google-books",
          originalType: "book",
        };
      });
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      throw error;
    }
  }

  // Buscar filmes no TMDb
  async searchMovies(
    query: string,
    limit: number = 10,
  ): Promise<ExternalMediaResult[]> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=pt-BR`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results) {
        return [];
      }

      return data.results.slice(0, limit).map(
        (item: any): ExternalMediaResult => ({
          id: item.id.toString(),
          title: item.title || "Título não informado",
          description: item.overview || undefined,
          image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : undefined,
          year: item.release_date
            ? parseInt(item.release_date.split("-")[0])
            : undefined,
          genres: item.genre_ids
            ? this.mapTmdbGenres(item.genre_ids, "movie")
            : [],
          tmdbId: item.id,
          source: "tmdb",
          originalType: "movie",
        }),
      );
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      throw error;
    }
  }

  // Buscar séries no TMDb
  async searchTvShows(
    query: string,
    limit: number = 10,
  ): Promise<ExternalMediaResult[]> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${TMDB_API_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=pt-BR`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results) {
        return [];
      }

      return data.results.slice(0, limit).map(
        (item: any): ExternalMediaResult => ({
          id: item.id.toString(),
          title: item.name || "Título não informado",
          description: item.overview || undefined,
          image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : undefined,
          year: item.first_air_date
            ? parseInt(item.first_air_date.split("-")[0])
            : undefined,
          genres: item.genre_ids
            ? this.mapTmdbGenres(item.genre_ids, "tv")
            : [],
          tmdbId: item.id,
          source: "tmdb",
          originalType: "tv",
        }),
      );
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
      throw error;
    }
  }

  // Função principal de busca que redireciona baseado no tipo
  async searchMedia(params: SearchParams): Promise<ExternalMediaResult[]> {
    const { query, type, limit = 10 } = params;

    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      switch (type) {
        case "books":
          return await this.searchBooks(query, limit);
        case "movies":
          return await this.searchMovies(query, limit);
        case "series":
        case "anime":
        case "dorama":
          return await this.searchTvShows(query, limit);
        default:
          // Para tipos não suportados, retorna array vazio
          return [];
      }
    } catch (error) {
      console.error(`Erro ao buscar mídia do tipo ${type}:`, error);
      throw error;
    }
  }

  // Buscar detalhes específicos de um item (para quando o usuário seleciona)
  async getMovieDetails(tmdbId: number): Promise<Partial<ExternalMediaResult>> {
    try {
      const url = `${TMDB_API_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=credits`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        runtime: data.runtime || undefined,
        director:
          data.credits?.crew?.find((person: any) => person.job === "Director")
            ?.name || undefined,
        actors:
          data.credits?.cast?.slice(0, 5).map((actor: any) => actor.name) || [],
        imdbId: data.imdb_id || undefined,
      };
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
      return {};
    }
  }

  async getTvShowDetails(
    tmdbId: number,
  ): Promise<Partial<ExternalMediaResult>> {
    try {
      const url = `${TMDB_API_URL}/tv/${tmdbId}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=credits`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        director: data.created_by?.[0]?.name || undefined,
        actors:
          data.credits?.cast?.slice(0, 5).map((actor: any) => actor.name) || [],
      };
    } catch (error) {
      console.error("Erro ao buscar detalhes da série:", error);
      return {};
    }
  }

  // Mapear IDs de gêneros do TMDb para nomes
  private mapTmdbGenres(
    genreIds: number[],
    mediaType: "movie" | "tv",
  ): string[] {
    const movieGenres: Record<number, string> = {
      28: "Ação",
      12: "Aventura",
      16: "Animação",
      35: "Comédia",
      80: "Crime",
      99: "Documentário",
      18: "Drama",
      10751: "Família",
      14: "Fantasia",
      36: "História",
      27: "Terror",
      10402: "Música",
      9648: "Mistério",
      10749: "Romance",
      878: "Ficção Científica",
      10770: "Cinema TV",
      53: "Thriller",
      10752: "Guerra",
      37: "Faroeste",
    };

    const tvGenres: Record<number, string> = {
      10759: "Ação e Aventura",
      16: "Animação",
      35: "Comédia",
      80: "Crime",
      99: "Documentário",
      18: "Drama",
      10751: "Família",
      10762: "Infantil",
      9648: "Mistério",
      10763: "Notícias",
      10764: "Reality",
      10765: "Ficção Científica e Fantasia",
      10766: "Novela",
      10767: "Talk Show",
      10768: "Guerra e Política",
      37: "Faroeste",
    };

    const genreMap = mediaType === "movie" ? movieGenres : tvGenres;

    return genreIds
      .map((id) => genreMap[id])
      .filter((genre) => genre !== undefined);
  }

  // Verificar se as APIs estão disponíveis
  async checkApiAvailability(): Promise<{
    googleBooks: boolean;
    tmdb: boolean;
  }> {
    const results = { googleBooks: false, tmdb: false };

    try {
      // Testar Google Books API
      const booksResponse = await fetch(
        `${GOOGLE_BOOKS_API_URL}?q=test&maxResults=1`,
      );
      results.googleBooks = booksResponse.ok;
    } catch (error) {
      console.warn("Google Books API não disponível:", error);
    }

    try {
      // Testar TMDb API
      const tmdbResponse = await fetch(
        `${TMDB_API_URL}/configuration?api_key=${TMDB_API_KEY}`,
      );
      results.tmdb = tmdbResponse.ok;
    } catch (error) {
      console.warn("TMDb API não disponível:", error);
    }

    return results;
  }
}

export const externalMediaService = new ExternalMediaService();
