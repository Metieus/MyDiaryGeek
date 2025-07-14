import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Crown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { openaiService } from "../services/openaiService";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ArchiviusAgent: React.FC = () => {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPremium = profile?.isPremium || false;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!isPremium) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Para usar o Archivius, você precisa ser um usuário Premium! 👑",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Usar OpenAI service para gerar resposta
      const aiResponseText = await openaiService.sendMessage(
        inputValue,
        profile,
      );

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Erro ao obter resposta da IA:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro. Tente novamente em alguns instantes! 🤖",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão Flutuante - responsivo */}
      <motion.div
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className={`group relative flex items-center bg-gray-800/50 backdrop-blur-xl rounded-full shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
            isPremium ? "border-cyan-500/30" : "border-gray-600/30"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Avatar do Archivius - responsivo */}
          <div
            className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full overflow-hidden border-2 ${
              isPremium ? "border-cyan-400/50" : "border-gray-600/50"
            }`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Feb1c9410e9d14d94bbc865b98577c45c%2F8c1388df34ab45c29d2be300fe11111f?format=webp&width=800"
              alt="Archivius - Assistente IA"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texto e Status - oculto em mobile pequeno */}
          <div className="hidden sm:block px-4 py-3 pr-6">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-lg">Archivius</h3>
              {isPremium && <Crown className="w-4 h-4 text-cyan-400" />}
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isPremium ? "bg-cyan-400" : "bg-orange-400"}`}
              />
              <span className="text-gray-100 text-sm">
                {isPremium ? "Online" : "Premium"}
              </span>
            </div>
          </div>

          {/* Indicador de IA */}
          {isPremium && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Modal de Chat */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Window - responsivo */}
            <motion.div
              className="relative bg-gray-800/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl w-full sm:w-96 h-[80vh] sm:h-[500px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div
                className={`p-3 sm:p-4 border-b border-cyan-500/20 ${
                  isPremium
                    ? "bg-gradient-to-r from-cyan-500 to-pink-500"
                    : "bg-gradient-to-r from-gray-600 to-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Feb1c9410e9d14d94bbc865b98577c45c%2F8c1388df34ab45c29d2be300fe11111f?format=webp&width=800"
                        alt="Archivius"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-sm sm:text-base">
                          Archivius
                        </h3>
                        {isPremium && (
                          <Crown className="w-3 sm:w-4 h-3 sm:h-4 text-cyan-300" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${isPremium ? "bg-cyan-300" : "bg-orange-300"}`}
                        />
                        <span className="text-white text-sm opacity-90">
                          {isPremium ? "Online" : "Premium Only"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages - responsivo */}
              <div
                className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-900/50"
                style={{ height: "calc(100% - 140px)" }}
              >
                {messages.length === 0 && (
                  <div className="text-center text-gray-200 mt-4 sm:mt-8">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-2 border-cyan-400/50">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Feb1c9410e9d14d94bbc865b98577c45c%2F8c1388df34ab45c29d2be300fe11111f?format=webp&width=800"
                        alt="Archivius"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-base sm:text-lg font-medium text-white">
                      Olá! Eu sou o Archivius
                    </p>
                    <p className="text-xs sm:text-sm mt-2 mb-3 sm:mb-4 px-2">
                      {isPremium
                        ? "Seu assistente pessoal para sugestões de games, filmes e muito mais!"
                        : "Faça upgrade para Premium e desbloqueie minhas funcionalidades!"}
                    </p>

                    {isPremium && (
                      <div className="space-y-2">
                        <p className="text-xs text-cyan-400 mb-2">
                          Sugestões rápidas:
                        </p>
                        {[
                          "Recomende um jogo RPG",
                          "Sugira um filme de ficção científica",
                          "Qual anime devo assistir?",
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setInputValue(suggestion);
                              setTimeout(() => handleSendMessage(), 100);
                            }}
                            className="block w-full text-left px-3 py-2 bg-gray-800/50 border border-cyan-500/20 rounded-lg text-gray-100 text-sm hover:bg-gray-700/50 hover:border-cyan-400/30 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {/* Avatar do Archivius para mensagens da IA */}
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/30 flex-shrink-0 mt-1">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Feb1c9410e9d14d94bbc865b98577c45c%2F8c1388df34ab45c29d2be300fe11111f?format=webp&width=800"
                          alt="Archivius"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.isUser
                          ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
                          : "bg-gray-700/50 border border-gray-600/30 text-gray-100"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 justify-start"
                  >
                    {/* Avatar do Archivius no loading */}
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/30 flex-shrink-0 mt-1">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Feb1c9410e9d14d94bbc865b98577c45c%2F8c1388df34ab45c29d2be300fe11111f?format=webp&width=800"
                        alt="Archivius"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="bg-gray-700/50 border border-gray-600/30 px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input - responsivo */}
              <div className="p-3 sm:p-4 border-t border-cyan-500/20 bg-gray-800/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isPremium
                        ? "Digite sua mensagem..."
                        : "Premium necessário..."
                    }
                    disabled={!isPremium}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-600/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-800 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!isPremium || !inputValue.trim()}
                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-cyan-600 hover:to-pink-600 transition-colors disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
