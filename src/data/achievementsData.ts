import { AchievementNode } from "../types/achievements";

export const ACHIEVEMENTS_DATA: AchievementNode[] = [
  // ===== GALHO GAMER 🎮 =====
  {
    id: "primeiro_game",
    title: "Primeiro Passo",
    description: "Cadastre seu primeiro jogo na biblioteca",
    image:
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    category: "gamer",
    position: { x: 15, y: 5 },
    rarity: "common",
  },
  {
    id: "completou_primeiro_game",
    title: "Finalizador",
    description: "Marque seu primeiro jogo como concluído",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_game"],
    category: "gamer",
    position: { x: 15, y: 15 },
    rarity: "common",
  },
  {
    id: "colecionador_iniciante",
    title: "Colecionador",
    description: "Tenha 5 jogos em sua biblioteca",
    image:
      "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_game"],
    category: "gamer",
    position: { x: 25, y: 10 },
    rarity: "common",
  },
  {
    id: "viciado_em_horas",
    title: "Viciado",
    description: "Registre mais de 100 horas em um único jogo",
    image:
      "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["completou_primeiro_game"],
    category: "gamer",
    position: { x: 15, y: 25 },
    rarity: "rare",
  },
  {
    id: "speedrunner",
    title: "Speedrunner",
    description: "Complete um jogo em menos de 10 horas",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["completou_primeiro_game"],
    category: "gamer",
    position: { x: 25, y: 20 },
    rarity: "rare",
  },
  {
    id: "hardcore_gamer",
    title: "Hardcore Gamer",
    description: "Complete 25 jogos",
    image:
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["colecionador_iniciante"],
    category: "gamer",
    position: { x: 35, y: 15 },
    rarity: "epic",
  },
  {
    id: "bibliotecario_games",
    title: "Bibliotecário Digital",
    description: "Tenha 50 jogos catalogados",
    image:
      "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["hardcore_gamer"],
    category: "gamer",
    position: { x: 45, y: 20 },
    rarity: "epic",
  },
  {
    id: "legend_gamer",
    title: "Lenda dos Games",
    description: "Complete 100 jogos",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["bibliotecario_games"],
    category: "gamer",
    position: { x: 55, y: 25 },
    rarity: "legendary",
  },
  {
    id: "indie_lover",
    title: "Amante dos Indies",
    description: "Complete 10 jogos indie",
    image:
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["hardcore_gamer"],
    category: "gamer",
    position: { x: 25, y: 30 },
    rarity: "rare",
  },
  {
    id: "retro_gamer",
    title: "Nostálgico",
    description: "Registre 5 jogos clássicos (anteriores a 2000)",
    image:
      "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["colecionador_iniciante"],
    category: "gamer",
    position: { x: 35, y: 5 },
    rarity: "rare",
  },
  {
    id: "completionista",
    title: "Completionista",
    description: "Tenha 90% de taxa de conclusão",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["hardcore_gamer"],
    category: "gamer",
    position: { x: 45, y: 10 },
    rarity: "legendary",
  },

  // ===== GALHO LEITOR 📚 =====
  {
    id: "primeiro_livro",
    title: "Bookworm Iniciante",
    description: "Adicione seu primeiro livro à biblioteca",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    category: "leitor",
    position: { x: 15, y: 40 },
    rarity: "common",
  },
  {
    id: "primeiro_livro_completo",
    title: "Primeira Leitura",
    description: "Complete seu primeiro livro",
    image:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_livro"],
    category: "leitor",
    position: { x: 15, y: 50 },
    rarity: "common",
  },
  {
    id: "pequena_biblioteca",
    title: "Pequena Biblioteca",
    description: "Tenha 10 livros em sua coleção",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_livro"],
    category: "leitor",
    position: { x: 25, y: 45 },
    rarity: "common",
  },
  {
    id: "devorador_de_livros",
    title: "Devorador de Livros",
    description: "Complete 10 livros",
    image:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_livro_completo"],
    category: "leitor",
    position: { x: 25, y: 55 },
    rarity: "rare",
  },
  {
    id: "leitor_genero_variado",
    title: "Mente Aberta",
    description: "Leia livros de 5 gêneros diferentes",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["devorador_de_livros"],
    category: "leitor",
    position: { x: 35, y: 50 },
    rarity: "rare",
  },
  {
    id: "leitor_voraz",
    title: "Leitor Voraz",
    description: "Complete 25 livros",
    image:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["devorador_de_livros"],
    category: "leitor",
    position: { x: 35, y: 60 },
    rarity: "epic",
  },
  {
    id: "bibliofilo",
    title: "Bibliófilo",
    description: "Tenha 100 livros catalogados",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["leitor_voraz"],
    category: "leitor",
    position: { x: 45, y: 55 },
    rarity: "epic",
  },
  {
    id: "mestre_das_letras",
    title: "Mestre das Letras",
    description: "Complete 100 livros",
    image:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["bibliofilo"],
    category: "leitor",
    position: { x: 55, y: 60 },
    rarity: "legendary",
  },
  {
    id: "classicos_eternos",
    title: "Clássicos Eternos",
    description: "Leia 10 clássicos da literatura",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["leitor_genero_variado"],
    category: "leitor",
    position: { x: 25, y: 35 },
    rarity: "epic",
  },
  {
    id: "leitor_contemporaneo",
    title: "Leitor Contemporâneo",
    description: "Complete 15 livros publicados nos últimos 5 anos",
    image:
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["pequena_biblioteca"],
    category: "leitor",
    position: { x: 35, y: 40 },
    rarity: "rare",
  },

  // ===== GALHO CINÉFILO 🎬 =====
  {
    id: "primeiro_filme",
    title: "Cinéfilo Nato",
    description: "Adicione seu primeiro filme ou série",
    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    category: "cinefilo",
    position: { x: 70, y: 5 },
    rarity: "common",
  },
  {
    id: "primeiro_filme_completo",
    title: "Primeira Sessão",
    description: "Complete seu primeiro filme",
    image:
      "https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_filme"],
    category: "cinefilo",
    position: { x: 70, y: 15 },
    rarity: "common",
  },
  {
    id: "colecionador_filmes",
    title: "Colecionador Visual",
    description: "Tenha 20 filmes/séries em sua biblioteca",
    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_filme"],
    category: "cinefilo",
    position: { x: 80, y: 10 },
    rarity: "common",
  },
  {
    id: "maratonista",
    title: "Maratonista",
    description: "Assista mais de 50 horas de conteúdo audiovisual",
    image:
      "https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_filme_completo"],
    category: "cinefilo",
    position: { x: 70, y: 25 },
    rarity: "rare",
  },
  {
    id: "amante_series",
    title: "Amante de Séries",
    description: "Complete 5 séries inteiras",
    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["maratonista"],
    category: "cinefilo",
    position: { x: 80, y: 20 },
    rarity: "rare",
  },
  {
    id: "cinefilo_generos",
    title: "Explorador de Gêneros",
    description: "Assista filmes de 8 gêneros diferentes",
    image:
      "https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["colecionador_filmes"],
    category: "cinefilo",
    position: { x: 90, y: 15 },
    rarity: "rare",
  },
  {
    id: "cinefilo_experiente",
    title: "Cinéfilo Experiente",
    description: "Complete 50 filmes",
    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["maratonista"],
    category: "cinefilo",
    position: { x: 80, y: 30 },
    rarity: "epic",
  },
  {
    id: "critico_cinema",
    title: "Crítico de Cinema",
    description: "Assista 100 filmes",
    image:
      "https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["cinefilo_experiente"],
    category: "cinefilo",
    position: { x: 90, y: 35 },
    rarity: "epic",
  },
  {
    id: "mestre_cinema",
    title: "Mestre do Cinema",
    description: "Complete 200 filmes e séries",
    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["critico_cinema"],
    category: "cinefilo",
    position: { x: 95, y: 25 },
    rarity: "legendary",
  },
  {
    id: "classicos_cinema",
    title: "Clássicos do Cinema",
    description: "Assista 20 filmes clássicos (anteriores a 1980)",
    image:
      "https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["cinefilo_generos"],
    category: "cinefilo",
    position: { x: 85, y: 5 },
    rarity: "epic",
  },
  {
    id: "anime_otaku",
    title: "Otaku Iniciante",
    description: "Complete 10 animes",
    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["amante_series"],
    category: "cinefilo",
    position: { x: 75, y: 35 },
    rarity: "rare",
  },

  // ===== GALHO NARRADOR 🧠 =====
  {
    id: "mini_review",
    title: "Crítico Iniciante",
    description: "Escreva sua primeira resenha com mais de 100 caracteres",
    image:
      "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    category: "narrador",
    position: { x: 70, y: 40 },
    rarity: "common",
  },
  {
    id: "resenha_detalhada",
    title: "Narrativa Rica",
    description: "Escreva uma resenha com mais de 500 caracteres",
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["mini_review"],
    category: "narrador",
    position: { x: 70, y: 50 },
    rarity: "common",
  },
  {
    id: "critico_ativo",
    title: "Crítico Ativo",
    description: "Escreva 5 resenhas",
    image:
      "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["resenha_detalhada"],
    category: "narrador",
    position: { x: 80, y: 45 },
    rarity: "rare",
  },
  {
    id: "critico_experiente",
    title: "Crítico Experiente",
    description: "Escreva 15 resenhas detalhadas",
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["critico_ativo"],
    category: "narrador",
    position: { x: 80, y: 55 },
    rarity: "epic",
  },
  {
    id: "critico_versatil",
    title: "Crítico Versátil",
    description: "Escreva resenhas para todas as categorias de mídia",
    image:
      "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["critico_ativo"],
    category: "narrador",
    position: { x: 90, y: 50 },
    rarity: "rare",
  },
  {
    id: "mestre_critico",
    title: "Mestre Crítico",
    description: "Escreva 50 resenhas",
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["critico_experiente"],
    category: "narrador",
    position: { x: 90, y: 60 },
    rarity: "epic",
  },
  {
    id: "legend_critico",
    title: "Lenda da Crítica",
    description: "Escreva 100 resenhas",
    image:
      "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["mestre_critico"],
    category: "narrador",
    position: { x: 95, y: 55 },
    rarity: "legendary",
  },
  {
    id: "perfeccionista",
    title: "Perfeccionista",
    description: "Dê nota 5 estrelas para 10 mídias diferentes",
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["critico_versatil"],
    category: "narrador",
    position: { x: 85, y: 40 },
    rarity: "rare",
  },
  {
    id: "critico_severo",
    title: "Crítico Severo",
    description: "Dê nota 1 estrela para 5 mídias",
    image:
      "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["critico_ativo"],
    category: "narrador",
    position: { x: 75, y: 60 },
    rarity: "rare",
  },

  // ===== GALHO GERAL 🌀 =====
  {
    id: "bem_vindo",
    title: "Bem-vindo!",
    description: "Faça seu primeiro login na plataforma",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    category: "geral",
    position: { x: 50, y: 70 },
    rarity: "common",
  },
  {
    id: "personalizou_perfil",
    title: "Identidade Própria",
    description: "Personalize seu perfil com avatar, nome e bio",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["bem_vindo"],
    category: "geral",
    position: { x: 50, y: 80 },
    rarity: "common",
  },
  {
    id: "organizador",
    title: "Organizador",
    description: "Use pelo menos 5 tags diferentes",
    image:
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["personalizou_perfil"],
    category: "geral",
    position: { x: 40, y: 75 },
    rarity: "common",
  },
  {
    id: "explorador",
    title: "Explorador",
    description: "Adicione pelo menos uma mídia de cada categoria",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["primeiro_game", "primeiro_livro", "primeiro_filme"],
    category: "geral",
    position: { x: 50, y: 90 },
    rarity: "rare",
  },
  {
    id: "mestre_multimidia",
    title: "Mestre Multimídia",
    description: "Complete pelo menos uma mídia de cada categoria",
    image:
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: [
      "completou_primeiro_game",
      "primeiro_livro_completo",
      "primeiro_filme_completo",
    ],
    category: "geral",
    position: { x: 50, y: 100 },
    rarity: "epic",
  },
  {
    id: "veterano",
    title: "Veterano",
    description: "Use a plataforma por 30 dias",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["explorador"],
    category: "geral",
    position: { x: 60, y: 85 },
    rarity: "rare",
  },
  {
    id: "dedicado",
    title: "Dedicado",
    description: "Use a plataforma por 100 dias",
    image:
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["veterano"],
    category: "geral",
    position: { x: 70, y: 90 },
    rarity: "epic",
  },
  {
    id: "legend_usuario",
    title: "Usuário Lendário",
    description: "Use a plataforma por 365 dias",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["dedicado"],
    category: "geral",
    position: { x: 80, y: 95 },
    rarity: "legendary",
  },
  {
    id: "colecionador_total",
    title: "Colecionador Total",
    description: "Tenha mais de 100 itens em sua biblioteca",
    image:
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["mestre_multimidia"],
    category: "geral",
    position: { x: 40, y: 95 },
    rarity: "epic",
  },
  {
    id: "perfeccionista_geral",
    title: "Perfeccionista Supremo",
    description: "Mantenha 95% de taxa de conclusão com mais de 50 itens",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: ["colecionador_total"],
    category: "geral",
    position: { x: 30, y: 90 },
    rarity: "legendary",
  },
  {
    id: "conquistador_supremo",
    title: "Conquistador Supremo",
    description: "Desbloqueie 90% de todas as conquistas",
    image:
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
    unlocked: false,
    dependsOn: [
      "legend_gamer",
      "mestre_das_letras",
      "mestre_cinema",
      "legend_critico",
      "legend_usuario",
    ],
    category: "geral",
    position: { x: 50, y: 110 },
    rarity: "legendary",
  },
];
