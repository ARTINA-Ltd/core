import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart





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
