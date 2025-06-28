export const generateVerificationEmail = ({ name, email, verificationLink }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            /* Base styles */
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 0;
                color: #333;
                line-height: 1.6;
            }
            
            /* Container */
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            
            /* Card styling */
            .card {
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
                overflow: hidden;
            }
            
            /* Header */
            .header {
                text-align: center;
                padding: 40px 20px 30px;
                background: linear-gradient(135deg, #f5f5ff 0%, #ffffff 100%);
            }
            
            .logo {
                background-color: #000000;
                color: #ffffff;
                font-size: 24px;
                font-weight: bold;
                padding: 10px 20px;
                border-radius: 50%;
                margin: 0 auto 24px;
                text-align: center;
                width:fit-content;
            }
            
            .title {
                font-size: 28px;
                font-weight: 600;
                margin-bottom: 12px;
                font-family: 'Playfair Display', serif;
                color: #222;
            }
            
            .subtitle {
                font-size: 16px;
                color: #666;
                max-width: 80%;
                margin: 0 auto;
            }
            
            /* Content */
            .content {
                padding: 30px;
            }
            
            .text {
                margin-bottom: 24px;
                font-size: 16px;
                color: #555;
            }
            
            /* Button */
            .verify-button {
                display: block;
                width: 80%;
                max-width: 280px;
                padding: 16px;
                background-color: #000000;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 10px;
                font-weight: 500;
                margin: 30px auto;
                text-align: center;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            
            .verify-button:hover {
                background-color: #222222;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            /* Footer */
            .footer {
                padding: 24px;
                text-align: center;
                font-size: 13px;
                color: #999;
                border-top: 1px solid #eee;
                background-color: #fafafa;
            }
            
            /* Responsive */
            @media only screen and (max-width: 600px) {
                .header {
                    padding: 30px 15px 20px;
                }
                
                .title {
                    font-size: 24px;
                }
                
                .subtitle {
                    font-size: 14px;
                }
                
                .content {
                    padding: 20px;
                }
                
                .text {
                    font-size: 15px;
                }
                
                .verify-button {
                    width: 90%;
                    padding: 14px;
                    font-size: 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="logo">YE</div>
                    <h1 class="title">Verify Your Email</h1>
                    <p class="subtitle">Complete your registration with YE Hotels</p>
                </div>
                
                <div class="content">
                    <p class="text">Hello ${name || 'there'},</p>
                    <p class="text">Thank you for creating an account with YE Hotels. To complete your registration, please verify your email address by clicking the button below:</p>
                    
                    <a href="${verificationLink}" class="verify-button">Verify Email Address</a>
                    
                    <p class="text">If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; font-size: 14px; color: #666; background-color: #f9f9f9; padding: 12px; border-radius: 8px; border: 1px solid #eee;">
                        ${verificationLink}
                    </p>
                    
                    <p class="text">This link will expire in 24 hours. If you didn't request this email, you can safely ignore it.</p>
                </div>
                
                <div class="footer">
                    <p>© ${new Date().getFullYear()} YE Hotels. All rights reserved.</p>
                    <p>123 Luxury Avenue, Hospitality District</p>
                    <p>
                        <a href="#" style="color: #999; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
                        <a href="#" style="color: #999; text-decoration: none; margin: 0 8px;">Terms of Service</a>
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

