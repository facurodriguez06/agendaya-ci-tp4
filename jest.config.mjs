import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Le indica a Next.js dónde está tu aplicación para cargar los archivos .env y next.config.js
  dir: './',
})
 
// Configuración personalizada de Jest
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
 
export default createJestConfig(config)