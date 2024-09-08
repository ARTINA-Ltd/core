import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

message = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            color: #000000;
            background-color: #FFFFFF;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #dddddd;
            padding: 20px;
        }
        .header, .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
        }
        .content {
            margin-top: 20px;
        }
        .divider {
            border-top: 1px solid #dddddd;
            margin: 20px 0;
        }
        .signature {
            margin-top: 30px;
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <p><strong>[Your Company Name]</strong></p>
        </div>

        <!-- Content Section -->
        <div class="content">
            <p>Dear [Recipient's Name],</p>

            <p>Thank you for reaching out to us regarding your concern about <strong>[Ticket Issue/Topic]</strong>.</p>

            <p>We have received your request and are currently reviewing the details. Our team will provide you with an update or resolution as soon as possible. Please allow us [time frame, e.g., "24-48 hours"] to get back to you with more information.</p>

            <p>If you have any additional information or questions in the meantime, please feel free to reply to this email.</p>

            <p>Thank you for your patience and understanding.</p>

            <!-- Signature Section -->
            <div class="signature">
                <p>Best regards,<br>
                [Your Name]<br>
                [Your Position]<br>
                [Your Company Name]<br>
                [Contact Information]</p>
            </div>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Footer Section -->
        <div class="footer">
            <p>Disclaimer: This message and any attachments are intended solely for the named recipient(s) and may contain confidential information.</p>
        </div>
    </div>

</body>
</html>
'''
subject="verify email from ARTINA"


def send_email(subject,recipient_email,message):
        # Email configuration
        smtp_server = 'mailservice9.irandns.com'
        smtp_port = 587 
        smtp_username = 'info@artina.org'
        smtp_password = '123qweasdZXC'
        sender_email = 'info@artina.org'
        # Create a MIME object for the email
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject

        # Attach the message to the email
        msg.attach(MIMEText(message, 'html'))

        # Connect to the SMTP server
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            # Start TLS for security
            server.starttls()

            # Login to the SMTP server
            server.login(smtp_username, smtp_password)

            # Send the email
            server.sendmail(sender_email, recipient_email, msg.as_string())

        print("Email sent successfully")
