# Wybieramy obraz bazowy Node.js
FROM node:16

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki konfiguracyjne (package.json i package-lock.json)
COPY package.json package-lock.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy całą aplikację do kontenera
COPY . .

# Uruchamiamy aplikację w trybie deweloperskim
CMD ["npm", "start"]
