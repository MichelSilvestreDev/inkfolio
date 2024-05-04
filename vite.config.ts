import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/',
  // build: {
  //   outDir: 'build', // Diretório de saída do build
  //   assetsDir: 'assets', // Diretório de assets
  //   emptyOutDir: true, // Limpar o diretório de saída antes de cada construção
  //   sourcemap: true, // Gerar mapas de origem
  // },
  // server: {
  //   port: 3000, // Porta do servidor de desenvolvimento
  //   open: true, // Abra o navegador ao iniciar o servidor de desenvolvimento
  //   proxy: {
  //     // Configuração de proxy, se necessário
  //   },
  // },
})
