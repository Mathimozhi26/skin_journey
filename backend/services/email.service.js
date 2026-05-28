const nodemailer = require('nodemailer');

const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Verify transporter
  await transporter.verify();

  console.log('✅ Gmail transporter ready');

  return transporter;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp, name) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Skin Journey 🌿" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Skin Journey OTP Code',

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #FFFDFB, #F8FAFC); padding: 40px; border-radius: 16px;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00A86B; font-size: 28px; margin: 0;">
              🌿 Skin Journey
            </h1>

            <p style="color: #1E293B; font-size: 14px;">
              Understand Your Skin. Scan Smarter. Glow Safer.
            </p>
          </div>

          <h2 style="color: #1E293B;">
            Hi ${name}! 👋
          </h2>

          <p style="color: #475569;">
            Your verification code is:
          </p>

          <div style="background: linear-gradient(135deg, #00A86B, #8B5CF6); padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <span style="color: white; font-size: 36px; font-weight: bold; letter-spacing: 8px;">
              ${otp}
            </span>
          </div>

          <p style="color: #64748B; font-size: 13px;">
            This code expires in 10 minutes.
            Don't share it with anyone.
          </p>

          <p style="color: #64748B; font-size: 12px; margin-top: 30px;">
            If you didn't request this, please ignore this email.
          </p>

        </div>
      `
    });

    console.log('✅ OTP Email sent:', info.response);

  } catch (error) {
    console.error('❌ OTP Email send failed:', error);
    throw error;
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Skin Journey 🌿" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Skin Journey! 🌿✨',

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #FFFDFB, #F8FAFC); padding: 40px; border-radius: 16px;">
          
          <div style="text-align: center;">
            <h1 style="color: #00A86B;">
              🌿 Welcome to Skin Journey!
            </h1>

            <p style="color: #1E293B; font-size: 16px;">
              Hi ${name}! Your skin journey starts now ✨
            </p>

            <p style="color: #475569;">
              Scan products, track your glow, and let our AI guide your skincare journey.
            </p>
          </div>

        </div>
      `
    });

    console.log('✅ Welcome Email sent:', info.response);

  } catch (error) {
    console.error('❌ Welcome Email send failed:', error);
    throw error;
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail
};
