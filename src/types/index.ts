/**
 * TypeScript Type Definitions
 * Use these types throughout the application
 * Can be gradually adopted during TypeScript migration
 */

// ========== API Response Types ==========
export interface SuccessResponse<T> {
  status: "success";
  data: T;
  message: string;
  timestamp: string;
  code?: number;
}

export interface ErrorResponse {
  status: "error";
  error: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  code?: number;
}

export interface PaginatedResponse<T> {
  status: "success";
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  message: string;
  timestamp: string;
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

// ========== User Types ==========
export interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  purchases: IPurchase[];
  courses: ICourse[];
  certificateNumber?: string;
  certificateGenerated: boolean;
  certificateName?: string;
  passedExam: boolean;
  examScore?: number;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPurchase {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  courseId: string;
  amount: number;
  currency: string;
  createdAt: Date;
}

export interface ICourse {
  name: string;
  purchasedAt: Date;
  amount: number;
  currency: string;
  completedLessons: string[];
  progress: number;
}

// ========== Invoice Types ==========
export interface IInvoice {
  _id: string;
  user: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state?: string;
  postalCode?: string;
  invoiceNumber: string;
  date: Date;
  currency: string;
  items: IInvoiceItem[];
  subTotal: number;
  tax: number;
  total: number;
  totalText: string;
  convertedINRAmount: number;
  exchangeRate: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  pdfUrl?: string;
  notes?: string;
  isRefunded: boolean;
  refundAmount?: number;
  refundDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoiceItem {
  sr: number;
  description: string;
  hsn: string;
  qty: number;
  rate: number;
  amount: number;
}

// ========== Payment Types ==========
export interface IPaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface IPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// ========== Certificate Types ==========
export interface ICertificate {
  _id: string;
  userId: string;
  courseId: string;
  certificateNumber: string;
  userName: string;
  generatedAt: Date;
  expiresAt?: Date;
  pdfUrl?: string;
}

// ========== Auth Types ==========
export interface ILoginRequest {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface ITokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// ========== Validation Types ==========
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// ========== Logging Types ==========
export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

// ========== Currency Types ==========
export interface ICurrencyData {
  currency: string;
  symbol: string;
  code: string;
  courses: {
    python: { displayPrice: number; realPrice: number };
    js: { displayPrice: number; realPrice: number };
    python_js_combo: { price: number };
  };
}

// ========== Config Types ==========
export interface IAppConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
  mongodb: string;
  razorpay: {
    keyId: string;
    keySecret: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

// ========== API Handler Types ==========
export interface IAPIHandlerOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  requireAuth?: boolean;
  validateBody?: (body: any) => ValidationResult;
  logger?: any;
}

// ========== Component Props Types ==========
export interface ICurrencyContextValue {
  currency: string;
  encryptedCode: string;
  courses: {
    python: { displayPrice: number; realPrice: number };
    javascript: { displayPrice: number; realPrice: number };
    combo: { displayPrice: number };
  };
  symbol: string;
  formatPrice: (price: number) => string;
  getDisplayPrice: (courseId: string) => number;
  getRealPrice: (courseId: string) => number;
}

// ========== Query Types ==========
export interface IQueryOptions {
  limit?: number;
  skip?: number;
  sort?: Record<string, 1 | -1>;
  select?: string;
}

// ========== Error Types ==========
export class APIError extends Error {
  code: string;
  statusCode: number;
  details?: any;

  constructor(code: string, message: string, statusCode?: number, details?: any);
}

// ========== Request/Response Helper Types ==========
export interface RequestContext {
  requestId: string;
  startTime: number;
  userId?: string;
  method: string;
  path: string;
}
