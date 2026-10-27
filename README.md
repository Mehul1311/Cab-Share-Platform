# Cab Share Platform

Ride sharing for riders, drivers, and admins. The React client uses Firebase Auth. The Express API stores users and rides in MongoDB and takes seat payments through Cashfree.

## Apps

| Folder | Role |
| --- | --- |
| `client/` | Create React App UI |
| `server/` | Express API |

Roles are User, Driver, and Admin.

## Run

```bash
git clone https://github.com/Mehul1311/Cab-Share-Platform.git
cd Cab-Share-Platform
```

API:

```bash
cd server
npm install
```

Create `server/.env` and do not commit it.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | API port, default `5000` |
| `CASHFREE_APP_ID` | Cashfree app id |
| `CASHFREE_SECRET_KEY` | Cashfree secret |
| `CASHFREE_ENV` | `TEST` or live |
| `PLATFORM_COMMISSION_PERCENT` | Platform cut, default `10` |
| `EMAIL_USER` | Mail account for contact and ride mail |
| `EMAIL_PASS` | Mail app password |

```bash
npm run dev
```

Client, from `client/`:

```bash
npm install
npm start
```

Create `client/.env` with the Firebase web config. These values are public in the browser, but keep them in `.env`, not in source.

| Variable |
| --- |
| `REACT_APP_FIREBASE_API_KEY` |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` |
| `REACT_APP_FIREBASE_PROJECT_ID` |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` |
| `REACT_APP_FIREBASE_APP_ID` |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` |

The client calls `http://localhost:5000/api` in development.

## API routes

| Prefix | Use |
| --- | --- |
| `/api/auth` | Sync the Firebase user into MongoDB |
| `/api/rides` | Driver rides |
| `/api/admin` | Admin actions |
| `/api/contact` | Contact mail |
| `/api/payments` | Cashfree order, verify, driver earnings, admin stats |

## Payments

Booking creates a Cashfree order, opens checkout, then verifies the payment. Each transaction records the fare, the driver payout, and the platform commission. Without Cashfree keys the API stays in a sandbox path and does not call Cashfree.

## Deploy

`vercel.json` serves `client/build` and sends `/api` to `server/index.js`. Set the same environment variables in the host. Do not commit `.env`.
