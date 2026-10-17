const EmailHTML = (event, imageUrl) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event Invitation</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f6fa;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      
      <div style="position:relative;height:240px;overflow:hidden;">
        <img src="${imageUrl}" alt="Event Banner" style="width:100%;height:240px;object-fit:cover;">
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);"></div>
        <div style="position:absolute;bottom:15px;left:20px;color:white;">
          <h2 style="margin:0;font-size:22px;">${event.title}</h2>
          <p style="margin:4px 0 0;font-size:14px;">
            📍 ${event.location}
          </p>
        </div>
      </div>

      <div style="padding:20px 25px;">
        <p style="font-size:15px;line-height:1.6;color:#333;">
          You are invited to <strong>${event.title}</strong> scheduled on 
          <strong>${new Date(event.date).toLocaleDateString()}</strong>.
        </p>

        ${event.description ? `
          <p style="font-size:14px;line-height:1.5;color:#555;margin-top:10px;">
            ${event.description}
          </p>` : ''
        }

        <p style="margin-top:20px;font-size:13px;color:#666;">
          🕒 Time: ${event.time?.start || '—'} to ${event.time?.end || '—'}
        </p>

        <div style="margin-top:30px;text-align:center;">
          <a href="https://your-frontend-domain.com/events/${event._id}" 
             style="background:#2563eb;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;">
            View Event Details
          </a>
        </div>
      </div>

      <div style="background:#111827;color:#d1d5db;text-align:center;padding:15px;font-size:12px;">
        <p style="margin:0;">© ${new Date().getFullYear()} YourAppName | Event Management Platform</p>
      </div>
    </div>
  </body>
  </html>
`;

module.exports = EmailHTML;
