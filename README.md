## Overview
This project implements Satori dashboard with Search functionality,
using Typescript, React and Redux.
The following [tutorial](https://www.youtube.com/watch?v=sm7XTZ9MH2A) is used for building it.

## Project Build Using
**!!!Important**. Node version 14.17.0 is used.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
* Next.js
* React
* TypeScript
* Redux

## Data used
Random 100 rows data were generated, using a Python script. They are in [file](Dashboard/src/data/mock_transactions.js).

The dashboard loads data directly from the file. No database is used.

## Getting Started

Go to the Dashboard directory:

```bash
cd Dashboard
```

First, install the modules:

```bash
npm install
# or
yarn install
```

Than, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Search
Search, using the search bar and multiple select boxes.

**!!!Important**. After a setting of select boxes or an input in the 
search bar, do not press the search button. It acts as a clear now.
Instead make a left click on the purple box. Everything will work correctly then.