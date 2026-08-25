global.approvalStore = global.approvalStore || {};

module.exports = function handler(req, res) {
  const { action, username, token } = req.query;

  if (!username || !action) {
    return res.status(400).send("Missing username or action parameter.");
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanAction = action.trim().toUpperCase(); // "APPROVE" or "DENY"

  // Save state
  global.approvalStore[cleanUser] = cleanAction === 'APPROVE' ? 'APPROVED' : 'DENIED';

  // Beautiful UI response for Admin
  const isApproved = cleanAction === 'APPROVE';
  const color = isApproved ? '#22c55e' : '#ef4444';
  const title = isApproved ? '✔ Request Approved' : '✖ Request Denied';
  const message = isApproved 
    ? `Student <b>${username}</b> has been successfully authorized.`
    : `Student <b>${username}</b> has been rejected/blocked.`;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PW SARA Admin - ${cleanAction}</title>
      <style>
        body {
          background-color: #0b0c10;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          padding: 16px;
          box-sizing: border-box;
        }
        .card {
          background-color: #161922;
          border: 1px solid #232734;
          border-radius: 16px;
          padding: 36px 28px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .badge {
          display: inline-block;
          font-size: 13px;
          font-weight: bold;
          padding: 6px 14px;
          border-radius: 20px;
          background: ${isApproved ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
          color: ${color};
          margin-bottom: 16px;
        }
        h1 { color: ${color}; font-size: 24px; margin: 0 0 12px; }
        p { color: #d1d5db; font-size: 15px; line-height: 1.5; margin: 0 0 16px; }
        .sub { color: #9ca3af; font-size: 13px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">${cleanAction} STATUS UPDATED</div>
        <h1>${title}</h1>
        <p>${message}</p>
        <p class="sub">The student's Android app will automatically unlock in real-time.</p>
      </div>
    </body>
    </html>
  `);
};