export default function handler(req, res) {
  res.status(200).json({
    message: "PW SARA Backend API is running! 🚀",
    endpoints: {
      action: "/api/action?username=student&action=APPROVE",
      checkStatus: "/api/check-status?username=student"
    }
  });
}