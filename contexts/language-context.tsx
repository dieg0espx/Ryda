"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    feed: "Feed",
    routes: "Routes",
    groups: "Groups",
    profile: "Profile",
    marketplace: "Marketplace",
    services: "Services",
    settings: "Settings",

    // Routes
    discover_scenic_routes: "Discover scenic routes and plan your next adventure",
    discoverAndShareRoutes: "Discover and share amazing motorcycle routes",
    createRoute: "Create Route",
    createNewRoute: "Create New Route",
    all: "All",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    startPoint: "Start Point",
    endPoint: "End Point",
    enterStartLocation: "Enter start location",
    enterEndLocation: "Enter end location",
    date: "Date",
    difficulty: "Difficulty",
    selectDifficulty: "Select difficulty",
    visibility: "Visibility",
    selectVisibility: "Select visibility",
    public: "Public",
    friendsOnly: "Friends Only",
    specificGroups: "Specific Groups",
    description: "Description",
    describeYourRoute: "Describe your route...",
    meetingPoint: "Meeting Point",
    meetingAddress: "Meeting Address",
    meetingTime: "Meeting Time",
    maxParticipants: "Max Participants",
    cancel: "Cancel",
    publishRoute: "Publish Route",
    from: "From",
    to: "To",
    interested: "interested",
    joinRoute: "Join Route",
    joined: "Joined",
    viewDetails: "View Details",

    // Social Feed
    whatsOnYourMind: "What's on your mind?",
    shareUpdate: "Share Update",
    like: "Like",
    comment: "Comment",
    share: "Share",

    // Groups
    discoverGroups: "Discover motorcycle groups and communities",
    joinGroup: "Join Group",
    members: "members",

    // Profile
    myProfile: "My Profile",
    myMotorcycles: "My Motorcycles",
    addMotorcycle: "Add Motorcycle",

    // Marketplace
    buyAndSell: "Buy and sell motorcycle gear and parts",
    sellItem: "Sell Item",

    // Service Providers
    findServiceProviders: "Find trusted motorcycle service providers",

    // Settings
    preferences: "Preferences",
    theme: "Theme",
    language: "Language",
    notifications: "Notifications",
    privacy: "Privacy",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    english: "English",
    spanish: "Spanish",
  },
  es: {
    // Navigation
    feed: "Feed",
    routes: "Rutas",
    groups: "Grupos",
    profile: "Perfil",
    marketplace: "Mercado",
    services: "Servicios",
    settings: "Configuración",

    // Routes
    discover_scenic_routes: "Descubre rutas escénicas y planifica tu próxima aventura",
    discoverAndShareRoutes: "Descubre y comparte increíbles rutas de motocicleta",
    createRoute: "Crear Ruta",
    createNewRoute: "Crear Nueva Ruta",
    all: "Todas",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    startPoint: "Punto de Inicio",
    endPoint: "Punto Final",
    enterStartLocation: "Ingresa ubicación de inicio",
    enterEndLocation: "Ingresa ubicación final",
    date: "Fecha",
    difficulty: "Dificultad",
    selectDifficulty: "Selecciona dificultad",
    visibility: "Visibilidad",
    selectVisibility: "Selecciona visibilidad",
    public: "Público",
    friendsOnly: "Solo Amigos",
    specificGroups: "Grupos Específicos",
    description: "Descripción",
    describeYourRoute: "Describe tu ruta...",
    meetingPoint: "Punto de Encuentro",
    meetingAddress: "Dirección de Encuentro",
    meetingTime: "Hora de Encuentro",
    maxParticipants: "Máx. Participantes",
    cancel: "Cancelar",
    publishRoute: "Publicar Ruta",
    from: "Desde",
    to: "Hasta",
    interested: "interesados",
    joinRoute: "Unirse a Ruta",
    joined: "Unido",
    viewDetails: "Ver Detalles",

    // Social Feed
    whatsOnYourMind: "¿Qué tienes en mente?",
    shareUpdate: "Compartir Actualización",
    like: "Me gusta",
    comment: "Comentar",
    share: "Compartir",

    // Groups
    discoverGroups: "Descubre grupos y comunidades de motociclistas",
    joinGroup: "Unirse al Grupo",
    members: "miembros",

    // Profile
    myProfile: "Mi Perfil",
    myMotorcycles: "Mis Motocicletas",
    addMotorcycle: "Agregar Motocicleta",

    // Marketplace
    buyAndSell: "Compra y vende equipo y repuestos de motocicleta",
    sellItem: "Vender Artículo",

    // Service Providers
    findServiceProviders: "Encuentra proveedores de servicio de motocicletas confiables",

    // Settings
    preferences: "Preferencias",
    theme: "Tema",
    language: "Idioma",
    notifications: "Notificaciones",
    privacy: "Privacidad",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    english: "Inglés",
    spanish: "Español",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
