# Skill Foundry

A **production-grade, multi-currency online course platform** built with Next.js, MongoDB, and Razorpay integration.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/license-proprietary-red)

## ✨ Features

- **Multi-currency Support** - INR, USD, EUR, GBP, CAD, AUD, NZD with auto-detection
- **Payment Integration** - Razorpay with webhook support and order verification
- **User Management** - Authentication, course enrollment, purchase history
- **Certificate Generation** - Automated certificate creation with verification
- **Invoice Management** - Digital invoices with PDF generation
- **Course Materials** - MDX-based course content with 30+ lessons
- **Admin Dashboard** - Logs, user management, transaction tracking
- **Security** - JWT authentication, input validation, XSS prevention, security headers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Razorpay account (for payments)

### Installation

1. **Clone and install**
```bash
git clone <repository>
cd skillfoundry
npm install
```

2. **Setup environment**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

3. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables Required
```
MONGODB_URI              # MongoDB connection string
RAZORPAY_KEY_ID         # Razorpay API key
RAZORPAY_KEY_SECRET     # Razorpay secret key
JWT_SECRET              # JWT signing secret (min 32 chars)
NEXT_PUBLIC_API_BASE_URL # API base URL (http://localhost:3000)
NODE_ENV                # development|staging|production
```

See [.env.example](.env.example) for complete list.

## 📚 Documentation

Start here based on your role:

| Role | Start Here |
|------|-----------|
| **New Developer** | [DOCUMENTATION_MAP.md](DOCUMENTATION_MAP.md) |
| **Building Features** | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| **System Design** | [ARCHITECTURE.md](ARCHITECTURE.md) |
| **Code Standards** | [BEST_PRACTICES.md](BEST_PRACTICES.md) |
| **Migrating Code** | [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) |
| **Implementing** | [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/              # Organized API routes by domain
│   │   ├── auth/         # Authentication
│   │   ├── payments/     # Payment processing
│   │   ├── courses/      # Course management
│   │   ├── certificates/ # Certificate operations
│   │   └── invoices/     # Invoice management
│   ├── Context/          # React contexts
│   └── components/       # React components
├── lib/
│   ├── api/              # API utilities (error, logging, response)
│   ├── auth/             # JWT token management
│   ├── db/               # Database connection & helpers
│   ├── validation/       # Input validation schemas
│   ├── utils/            # Common utilities
│   └── config.js         # Configuration validation
├── models/               # MongoDB schemas
├── types/                # TypeScript type definitions
└── middleware.js         # Next.js middleware
```

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | User login/registration |
| `/api/auth/verify` | GET | Verify JWT token |
| `/api/payments/create-order` | POST | Create Razorpay order |
| `/api/payments/verify` | POST | Verify payment signature |
| `/api/courses/check-access` | POST | Check user course access |
| `/api/certificates/generate` | POST | Generate certificate |
| `/api/invoices/[id]` | GET | Get invoice details |
| `/api/invoices/list` | GET | List user invoices |

For detailed API documentation, see [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md#api-endpoints)

## 🛠️ Build & Deploy

### Build
```bash
npm run build
npm start
```

### Production Deployment (Vercel)
```bash
git push origin main  # Auto-deploys to production
```

### Environment Setup for Production
Set these in your hosting provider:
- `MONGODB_URI` - Production database
- `RAZORPAY_KEY_ID` - Production Razorpay key
- `RAZORPAY_KEY_SECRET` - Production Razorpay secret
- `JWT_SECRET` - Strong random string (min 32 chars)
- `NODE_ENV` - Set to "production"

## 📊 Error Codes

All API errors use standardized error codes:

- **AUTH_*** - Authentication errors
- **PAYMENT_*** - Payment processing errors
- **VALIDATION_*** - Input validation errors
- **COURSE_*** - Course access errors
- **CERT_*** - Certificate generation errors
- **INVOICE_*** - Invoice management errors
- **DB_*** - Database operation errors
- **SERVER_*** - Server errors

See `/src/lib/api/errors.js` for complete reference.

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Input validation and sanitization
- ✅ XSS protection
- ✅ CSRF protection via tokens
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Rate limiting ready
- ✅ Secure cookie configuration
- ✅ SQL injection prevention

## 📈 Performance

- Database indexes on frequently queried fields
- Connection pooling for MongoDB
- Image optimization with Next.js Image component
- CSS minification with Tailwind
- Middleware-level request tracking
- Efficient pagination

## 🧪 Testing

### Manual Testing
```bash
# Test with curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@"}'
```

### Using Postman
Import the API collection and test endpoints with examples provided.

## 🤝 Contributing

1. Read [BEST_PRACTICES.md](BEST_PRACTICES.md)
2. Create feature branch
3. Make changes following standards
4. Test thoroughly
5. Create pull request

## 📋 Code Quality

### Before Committing
```bash
npm run lint
npm run build
```

### Code Standards
- Follow JavaScript/React best practices
- Add error handling with specific error codes
- Log important operations
- Validate all user inputs
- Use TypeScript types (types/index.ts)
- Write clear comments for complex logic

## 🐛 Debugging

1. Check error code in `/src/lib/api/errors.js`
2. Review logs with structured logging output
3. Use request ID from middleware for tracking
4. Check database connection
5. Verify environment variables

Example:
```javascript
// Find error definition
Error code: PAYMENT_001 → "Payment processing failed"

// Check logs
logger.error("Payment processing failed", error, { orderId });

// Track with request ID
console.log("Request ID:", req.headers.get("x-request-id"));
```

## 🚀 Next Steps

- [ ] Read [DOCUMENTATION_MAP.md](DOCUMENTATION_MAP.md)
- [ ] Setup local development environment
- [ ] Review [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Follow [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)
- [ ] Start building features

## 📞 Support

### Common Issues

**Database connection failed**
→ Verify MONGODB_URI and IP whitelist in MongoDB Atlas

**Razorpay integration not working**
→ Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment

**Token verification fails**
→ Ensure JWT_SECRET is set and matches between servers

**API returns 500 error**
→ Check logs for error code and details

For more help, see [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md#troubleshooting)

## 📄 License

Proprietary - All rights reserved

## 🎉 Credits

Built with:
- [Next.js](https://nextjs.org) - React framework
- [MongoDB](https://www.mongodb.com) - Database
- [Razorpay](https://razorpay.com) - Payment gateway
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Radix UI](https://radix-ui.com) - UI components

## 📈 Status

✅ **Production Ready** - All systems operational and tested

Last updated: March 28, 2026

---

**👉 [Start with Documentation Map](DOCUMENTATION_MAP.md)**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
