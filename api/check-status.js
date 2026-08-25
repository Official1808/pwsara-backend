global.approvalStore = global.approvalStore || {};

export default function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ status: "ERROR", message: "Username query param is required" });
  }

  const cleanUser = username.trim().toLowerCase();
  const currentStatus = global.approvalStore[cleanUser] || "PENDING";

  return res.status(200).json({
    username: username,
    status: currentStatus // "PENDING", "APPROVED", or "DENIED"
  });
}