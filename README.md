<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# 🎵 NestJS Music App

## 📌 Project Overview

This is a NestJS-based music application that provides a robust backend API for managing songs, artists, playlists, and users with authentication and role-based access control. The project is built using NestJS, PostgreSQL, TypeORM, and Sequelize, with Swagger for API documentation.

It includes features like user authentication (JWT), role-based authorization, two-factor authentication (2FA), pagination, search, sorting, and logging.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT Authentication with user login/signup.
- Role-based authentication, allowing only artists to create songs.
- Two-Factor Authentication (2FA) using Speakeasy for added security.

### 🎶 Song Management
- CRUD operations for songs (Create, Read, Update, Delete).
- Many-to-Many relationship between songs and artists.
- Pagination, sorting, and search for finding songs efficiently.

### 🎤 Artist Management
- Artist repository for handling multiple artists.
- One-to-One relationship between artists and users.
- Custom API to get an artist by user ID instead of general ID.

### 📂 Playlist Management
- Playlist module with CRUD operations.
- One-to-Many relationship between playlists and songs.
- Many-to-One relationship between playlists and users.

### 📑 API Documentation
- Swagger integration for detailed API documentation.

### 🔍 Additional Features
- Error handling using try-catch.
- Middleware for logging requests and handling authentication.
- REST Client file for easy API testing.
- .env configuration for managing environment variables.
- Database migrations & seeders for data initialization.

## 🛠️ Tech Stack
- Backend: NestJS, TypeScript
- Database: PostgreSQL with TypeORM & Sequelize
- Security: JWT, Speakeasy (for 2FA)
- API Documentation: Swagger
- Testing: Jest (for integration tests)

## 📂 Folder Structure

```
src/
│── auth/               # Authentication module
│── artists/            # Artist management module
│── playlists/          # Playlist management module
│── songs/              # Songs management module
│── common/             # Shared resources (entities, repositories)
│── db/                 # Database setup
│   ├── migrations/     # Database migrations
│   ├── models/         # Sequelize models
│   ├── seeders/        # Database seeders
│── tests/              # Integration tests
│── main.ts             # Entry point
```

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Hari-Zignuts/learning-nest
cd learning-nest
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file and configure:

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Migrations & Seed Database

```bash
npm run migration:run
npm run seed
```

### 5️⃣ Start the Server

```bash
npm run start
```

### 6️⃣ Access API Documentation (Swagger)

```
http://localhost:3000/api
```

## ✅ Testing

Run integration tests using:

```bash
npm run test
```

## 📌 Future Enhancements
- Implement WebSocket for real-time updates.
- Add user subscription & premium features.
- Improve caching with Redis for performance.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Malam Hari

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
