import bcrypt from "bcryptjs"

import {
  DatabaseError,
  ForeignKeyConstraintError,
  TimeoutError,
  UniqueConstraintError,
  ValidationError,
} from "sequelize"
import { NextApiResponse } from "next"

export const comparePassword = async (password: string, hash: string) => {
  const res = await bcrypt.compare(password, hash)

  if (!res) {
    throw new Error("Invalid password")
  }

  return res
}
export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)

    return await bcrypt.hash(password, salt)
  } catch (error) {
    console.log(error)
  }

  return null
}

export const handleSequelizeError = (error: Error, res: NextApiResponse) => {
  console.error("Sequelize error:", error)

  if (error instanceof ValidationError) {
    const messages = error.errors.map((err) => err.message)
    return res.status(400).json({ error: "Validation error", messages })
  }

  if (error instanceof DatabaseError) {
    return res
      .status(500)
      .json({ error: "Database error", message: error.message })
  }

  if (error instanceof UniqueConstraintError) {
    return res
      .status(409)
      .json({ error: "Unique constraint violation", message: error.message })
  }

  if (error instanceof ForeignKeyConstraintError) {
    return res
      .status(409)
      .json({ error: "Foreign key constraint error", message: error.message })
  }

  if (error instanceof TimeoutError) {
    return res
      .status(504)
      .json({ error: "Database timeout", message: error.message })
  }

  return res
    .status(500)
    .json({ error: "Internal server error", message: error.message })
}

export const sanitizeInput = ({rawInput}: {rawInput: string}) => {
  const reasons: Array<string> = []

  const normalized = normalizeInput(rawInput)

  const sanitized = normalized
    .replace(/<[^>]*>/g, "")       // strip HTML tags
    .replace(/[^\x20-\x7E\n]/g, "") // strip non-printable chars (keep newlines)

  if(!keywordFiltering({content: sanitized})) {
    reasons.push("Input contains blocked keywords")
  }

  const matchedPatterns = checkPatterns(sanitized);
  if (matchedPatterns.length > 0) {
    reasons.push("Suspicious patterns detected");
  }

  const structureIssues = checkStructure(sanitized);
  reasons.push(...structureIssues);

  return {sanitized: sanitized, flagged:  reasons.length > 0, reasons}
}

function checkStructure(input: string): string[] {
  const reasons: string[] = [];

  if (input.length > 2000) {
    reasons.push("Input exceeds maximum length");
  }

  // Excessive special characters can indicate injection attempts
  const specialCharRatio = (input.match(/[^a-zA-Z0-9\s]/g) || []).length / input.length;
  if (specialCharRatio > 0.3) {
    reasons.push("Unusually high special character ratio");
  }

  // Repeated sequences (common in jailbreak attempts)
  if (/(.{10,})\1{2,}/.test(input)) {
    reasons.push("Suspicious repeated sequences detected");
  }

  return reasons;
}

export const keywordFiltering = ({content}: {content: string}): boolean => {
    const lowerContent = content.toLowerCase()
    const blockedKeywords = process.env.BLOCKED_KEYWORDS ? process.env.BLOCKED_KEYWORDS.split(",") : []
    return !blockedKeywords.some(keyword => lowerContent.includes(keyword))
}

const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|context)/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /act\s+as\s+(if\s+)?(you\s+are\s+)?/i,
  /do\s+not\s+follow/i,
  /your\s+(new\s+)?instructions?\s+(are|is)/i,
  /<\s*script[\s>]/i,                       // script tag injection
  /(\{|\[)\s*"?role"?\s*:/i,               // JSON role injection
];

function checkPatterns(input: string): string[] {
  return SUSPICIOUS_PATTERNS
    .filter(pattern => pattern.test(input))
    .map(pattern => pattern.toString());
}

function normalizeInput(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKC")            // unicode normalization (e.g. ａ → a)
    .replace(/\s+/g, " ")         // collapse whitespace
    .replace(/[^\x20-\x7E]/g, "") // strip non-printable ASCII
    .trim();
}