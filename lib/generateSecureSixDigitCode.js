import crypto from "crypto";

// Generate a secure 6-digit code
export default function generateSecureSixDigitCode() {
	const buffer = crypto.randomBytes(4);
	const code = (buffer.readUInt32BE() % 900000) + 100000;
	return code.toString();
}